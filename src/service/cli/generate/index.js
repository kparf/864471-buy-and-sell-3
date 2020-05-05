'use strict';

const fs = require(`fs`);
const util = require(`util`);
const chalk = require(`chalk`);
const {
  getRandomInt,
  shuffle,
  padStart,
  readContent,
} = require(`../../utils`);
const {
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
} = require(`../../../constants`);


const offerTypes = require(`./content/types.json`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};
const CategorySizeRestrict = {
  MIN: 1,
  MAX: 3,
};

const getPictureFileName = (index) => `item${padStart(index, 2, `0`)}.jpg`;
const generateCategories = (count, categories) => shuffle(categories).slice(0, count);

const generateOffers = (count, titles, categories, sentences) => (
  Array(count).fill({}).map(() => ({
    category: generateCategories(
        getRandomInt(CategorySizeRestrict.MIN, CategorySizeRestrict.MAX),
        categories,
    ),
    description: shuffle(sentences).slice(1, 5).join(` `),
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
    try {
      const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
      const titles = await readContent(FILE_TITLES_PATH);
      const categories = await readContent(FILE_CATEGORIES_PATH);
      const sentences = await readContent(FILE_SENTENCES_PATH);

      const content = JSON.stringify(generateOffers(
          countOffer,
          titles,
          categories,
          sentences,
      ), null, 2);
      await writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  },
};
