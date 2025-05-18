# Installation Guide

## Manual Installation

1. [Install Node.js](https://nodejs.org/en/download/)
2. Clone the repository
3. Run `npm install`
4. Start the database:

- **Option 1:** Local PostgreSQL container

    ```bash
    docker run -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
    ```

- **Option 2:** [Neon.tech](https://neon.tech) cloud database
  - Create a database on neon.tech
  - Update your `.env` file with your database credentials

5. Set up the database:

  ```bash
  npx prisma migrate dev
  npx prisma generate
  ```

6. Build and run the application:

  ```bash
  npm run build && npm run start
  ```

## Docker Installation

1. [Install Docker](https://docs.docker.com/get-docker/)
2. Create a network for container communication:

  ```bash
  docker network create user-project
  ```

3. Start PostgreSQL:

  ```bash
  docker run --network user-project --name postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
  ```

4. Build the application image:

  ```bash
  docker build --network=host -t user-project .
  ```

5. Run the application container:

  ```bash
  docker run --network user-project -e DATABASE_URL=postgres://postgres:mysecretpassword@postgres:5432/postgres -p 3000:3000 user-project
  ```

## Docker Compose Installation (Recommended)

1. [Install Docker](https://docs.docker.com/get-docker/)
2. Run the application stack:

  ```bash
  docker compose up
  ```
