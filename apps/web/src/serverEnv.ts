import { z } from "zod";

export const serverEnvSchema = z.object({
  DATABASE_URL: z.string(),
});

const serverEnvParseRes = serverEnvSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
});

if (!serverEnvParseRes.success) {
  console.error(serverEnvParseRes.error.issues);
  throw new Error("There is an error with the SERVER environment variables");
}

export const serverEnv = serverEnvParseRes.data;
