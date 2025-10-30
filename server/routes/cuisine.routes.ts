import express from "express";
import { initializeRedisClient } from "../utils/redis/client.js";
import {
  cuisineKey,
  cuisinesKey,
  restaurantKeyById,
} from "../utils/redis/keys.js";
import { successResponse } from "../utils/responses.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const client = await initializeRedisClient();
    const cuisines = await client.sMembers(cuisinesKey);
    return successResponse(res, cuisines);
  } catch (error) {
    next(error);
  }
});

router.get("/:cuisine", async (req, res, next) => {
  const { cuisine } = req.params;
  try {
    const client = await initializeRedisClient();
    const restaurantIds = await client.sMembers(cuisineKey(cuisine));
    const restaurants = await Promise.all(
      restaurantIds.map((restaurantId: string) =>
        client.hGet(restaurantKeyById(restaurantId), "name")
      )
    );
    return successResponse(res, restaurants);
  } catch (error) {
    next(error);
  }
});

export default router;
