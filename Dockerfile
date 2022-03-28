FROM node:16-alpine AS production

WORKDIR usr/src/app

# RUN rm -rf build

COPY package*.json ./

RUN yarn add glob rimraf

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]