const PORT = Bun.env.PORT;
const MONGO_URI = Bun.env.MONGO_URI;
const SALT_ROUNDS = Number(Bun.env.SALT_ROUNDS);
const JWT_SECRET = Bun.env.JWT_SECRET!;
const SMTP_USER = Bun.env.SMTP_USER;
const SMTP_PASS = Bun.env.SMTP_PASS;
const CLIENT_URL = Bun.env.CLIENT_URL;
const AUTH_EXPIRES = Bun.env.AUTH_EXPIRES as any;

export {
  PORT,
  MONGO_URI,
  SALT_ROUNDS,
  JWT_SECRET,
  SMTP_PASS,
  SMTP_USER,
  CLIENT_URL,
  AUTH_EXPIRES,
};
