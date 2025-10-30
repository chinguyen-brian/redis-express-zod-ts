import { createClient, type RedisClientType } from "redis";

export class RedisPublisher {
  private client: RedisClientType;
  private isConnected: boolean;

  constructor() {
    this.client = createClient({password: process.env.REDIS_PASSWORD});
    this.client.on("error", (err) =>
      console.error("Redis Publisher Error:", err)
    );
    this.isConnected = false;
  }
  async connect(): Promise<void> {
    if (!this.isConnected) {
      await this.client.connect();
      this.isConnected = true;
      console.log("[RedisPublisher] Connected to Redis");
    }
  }

  async publish<T>(channel: string, message: T): Promise<void> {
    if (!this.isConnected) {
      await this.connect();
    }

    const payload =
      typeof message === "string" ? message : JSON.stringify(message);

    await this.client.publish(channel, payload);
    console.log(`[RedisPublisher] Published to ${channel}:`, payload);
  }
}