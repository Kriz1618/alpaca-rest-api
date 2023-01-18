import express from "express";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from 'dotenv';

import {
  alpacaBrokerRouter,
  alpacaTradingRouter,
  testRouter
} from "./routes";

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/test", testRouter);
app.use("/api/trading", alpacaTradingRouter);
app.use("/api/broker", alpacaBrokerRouter);

export default app;