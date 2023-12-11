# Navigate website

Website developed using [React](https://reactjs.org/) + Typescript.

This tool will be used to configure the telescope and its subsystems to point and track a celestial object during an observation. Navigate is a web application with a single centralized server that communicates with the different real-time control systems of the telescope. It also will communicate with other apps in the Gemini Program Platform (GPP) ecosystem, such as Observe and Chronicle.

## Launch on local development

Make sure you have installed [NodeJS](https://nodejs.org/en/) in your machine.

### Using yarn

- Install dependencies

  ```bash
  yarn
  ```

- Run the web app
  ```bash
  yarn dev
  ```

### Using NPM

- Install dependencies

  ```bash
  npm install
  ```

- Run the web app
  ```bash
  npm run dev
  ```

## Test modules

Some project modules can be tested using vitest

### Using yarn

- Run vitest
  ```bash
  yarn test
  ```

### Using NPM

- Run vitest
  ```bash
  npm run test
  ```

## Navigate backend

To connect to the Navigate backend [this repository](https://github.com/gemini-hlsw/navigate-server) should be cloned and run. The project was developed using Scala, then a proper Scala and sbt installation should be provided.

In the repository directory run

```bash
sbt
```

In sbt compile everything using

```bash
compile
```

Once compiled, to run the server

```
navigate_web_server/reStart
```

## Publishing

In order to publish the project as static assets, run:

```bash
yarn build
```
