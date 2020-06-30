'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../../../constants`);
const offerExist = require(`../middlewares/offer-exist`);

const route = Router();


module.exports = (app, offerService, commentService) => {
  app.use(`/offers`, route);

  route.get(`/:offerId/comments`, offerExist(offerService), (req, res) => {
    const {offer} = res.locals;

    res
      .status(HttpCode.OK)
      .json(offer.comments || []);
  });
  
  route.delete(`/:offerId/comments/:commentId`, (req, res) => {
    const {
      offerId,
      commentId,
    } = req.params;

    const comment = commentService.drop(offerId, commentId);
    if (!comment) {
      return res
      .status(HttpCode.NOT_FOUND)
      .send(`Not found with ${commentId}`);
    }

    res
      .status(HttpCode.OK)
      .json(comment);
  });

  route.post(`/:offerId/comments`, (req, res) => {
    const {offerId} = req.params;
    const comment = req.body;

    const createdComment = commentService.create(offerId, comment);
    if (!createdComment) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    res
      .status(HttpCode.OK)
      .json(createdComment);
  });
}

