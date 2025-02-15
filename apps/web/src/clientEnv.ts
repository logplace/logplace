import { z } from "zod";

export const clientEnvSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string(),
});
export type ClientEnv = z.infer<typeof clientEnvSchema>;

export const clientEnvParseRes = clientEnvSchema.safeParse({
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
});

if (!clientEnvParseRes.success) {
  console.error(clientEnvParseRes.error.issues);
  throw new Error("There is an error with the CLIENT environment variables");
}
export const clientEnv = clientEnvParseRes.data;
