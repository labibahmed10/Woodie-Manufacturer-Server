const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// json web token
const jwt = require("jsonwebtoken");

//middleware
app.use(cors());
app.use(express.json());
require("dotenv").config();

// mongodb
const uri = `mongodb+srv://${process.env.MW_USER}:${process.env.MW_PASS}@cluster0.zqp7w.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const verifyJToken = (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return res.status(401).send({ status: false, message: "Unauthorized Access" });
  } else {
    const token = accessToken.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
      // console.log(err);
      if (err) {
        return res.status(403).send({ status: false, message: "Forbidden Access" });
      } else {
        // console.log(decoded);
        req.decoded = decoded?.email;
        next();
      }
    });
  }
};

async function run() {
  try {
    await client.connect();
    const allToolsInfo = client.db("manufacturerWebsite").collection("allTools");
    const purchaseInfo = client.db("manufacturerWebsite").collection("purchaseInfo");
    const allReviewsByUser = client.db("manufacturerWebsite").collection("reviewCollection");
    const allRrandomUsers = client.db("manufacturerWebsite").collection("allRandomUsers");

    // verifying a user whether s/he is admin or not!!

    const verifyAdmin = async (req, res, next) => {
      const requesterEmail = req.decoded;
      const requesterAccount = await allRrandomUsers.findOne(requesterEmail);

      if (requesterAccount.role === "admin") {
        next();
      } else {
        res.status(403).send({ status: false, message: "Forbidden Access" });
      }
    };

    // getting all tools here--
    app.get("/allTools", async (req, res) => {
      const result = await allToolsInfo.find({}).toArray();
      res.send(result);
    });

    // posting new single tool here by admin
    app.post("/allTools", verifyJToken, async (req, res) => {
      const toolInfo = req.body;
      const result = await allToolsInfo.insertOne(toolInfo);
      res.send(result);
    });

    // getting a single tool by id--
    app.get("/allTools/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await allToolsInfo.findOne(filter);
      res.send(result);
    });

    // updating the quantity of tool
    app.put("/allTools/:id", async (req, res) => {
      const id = req.params;

      const filter = { _id: ObjectId(id) };
      const { avlQuan } = req.body;

      const updateDoc = { $set: { avlQuan } };
      const options = { upsert: true };
      const result = await allToolsInfo.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    //////////////////////////////////////

    // getting all users purchase info--
    app.get("/purchase", async (req, res) => {
      const result = await purchaseInfo.find({}).toArray();
      res.send(result);
    });

    //getting data by email of a single user
    app.get("/purchaseByEmail", verifyJToken, async (req, res) => {
      const email = req.query;
      console.log(email);
      const query = email;
      const result = await purchaseInfo.find(query).toArray();
      res.send(result);
    });

    //for payment purpose search by id from purchase collection
    app.get("/purchase/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await purchaseInfo.findOne(filter);
      res.send(result);
    });

    //users purchase information according to quantity
    app.post("/purchase", async (req, res) => {
      const userInfo = req.body;
      const result = await purchaseInfo.insertOne(userInfo);
      res.send(result);
    });

    app.put("/updateStatus/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const filter = { _id: ObjectId(id) };
      const updateDoc = { $set: { status: true } };
      const options = { upsert: true };
      const result = await purchaseInfo.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // canceling a order from my orders page
    app.delete("/cancelOrder/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await purchaseInfo.deleteOne(query);
      res.send(result);
    });

    ////////////////////////////////

    //getting all the reviews of customer
    app.get("/allReviews", async (req, res) => {
      const result = await allReviewsByUser.find({}).toArray();
      res.send(result);
    });

    // posting a review of a customer
    app.post("/allReviews", async (req, res) => {
      const review = req.body;
      const result = await allReviewsByUser.insertOne(review);
      res.send(result);
    });

    /////////////////////////////////////

    // all users information from my profile to update + JWT token sending ehile login,signup,socialsigin
    app.put("/allRandomUsers", async (req, res) => {
      const email = req.query;

      const updatedUser = req.body;
      const filter = email;
      const updateDoc = { $set: updatedUser };
      const options = { upsert: true };
      const result = await allRrandomUsers.updateOne(filter, updateDoc, options);

      // creating token for user
      const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET);
      res.send({ result, accessToken: token });
    });

    // getting all the users at make admin page and only admin will be able to this
    app.get("/allRandomUsers", verifyJToken, verifyAdmin, async (req, res) => {
      const result = await allRrandomUsers.find({}).toArray();
      res.send(result);
    });

    // making admin here by querying the role
    app.put("/allRandomUsers/admin", verifyJToken, verifyAdmin, async (req, res) => {
      const email = req.query;
      console.log(email);
      const filter = email;
      const updateDoc = { $set: { role: "admin" } };
      const result = await allRrandomUsers.updateOne(filter, updateDoc);
      res.send(result);
    });

    // for useAdmin page checing if the user a admin or not?

    app.get("/admin", verifyJToken, verifyAdmin, async (req, res) => {
      const email = req.query;
      console.log(email);
      const requesterEmail = req.decoded.email;

      if (email.email === requesterEmail) {
        const requesterAccount = await allRrandomUsers.findOne(email);
        const isAdmin = requesterAccount.role === "admin";
        return res.send({ isAdmin });
      } else {
        return res.status(403).send({ status: false, message: "Forbidden Access" });
      }
    });
  } finally {
    console.log("Connected to db");
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running the server");
});

app.listen(port, () => {
  console.log("Connected to port", port);
});
