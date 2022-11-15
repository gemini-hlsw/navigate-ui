FROM node:lts-alpine

RUN mkdir /opt/web || echo "Web directory already created"
WORKDIR /opt/web

COPY package*.json .
RUN yarn

COPY . .
RUN yarn build

CMD ["yarn", "preview"]