const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { ObjectID } = require("bson");
const { options } = require("nodemon/lib/config");

require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

// mongodb
const uri = `mongodb+srv://${process.env.MW_USER}:${process.env.MW_PASS}@cluster0.zqp7w.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const allToolsInfo = client.db("manufacturerWebsite").collection("allTools");
    const purchaseInfo = client.db("manufacturerWebsite").collection("purchaseInfo");
    // getting all tools here--
    app.get("/allTools", async (req, res) => {
      const result = await allToolsInfo.find({}).toArray();
      res.send(result);
    });

    // getting a single tool by id--
    app.get("/allTools/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await allToolsInfo.findOne(filter);
      res.send(result);
    });

    //users purchase information according to quantity
    app.post("/purchase", async (req, res) => {
      const userInfo = req.body;
      const result = await purchaseInfo.insertOne(userInfo);
      res.send(result);
    });

    // updating the quantity of tool
    app.put("/allTools/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const { avlQuan } = req.body;
      const updateDoc = { $set: { avlQuan } };
      const options = { upsert: true };
      const result = await allToolsInfo.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    //getting data by email of a single user
    app.get("/purchase", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await purchaseInfo.find(query).toArray();
      res.send(result);
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
