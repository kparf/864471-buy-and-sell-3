'use strict';

const express = require(`express`);
const mainRoutes = require(`./routes/main-routes`);
const myRoutes = require(`./routes/my-routers`);
const offersRoutes = require(`./routes/offers-routers`);
const path = require(`path`);


const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;

const app = express();

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/offers`, offersRoutes);

app.use((req, res) => res.render(`404`));
app.use((err, req, res, _next) => {
  console.error(err);
  res.render(`500`);
});

app.listen(DEFAULT_PORT);
