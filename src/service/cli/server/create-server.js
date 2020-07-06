'use strict';


const express = require(`express`);
const {HttpCode} = require(`../../../constants`);


const createServer = (...apiRouterList) => {
  const app = express();
  app.use(express.json());
  apiRouterList.forEach(([
    path,
    router,
  ]) => app.use(path, router));
  app.use((req, res) => res
    .status(HttpCode.NOT_FOUND)
    .send(`Not found`));
  return app;
}

module.exports = createServer;