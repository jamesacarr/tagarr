ARG VERSION=unknown

##############################
# Base Image
##############################
FROM node:24-alpine AS base

ENV TZ=UTC
ENV WORKFLOW_TARGET_WORLD=local

RUN apk add --no-cache libc6-compat tzdata

##############################
# Builder Image
##############################
FROM base AS builder

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable

# This needs prod=false because types don't get installed correctly otherwise
RUN pnpm install --frozen-lockfile

COPY .tool-versions next.config.ts postcss.config.mjs tsconfig.json ./
COPY src ./src

ARG VERSION
ENV NEXT_PUBLIC_VERSION=${VERSION}

RUN pnpm build

##############################
# Runner Image
##############################
FROM base AS runner

ENV DATA_FOLDER=/data
ENV WORKFLOW_LOCAL_DATA_DIR=${DATA_FOLDER}/.workflow-data
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

HEALTHCHECK CMD wget --no-verbose --tries=1 --spider http://$HOSTNAME:$PORT/api/ping || exit 1

CMD ["node", "server.js"]
