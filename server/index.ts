import express from "express";
import cuisineRouter from "./routes/cuisine.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import dotenv from "dotenv";
import { RedisPublisher } from "./utils/redis/publisher.js";
import { restaurantRouter } from "./routes/restaurant.routes.js";
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const publisher = new RedisPublisher();
app.use("/cuisines", cuisineRouter);
app.use("/restaurants", restaurantRouter(publisher));



app.use(errorHandler);

app
  .listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
