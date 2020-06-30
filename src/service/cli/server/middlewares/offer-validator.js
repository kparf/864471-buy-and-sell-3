'use strict';

const {HttpCode} = require(`../../../../constants`);

const KEYS = [
  `category`,
  `description`,
  `picture`,
  `title`,
  `type`,
  `sum`,
];

module.exports = (req, res, next) => {
  const offer = req.body;
  const offerKeys = Object.keys(offer);
  const keysExists = KEYS.every((key) => offerKeys.includes(key));

  if (!keysExists) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .send(`Bad request`);
  }

  next();
};
