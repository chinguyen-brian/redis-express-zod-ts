import { initializeRedisClient } from "../utils/redis/client.js";
import { bloomKey } from "../utils/redis/keys.js";
import dotenv from "dotenv";
dotenv.config();

async function createBloomFilter(){
    const client = await initializeRedisClient();
    await Promise.all([
        client.del(bloomKey),
        client.bf.reserve(bloomKey, 0.0001, 1000000)
    ]);
    console.log("Bloom Filter created");
}

await createBloomFilter();
process.exit();