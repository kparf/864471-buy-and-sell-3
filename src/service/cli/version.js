'use strict';

const packageJson = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  async run() {
    const {version} = packageJson;
    console.info(version);
  },
};
