import express from "express";
import { validate } from "../middlewares/validate.js";
import {
  RestaurantSchema,
  type Restaurant,
} from "../schemas/restaurant.schema.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("");
});

router.post("/", validate(RestaurantSchema), async (req, res) => {
  const data = req.body as Restaurant;
  res.status(200).json(data);
});

export default router;
