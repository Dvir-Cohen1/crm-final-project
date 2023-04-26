import express, { Express, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import appRoutes from "./routes/index.js";
import initialMongoConnection from "./config/initialConnection.js";
import errorHandler from "./errors/errorHandler.js";

const app: Express = express();
const PORT = process.env.PORT || 3010;
app.use(cors({ origin: process.env.CLIENT_ENDPOINT }));
app.use(express.json());
app.use(appRoutes);
app.use(errorHandler);

initialMongoConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
