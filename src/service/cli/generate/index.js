'use strict';

const {nanoid} = require(`nanoid`);
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
  FILE_COMMENTS_PATH,
  MAX_ID_LENGTH,
} = require(`../../../constants`);
const logger = require(`../../../logger`);


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
const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const generateOffers = (
  count,
  titles,
  categories,
  sentences,
  comments,
) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    category: generateCategories(
        getRandomInt(CategorySizeRestrict.MIN, CategorySizeRestrict.MAX),
        categories,
    ),
    description: shuffle(sentences).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(1, 16)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: offerTypes[getRandomInt(0, offerTypes.length - 1)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    comments: generateComments(getRandomInt(1, comments.length - 1), comments),
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
      const comments = await readContent(FILE_COMMENTS_PATH);

      const content = JSON.stringify(generateOffers(
          countOffer,
          titles,
          categories,
          sentences,
          comments,
      ), null, 2);
      await writeFile(FILE_NAME, content);
      logger.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      logger.error(chalk.red(`Can't write data to file...`));
    }
  },
};
