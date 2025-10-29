import express from "express";
import cuisineRouter from "./routes/cuisine.routes.js";
import restaurantRouter from "./routes/restaurant.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use("/cuisines", cuisineRouter);
app.use("/restaurants", restaurantRouter);

app.use(errorHandler);

app
  .listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
