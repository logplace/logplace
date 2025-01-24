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

4. Copy the sample environment file and fill it:

You will need to do this for

- `apps/web`
- `packages/db`

If you didn't change any parameters in the previous step, the env var `DATABASE_URL` should be

`postgres://logrider:admin@localhost:5432/logrider`

5. Start the web server using the following command:

```
pnpm dev
```

This command will automatically run the db migrations and start the web server in `apps/web`.
