import express from "express";
import { json } from "body-parser";
import { trafficController } from "./controllers/traffic-controller";

const app = express();
app.use(json());

app.use(trafficController);

export { app };