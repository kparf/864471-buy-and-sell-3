'use strict';

const fs = require(`fs`);
const util = require(`util`);
const {getRandomInt, shuffle, padStart} = require(`../../utils`);
const titles = require(`./content/titles.json`);
const categories = require(`./content/categories.json`);
const descriptions = require(`./content/descriptions.json`);
const offerTypes = require(`./content/types.json`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const SumRestrict = {
  min: 1000,
  max: 100000,
};

const getPictureFileName = (index) => `item${padStart(index, 2, `0`)}.jpg`;

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: [categories[getRandomInt(0, categories.length - 1)]],
    description: shuffle(descriptions).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(0, 16)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: offerTypes[getRandomInt(0, offerTypes.length - 1)],
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
  }))
);

const writeFile = util.promisify(fs.writeFile);

module.exports = {
  name: `--generate`,
  async run(count) {
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer), null, 2);

    await writeFile(FILE_NAME, content);
    console.info(`Operation success. File created.`);
  },
};
