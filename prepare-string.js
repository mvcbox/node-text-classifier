'use strict';

/**
 * @param {string} string
 * @param {Array} replacers
 * @returns {string}
 */
module.exports = function (string, replacers) {
    string = String(string).toLowerCase();

    for (let _replacer of replacers) {
        string = string.replace(..._replacer);
    }

    return string.replace(/\s+/g, ' ').trim();
};
