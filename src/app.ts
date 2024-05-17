import express, { Application, Request, Response, urlencoded } from "express";
import cors from "cors";
import notFoundRoutes from "./middlewares/notFoundRoutes";
import allRoutes from "./routes/allRoutes";
import globalErrorHandler from "./middlewares/globalErrorhandler";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"], credentials: true }));

// url encoding
app.use(urlencoded({ extended: true }));

app.use("/", allRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "The server responded with a JSON response",
  });
});

// global error handler
app.use(globalErrorHandler);

// global route error handler
app.all("*", notFoundRoutes);

export default app;
