import { z } from "zod";

export const serverEnvSchema = z.object({
  DATABASE_URL: z.string(),
  REDIS_URL: z.string(),
  NEXT_PUBLIC_BASE_URL: z.string(),
  COOKIE_SECRET: z.string(),
});

export const getServerEnv = () => {
  const serverEnvParseRes = serverEnvSchema.safeParse({
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    COOKIE_SECRET: process.env.COOKIE_SECRET,
  });

  if (!serverEnvParseRes.success) {
    console.error(serverEnvParseRes.error.issues);
    throw new Error("There is an error with the SERVER environment variables");
  }
  return serverEnvParseRes.data;
};
