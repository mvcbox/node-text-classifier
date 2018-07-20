'use strict';

const kindOf = require('kind-of');
const prepareString = require('./prepare-string');
const { findBestMatch } = require('string-similarity');

class TextClassifier {
    /**
     * @param {Object} options
     */
    constructor(options) {
        this._data = {};
        this._options = Object.assign({
            replacers: [
                [/[\-_]+/g, ' '],
                [/[^\w\d\s]+/g, '']
            ]
        }, options || {});
    }

    /**
     * @param {string|Array|Object} text
     * @param {string} textClass
     * @returns {TextClassifier}
     */
    learn(text, textClass) {
        if (typeof text === 'string') {
            if (!this._data[textClass]) {
                this._data[textClass] = [];
            }

            this._data[textClass].push(prepareString(text, this._options.replacers));
        } else if (Array.isArray(text)) {
            for (let _text of text) {
                this.learn(_text, textClass);
            }
        } else if (kindOf(text) === 'object') {
            for (let _text in text) {
                this.learn(_text, text[_text]);
            }
        }

        return this;
    }

    /**
     * @param {string} text
     * @returns {{score: number, textClass: text}}
     */
    classify(text) {
        text = prepareString(text, this._options.replacers);
        let textClass = '';
        let score = 0;
        let bestMatch;

        for (let _textClass in this._data) {
            bestMatch = findBestMatch(text, this._data[_textClass]);

            if (bestMatch.bestMatch.rating > score) {
                score = bestMatch.bestMatch.rating;
                textClass = _textClass;
            }
        }

        return {
            score,
            textClass
        };
    }

    /**
     * @returns {string}
     */
    toJSON(){
        return JSON.stringify(this._data);
    }

    /**
     * @param {string|Object} data
     * @returns {TextClassifier}
     */
    load(data){
        if (typeof data === 'string') {
            this._data = JSON.parse(data);
        } else if (kindOf(data) === 'object') {
            this._data = Object.assign({}, data);
        }

        return this;
    }
}

module.exports = TextClassifier;
