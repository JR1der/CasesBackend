import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {Router} from "express";
import bodyParser from "body-parser";
import ProductRouter from "./routes/ProductRouter";

const router = Router();
const app: express.Application = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/products", ProductRouter);

app.use((req, res) => {
  res.status(404).json({error: "Not Found"});
});


export default app;