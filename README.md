# logplace

## How to run locally

Requirements:

- Node.js (>= 18)
- pnpm (>= 8)

1. Clone the repo then cd into the project directory:

```
cd logplace
```

2. Copy the sample environment file and fill it:

```bash
cp .env.docker-compose.sample .env.docker-compose
```

3. Start the stack using the following command:

```
pnpm dev
```

This command will automatically

- inject env vars from Infisical
- run the db migrations
- start the infrastructure.
