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
  MIN: 1000,
  MAX: 100000,
};
const CategorySizeRestrict = {
  MIN: 1,
  MAX: Math.min(3, categories.length),
};

const getPictureFileName = (index) => `item${padStart(index, 2, `0`)}.jpg`;
const generateCategories = (count) => shuffle(categories).slice(0, count);

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: generateCategories(getRandomInt(CategorySizeRestrict.MIN, CategorySizeRestrict.MAX)),
    description: shuffle(descriptions).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(1, 16)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: offerTypes[getRandomInt(0, offerTypes.length - 1)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }))
);

const writeFile = util.promisify(fs.writeFile);

module.exports = {
  name: `--generate`,
  description: `формирует файл mocks.json`,
  async run(count) {
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer), null, 2);

    await writeFile(FILE_NAME, content);
    console.info(`Operation success. File created.`);
  },
};
