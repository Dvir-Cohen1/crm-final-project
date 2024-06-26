import express, { Express } from "express";
import cors from "cors";
import "dotenv/config";
import appRoutes from "./routes/index.routes.js";
import initialMongoConnection from "./config/initialConnection.js";
import errorHandler from "./errors/errorHandler.js";
const app: Express = express();

app.use(cors({ origin: "*"}));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
app.use(appRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3010;
initialMongoConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));

  