FROM node:18

ARG ODB_TOKEN

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn install

RUN echo VITE_ODB_TOKEN=$ODB_TOKEN >> .env.production
COPY . .
RUN yarn build
CMD ["yarn", "preview"]