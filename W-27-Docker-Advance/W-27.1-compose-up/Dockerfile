FROM node:22-alpine

WORKDIR /app

COPY package* .

RUN npm install

COPY . .

ENV DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5432/postgres

RUN npx prisma migrate dev
RUN npx prisma generate
RUN npm run build

# EXPOSE 3000 
# It doesn't do any substantial but it is good for documentation and needed in only legacy docker 

CMD [ "npm", "start" ]