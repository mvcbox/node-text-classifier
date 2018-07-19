'use strict';

const { findBestMatch } = require('string-similarity');
const prepareString = require('./prepare-string');

/**
 * @param {string} string
 * @param {Array} array
 * @param {Array} replacers
 * @return {*|{ratings, bestMatch}}
 */
module.exports = function (string, array, replacers) {
    return findBestMatch(
        prepareString(string, replacers),
        array.map(function (item) {
            return prepareString(item, replacers);
        })
    );
};
