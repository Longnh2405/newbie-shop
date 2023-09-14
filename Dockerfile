FROM node:16-alpine

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install

COPY . .

RUN yarn sync
RUN yarn build
CMD ["yarn", "start"]
