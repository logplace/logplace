import { createClient, RedisClientType } from "redis";

export type RedisClient = RedisClientType;

export const getRedisClient = () => {
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
  return redisClient;
};
