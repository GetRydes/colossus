FROM node:16-alpine AS production

WORKDIR usr/src/app

RUN rm -rf dist

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]