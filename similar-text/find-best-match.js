'use strict';

const { findBestMatch } = require('string-similarity');
const prepareString = require('./prepare-string');

/**
 * @param {string} string
 * @param {Array} array
 * @return {*|{ratings, bestMatch}}
 */
module.exports = function (string, array) {
    return findBestMatch(prepareString(string), array.map(prepareString));
};
