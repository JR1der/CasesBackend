import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {Router} from "express";

const router = Router();
const app: express.Application = express();

app.use(cors());