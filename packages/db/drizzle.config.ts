import { defineConfig, Config } from "drizzle-kit";

const config: Config = defineConfig({
  out: "./src/migrations",
  schema: "./src/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

export default config;
