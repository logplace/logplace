FROM node:18-alpine AS base

# ----------------- #
# ref: https://turbo.build/repo/docs/guides/tools/docker
# ----------------- #

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app
# ref: https://github.com/nodejs/corepack/issues/612#issuecomment-2631462297
ENV COREPACK_INTEGRITY_KEYS=0
RUN corepack enable pnpm && pnpm install turbo
COPY . .
RUN pnpm turbo prune web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
# ref: https://github.com/nodejs/corepack/issues/612#issuecomment-2631462297
ENV COREPACK_INTEGRITY_KEYS=0
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# Copy the database migration files
COPY --from=builder /app/packages/db/. ./db/.

# Build the project
COPY --from=builder /app/out/full/ .

# Inject build-time secrets
# Install Infisical CLI
RUN apk add --no-cache bash curl && curl -1sLf \
    'https://dl.cloudsmith.io/public/infisical/infisical-cli/setup.alpine.sh' | bash \
    && apk add infisical
ARG INFISICAL_MACHINE_CLIENT_ID
ENV INFISICAL_MACHINE_CLIENT_ID=$INFISICAL_MACHINE_CLIENT_ID
ARG INFISICAL_MACHINE_CLIENT_SECRET
ENV INFISICAL_MACHINE_CLIENT_SECRET=$INFISICAL_MACHINE_CLIENT_SECRET
ARG PROJECT_ID
ENV PROJECT_ID=$PROJECT_ID
ARG INFISICAL_SECRET_ENV
ENV INFISICAL_SECRET_ENV=$INFISICAL_SECRET_ENV
COPY --from=builder /app/scripts/inject_secret_and_run.sh ./scripts/
RUN chmod +x ./scripts/inject_secret_and_run.sh

# ref: https://github.com/nodejs/corepack/issues/612#issuecomment-2631462297
ENV COREPACK_INTEGRITY_KEYS=0
RUN corepack enable pnpm
RUN ["/bin/sh", "./scripts/inject_secret_and_run.sh", "pnpm turbo build"]

FROM base AS runner
WORKDIR /app

# Install Infisical CLI
RUN apk add --no-cache bash curl && curl -1sLf \
    'https://dl.cloudsmith.io/public/infisical/infisical-cli/setup.alpine.sh' | bash \
    && apk add infisical

# For later db migration
RUN npm install drizzle-kit drizzle-orm pg

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

# Copy the migrations related files
COPY --from=installer --chown=nextjs:nodejs /app/db/src/ ./src/
COPY --from=installer --chown=nextjs:nodejs /app/db/scripts ./scripts/
COPY --from=installer --chown=nextjs:nodejs /app/db/drizzle.config.ts ./drizzle.config.ts

# Copy the startup script and place it at work dir
COPY --from=builder --chown=nextjs:nodejs /app/scripts/inject_secret_and_run.sh ./scripts/

# Make the scripts executable and set correct ownership
RUN chmod +x ./scripts/inject_secret_and_run.sh
RUN chmod +x ./scripts/migrations.sh
RUN chown nextjs:nodejs ./scripts/inject_secret_and_run.sh
RUN chown nextjs:nodejs ./scripts/migrations.sh

CMD ["/bin/sh", "./scripts/inject_secret_and_run.sh", "./scripts/migrations.sh && node apps/web/server.js"]
