'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../../../constants`);
const offerValidator = require(`../middlewares/offer-validator`);


const router = Router();

module.exports = (app, service) => {
  app.use(`/offers`, router);

  router.get(`/`, (req, res) => {
    const offers = service.findAll();

    res
      .status(HttpCode.OK)
      .json(offers);
  });

  router.get(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = service.findOne(offerId);

    if(!offer) {
      res
        .status(HttpCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    res
    .status(HttpCode.OK)
    .json(offer);
  });

  router.post(`/`, offerValidator, (req, res) => {
    const offer = req.body;

    const createdOffer = service.create(offer);
    res
      .status(HttpCode.OK)
      .json(createdOffer);
  });

  router.put(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = req.body;

    const updatedOffer = service.update(offerId, offer);

    if (!updatedOffer) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    res
      .status(HttpCode.OK)
      .json(updatedOffer);
  });

  router.delete(`/:offerId`, (req, res) => {
    const {offerId} = req.params;

    const deletedOffer = service.drop(offerId);

    if (!deletedOffer) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    res
      .status(HttpCode.OK)
      .json(deletedOffer);
  });
};
