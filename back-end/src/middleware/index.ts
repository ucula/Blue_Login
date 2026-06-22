import express from "express";
import cors from "cors";
import type { Express } from "express";
import auth from "./auth";

export default function configureMiddlewares(app: Express) {
  app.use(cors());
  app.use(express.json());
}

export { auth };
