FROM node:22-alpine 

WORKDIR /app

# COPY ./index.js ./index.js
# COPY ./package.json ./package.json

# I want to copy everything from here(code root folder) to here(docker container)

COPY . .
# This command has one flaw it will also copy the node_modules into the container so 
# To prevent that we will use .dockerignore file

RUN npm install 
# Run executes commands during the image build process. These commands modify the image and are committed as new layers. 
# RUN is typically used for installing software packages, creating directories, and any other setup needed for the application.


EXPOSE 3000
# This tell when we run our nodejs process at port 3000 in docker container we will able to listen the application.

# Specifies the default command to run when the container starts. There can only be one CMD instruction in a Dockerfile. 
# If multiple CMD instructions are present, only the last one will take effect. CMD is used to run the application or service inside the container

CMD [ "node" ,"index.js" ]
