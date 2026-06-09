// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// Define an interface matching what the token generates mathematically
interface TokenPayload {
  userId: string;
  role: string;
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  // 1. Extract the token out of the HTTP Authorization request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Splits "Bearer <token>"

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied: No Token Provided" });
  }

  if (!JWT_SECRET) {
    return res
      .status(500)
      .json({ message: "Server Configuration Error: Secret Missing" });
  }

  // 2. Run the HMAC-SHA256 mathematical check
  // We type-cast the result as 'TokenPayload' so TypeScript knows what fields are inside
  jwt.verify(token, JWT_SECRET, (err, decodedData) => {
    if (err) {
      // If signature math breaks or 'exp' timestamp has passed
      return res.status(403).json({ message: "Invalid or Expired Token" });
    }

    const payload = decodedData as TokenPayload;

    // 3. Math check passed! Attach it to our newly typed request property
    req.user = {
      userId: payload.userId,
      role: payload.role,
    };

    // 4. Pass execution over to the route handler
    next();
  });
}
