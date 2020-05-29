'use strict';

const express = require(`express`);
const mainRoutes = require(`./routes/main-routes`);
const myRoutes = require(`./routes/my-routers`);
const offersRoutes = require(`./routes/offers-routers`);

const DEFAULT_PORT = 8080;

const app = express();

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/offers`, offersRoutes);

app.listen(DEFAULT_PORT);
