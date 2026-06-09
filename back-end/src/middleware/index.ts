import express, { Express } from "express";
import cors from "cors";

export function configureMiddlewares(app: Express) {
  require("dotenv").config();
  app.use(cors());
  app.use(express.json());
}
