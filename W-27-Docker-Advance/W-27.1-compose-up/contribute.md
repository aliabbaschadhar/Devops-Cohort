## Manual installation

- [Install Node.js](https://nodejs.org/en/download/)
- Clone the repo
- Run `npm install`
- Start the DB locally
  - docker run -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
  - Or
  - Go to [neon.tech](https://neon.tech)
  - Change the .env file and update your DB credentials
  - Run `npx prisma migrate dev`
  - Run `npx prisma generate`
  - Run `npm run build && npm run start`

## Docker installation

- [Install Docker](https://docs.docker.com/get-docker/)
- Start postgres
  - docker run -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
- Build the image - `docker build -t user-project .`
- Run the image - `docker run -p 3000:3000 user-project`

## Docker Compose installation steps

- [Install Docker](https://docs.docker.com/get-docker/)
- Docker compose
- Run `docker compose up`
