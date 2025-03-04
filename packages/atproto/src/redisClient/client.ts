import { createClient } from "redis";

const redisClient = createClient({
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

// Error handling
redisClient.on("error", (error) => {
  console.error("Redis Client Error:", error);
});

// Optional: Log when connection is ready
redisClient.on("ready", () => {
  console.log("Redis Client Ready");
});

// Optional: Log when connection is established
redisClient.on("connect", () => {
  console.log("Redis Client Connected");
});

// Optional: Log when connection is lost
redisClient.on("end", () => {
  console.log("Redis Client Connection Ended");
});

export const getRedisClient = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    return redisClient;
  } catch (error) {
    console.error("Failed to get Redis client:", error);
    throw new Error("Failed to establish Redis connection");
  }
};

export type RedisClient = Awaited<ReturnType<typeof getRedisClient>>;
