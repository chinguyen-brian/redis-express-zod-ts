import { createClient, type RedisClientType } from "redis";

type MessageHandler = (message: string, channel: string) => void;

export class RedisSubscriber {
  private client: RedisClientType;
  private isConnected: boolean;

  constructor() {
    this.client = createClient({password: process.env.REDIS_PASSWORD});
    this.client.on("error", (err) =>
      console.error("Redis Subscriber Error:", err)
    );
    this.isConnected = false;
  }
  async connect(): Promise<void> {
    if (!this.isConnected) {
      await this.client.connect();
      this.isConnected = true;
      console.log("[RedisSubscriber] Connected to Redis");
    }
  }

  async subscribe(channel: string, handler: MessageHandler): Promise<void> {
    if (!this.isConnected) {
      await this.connect();
    }

    await this.client.subscribe(channel, (message, ch) => {
      handler(message, ch);
    });
    console.log(`[RedisSubscriber] Subscribe to ${channel}`);
  }
}
