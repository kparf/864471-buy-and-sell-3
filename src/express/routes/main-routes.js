'use strict';

const {Router} = require(`express`);
const request = require(`request`);
const utility = require(`util`);

const mainRouter = new Router();


mainRouter.get(`/`, (req, res) => {
  request.get(`http://localhost:3000/offers`, (err, apiResponse, body) => {
    res.render(`main`, { offers: JSON.parse(body)});
  });
});
mainRouter.get(`/register`, (req, res) => res.render(`sign-up`));
mainRouter.get(`/login`, (req, res) => res.render(`login`));
mainRouter.get(`/search`, (req, res) => res.render(`search-result`));

module.exports = mainRouter;
