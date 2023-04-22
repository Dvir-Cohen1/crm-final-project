import express, { Express, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import appRoutes from "./routes/index.js";
import { formatUptime } from "./utils/dates.utils.js";
import initialMongoConnection from "./config/initialConnection.js";
import errorHandler from "./errors/errorHandler.js";

const app: Express = express();
const PORT = process.env.PORT || 3010;
app.use(cors({ origin: process.env.CLIENT_ENDPOINT }));
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send(`Server Running ${formatUptime(process.uptime())}`);
});
app.use(appRoutes);
app.use(errorHandler);


initialMongoConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
