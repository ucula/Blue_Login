import express from "express";
import cors from "cors";
import type { Express } from "express";
import { adminAuth } from "./adminAuth";
import { userAuth } from "./userAuth";

export default function configureMiddlewares(app: Express) {
  app.use(cors());
  app.use(express.json());
}

export { adminAuth, userAuth };
