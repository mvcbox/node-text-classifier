'use strict';

/**
 * @param {string} string
 * @returns {string}
 */
module.exports = function (string) {
    return String(string).toLowerCase().replace(/[\-_]+/g, ' ').replace(/[^\w\d\s]+/g, '').replace(/\s+/g, ' ').trim();
};
