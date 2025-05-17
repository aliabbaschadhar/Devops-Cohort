# This Dockerfile defines the steps to build a Node.js application image.
# It starts from a lightweight Alpine Linux-based Node.js 22 image.
# The working directory is set to /app inside the container.
# It copies package.json and package-lock.json to leverage Docker's caching mechanism,
# installing dependencies before copying the entire source code.
# This optimization ensures that dependencies are only reinstalled when package files change.
# The rest of the application source code is then copied to the /app directory.
# Port 3000 is exposed for the application to listen on.
# Finally, the command to start the Node.js application is defined.


FROM node:22-alpine3.21

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]