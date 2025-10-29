import express from "express";
import { validate } from "../middlewares/validate.js";
import {
  RestaurantSchema,
  type Restaurant,
} from "../schemas/restaurant.schema.js";
import { initializeRedisClient } from "../utils/redis/client.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("");
});

router.post("/", validate(RestaurantSchema), async (req, res) => {
  const data = req.body as Restaurant;
  const client = await initializeRedisClient();
  res.status(200).json(data);
});

export default router;
