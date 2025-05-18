FROM oven/bun:1

WORKDIR /usr/src/app

# First, copy only package.json files for better caching
COPY ./package.json ./package.json
COPY ./apps/ws/package.json ./apps/ws/package.json
COPY ./packages/db/package.json ./packages/db/
COPY ./packages/eslint-config/package.json ./packages/eslint/
COPY ./packages/typescript-config/package.json ./packages/typescript-config/

# Copy lockfile and config
COPY ./bun.lock ./bun.lock
COPY ./turbo.json ./turbo.json

# Install dependencies
RUN bun install

# Copy source code after dependencies are installed
COPY ./packages ./packages
COPY ./apps/ws ./apps/ws

RUN bun run db:generate

# Set working directory to the ws app directory
WORKDIR /usr/src/app/apps/ws

# The first WORKDIR /usr/src/app sets up the base directory where you'll copy your monorepo files

# The second WORKDIR /usr/src/app/apps/ws changes to the specific app directory where you want to run your ws command

EXPOSE 8081

# Command to run the backend
CMD ["bun", "run", "start:ws"]