'use strict';


const {Router} = require(`express`);
const {
  CategoryService,
  OfferService,
  SearchService,
  CommentService,
} = require(`../data-service`);

const getMockData = require(`../../../lib/get-mock-data`);

const offer = require(`./offer`);
const category = require(`./category`);
const search = require(`./search`);
const comment = require(`./comment`);

const router = new Router();

(async () => {
  const mockData = await getMockData();

  offer(router, new OfferService(mockData));
  category(router, new CategoryService(mockData));
  search(router, new SearchService(mockData));
  comment(router, new OfferService(mockData), new CommentService(mockData));
})();

module.exports = router;
