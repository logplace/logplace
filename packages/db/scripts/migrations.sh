if [[ -z "${DATABASE_URL}" ]]; then
  echo "Missing required DATABASE_URL environment variable"
  exit 1
fi

npx drizzle-kit migrate
