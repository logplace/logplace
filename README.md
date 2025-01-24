# logrider

## How to run locally

Requirements:

- Node.js (>= 18)
- pnpm (>= 8)

1. Clone the repo then cd into the project directory:

```
cd logrider
```

2. Install dependencies:

```
pnpm install
```

3. Start the DB container:

```
docker run --name logrider-postgres -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=logrider -e POSTGRES_DB=logrider -d -p 5432:5432 postgres
```

4. Copy the sample environment file:

```bash
cp .env.docker-compose.sample .env.docker-compose
```

5. Start the app using the following command:

```
pnpm dev
```

This command will automatically run the db migrations and start the infrastructure.
