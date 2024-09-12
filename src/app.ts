import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {Router} from "express";
import ProductRouter from "./routes/ProductRouter";
import {loggerMiddleware} from "./middlewares/loggerMiddleware";

const router = Router();
const app: express.Application = express();


app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(loggerMiddleware);
app.use("/products", ProductRouter);

app.use((req, res) => {
  res.status(404).json({error: "Not Found"});
});


export default app;