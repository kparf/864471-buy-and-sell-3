'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../../../constants`);
const logger = require(`../../../../logger`);


class CommentService {
  constructor(offers = []) {
    this._data = offers;
  }

  create(offerId, comment) {
    try {
      const offer = this._data.find((item) => item.id === offerId);
      if (!offer) {
        return null;
      }
  
      const newComment = {
        id: nanoid(MAX_ID_LENGTH),
        ...comment,
      }
      offer.comments.push(newComment);
      return newComment;
    } catch (err) {
      logger.error(err);
      return null;
    }
  }

  drop(offerId, commentId) {
    try {
      const offer = this._data.find((item) => item.id === offerId);
      if (!offer) {
        return null;
      }

      const comment = offer.comments.find((item) => item.id === commentId);
      if (!comment) {
        return null;
      }

      offer.comments = offer.comments.filter((item) => item.id !== commentId);
      return comment;
    } catch (err) {
      logger.error(err);
      return null;
    }
  }
}

module.exports = CommentService;