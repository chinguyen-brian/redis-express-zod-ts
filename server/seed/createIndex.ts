import { SCHEMA_FIELD_TYPE } from "redis";
import { initializeRedisClient } from "../utils/redis/client.js";
import { indexKey, getKeyName } from "../utils/redis/keys.js";
import dotenv from "dotenv";
dotenv.config();
async function createIndex() {
  const client = await initializeRedisClient();
  try {
    await client.ft.dropIndex(indexKey);
  } catch (error) {
    console.log("No existing index to delete");
  }

  await client.ft.create(
    indexKey,
    {
      id: {
        type: SCHEMA_FIELD_TYPE.TEXT,
        AS: "id",
      },
      name: {
        type: SCHEMA_FIELD_TYPE.TEXT,
        AS: "name",
      },
      avgStars: {
        type: SCHEMA_FIELD_TYPE.NUMERIC,
        AS: "avgStars",
        SORTABLE: true,
      },
    },
    {
      ON: "HASH",
      PREFIX: getKeyName("restaurants"),
    }
  );
  console.log("Index created");
}

await createIndex();
process.exit();
