FROM node:22-alpine

WORKDIR /app

COPY package* .

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

# EXPOSE 3000 
# It doesn't do any substantial but it is good for documentation and needed in only legacy docker 

CMD [ "npm","run", "dev:docker" ]