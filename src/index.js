// libs
import express from "express";
import cors from "cors";
import "dotenv/config";

// middlewares
import notExistendPathMiddleware from "./middlewares/notexistendPath.middleware.js";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware.js";
import tokenAuthenticateMiddleware from "./middlewares/tokenAuthenticate.middleware.js";

// config
import pool from "./utils/mysql.js";

// routes
import authRouter from "./routes/auth.router.js";
import purchaseRouter from "./routes/purchase.router.js";
import auditRouter from "./routes/audit.router.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// incoming requests
app.use((req, _res, next) => {
  console.log(">> Incoming:", req.method, req.originalUrl);
  next();
});

// routers
app.get("/", (_, res) => {
  res.status(200).json({ message: "Analysed Backend is running" });
});
app.use("/api/auth", authRouter);
app.use("/api/purchase", tokenAuthenticateMiddleware, purchaseRouter);
app.use("/api/audit", tokenAuthenticateMiddleware, auditRouter);

// final fallback and error barrier
app.use(notExistendPathMiddleware);
app.use(errorHandlerMiddleware);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`App listening on port ${process.env.SERVER_PORT}`);
});

process.on("SIGNINT", async () => {
  await pool.end();
  process.exit(0);
});
