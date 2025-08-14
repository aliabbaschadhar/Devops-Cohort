// Import the necessary module from the 'redis' package
import { createClient } from 'redis';
import type { RedisClientType } from 'redis';

export class PubSubManager {
  private static instance: PubSubManager | null = null;
  private redisClient: RedisClientType<any, any>;
  private subscriptions: Map<string, Set<string>>;

  // Private constructor to enforce singleton
  private constructor() {
    this.redisClient = createClient();
    // connect asynchronously; don't block construction
    void this.redisClient.connect().catch((err) => {
      console.error('Redis connection error:', err);
    });
    this.subscriptions = new Map();
  }

  // Accessor for singleton instance
  public static getInstance(): PubSubManager {
    if (!PubSubManager.instance) {
      PubSubManager.instance = new PubSubManager();
    }
    return PubSubManager.instance;
  }

  // Subscribe a user to a stock channel
  public async userSubscribe(userId: string, stock: string): Promise<void> {
    if (!this.subscriptions.has(stock)) {
      this.subscriptions.set(stock, new Set<string>());
    }
    const subs = this.subscriptions.get(stock)!;
    subs.add(userId);

    // If this is the first subscriber, subscribe to the Redis channel
    if (subs.size === 1) {
      await this.redisClient.subscribe(stock, (message: string) => {
        this.handleMessage(stock, message);
      });
      console.log(`Subscribed to Redis channel: ${stock}`);
    }
  }

  // Unsubscribe a user from a stock channel
  public async userUnsubscribe(userId: string, stock: string): Promise<void> {
    const subs = this.subscriptions.get(stock);
    if (!subs) return;

    subs.delete(userId);
    if (subs.size === 0) {
      await this.redisClient.unsubscribe(stock);
      this.subscriptions.delete(stock);
      console.log(`Unsubscribed from Redis channel: ${stock}`);
    }
  }

  // Handle incoming Redis messages and forward to subscribers
  private handleMessage(stock: string, message: string) {
    console.log(`Message received on channel ${stock}: ${message}`);
    const subs = this.subscriptions.get(stock);
    if (!subs) return;
    subs.forEach((sub) => {
      console.log(`Sending message to user: ${sub}`);
      // Actual message delivery (WebSocket, SSE, etc.) should be integrated here.
    });
  }

  // Cleanup
  public async disconnect(): Promise<void> {
    try {
      await this.redisClient.quit();
    } catch (err) {
      console.error('Error quitting Redis client:', err);
    }
  }
}

