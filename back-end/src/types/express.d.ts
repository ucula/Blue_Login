import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      // Define the exact type shape of the data packed inside your JWT payload
      user?: {
        userId: string;
        role: string;
      };
    }
  }
}
