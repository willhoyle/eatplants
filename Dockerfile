FROM node:10.15.3-jessie

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]