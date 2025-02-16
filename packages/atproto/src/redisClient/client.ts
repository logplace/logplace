import { createClient, RedisClientType } from "redis";

if (!process.env.REDIS_URL) {
  throw new Error("Missing REDIS_URL");
}

const redisClient: RedisClientType = createClient({
  url: process.env.REDIS_URL,
  socket: {
    reconnectStrategy: (retries) => {
      // Maximum retry delay is 3s
      if (retries > 20) {
        console.error("Too many Redis connection retries. Giving up.");
        return new Error("Redis connection retries exhausted");
      }
      return Math.min(retries * 100, 3000);
    },
  },
});
export type RedisClient = typeof redisClient;

redisClient.on("error", (error) => {
  console.error("Redis Client Error:", error);
});

redisClient.on("ready", () => {
  console.log("Redis Client Ready");
});

redisClient.on("connect", () => {
  console.log("Redis Client Connected");
});

redisClient.on("end", () => {
  console.log("Redis Client Connection Ended");
});

export const getRedisClient = () => {
  if (!redisClient.isOpen) {
    throw new Error("Redis client is not connected");
  }
  return redisClient;
};

export async function executeRedisCommand<T>(
  command: (client: typeof redisClient) => Promise<T>
): Promise<T> {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    return await command(redisClient);
  } catch (error) {
    console.error("Redis Command Error:", error);
    throw error;
  }
}
