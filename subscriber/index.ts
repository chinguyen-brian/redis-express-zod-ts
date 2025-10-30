import express from "express";
import dotenv from "dotenv";
import { RedisSubscriber } from "./utils/redis/subscriber.js";
dotenv.config();
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

const subscriber = new RedisSubscriber();

subscriber.subscribe("newRestaurantChannel", (rawMessage, ch) => {
  let message: any = rawMessage;
  try {
    message = JSON.parse(message);
  } catch {}

  console.log("Received data from redis subscriber:", message);
});

app
  .listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
