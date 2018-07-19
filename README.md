# Text Classifier

##Example
```javascript
'use strict';

const TextClassifier = require('text-classifier');

let classifier = new TextClassifier;

// Learn #1
// positive
classifier.learn('amazing, awesome movie!! Yeah!! Oh boy.', 'positive');
classifier.learn('Sweet, this is incredibly, amazing, perfect, great!!', 'positive');
// negative
classifier.learn('terrible, shitty thing. Damn.', 'negative');

// Learn #2
// positive
classifier.learn([
    'amazing, awesome movie!! Yeah!! Oh boy.',
    'Sweet, this is incredibly, amazing, perfect, great!!'
], 'positive');
// negative
classifier.learn('terrible, shitty thing. Damn.', 'negative');

// Learn #3
classifier.learn({
    // positive
    'amazing, awesome movie!! Yeah!! Oh boy.': 'positive',
    'Sweet, this is incredibly, amazing, perfect, great!!': 'positive',
    // negative
    'terrible, shitty thing. Damn.': 'negative'
});

// Classify
classifier.classify('awesome, cool, amazing!! Yay.');
//=> { score: 0.6153846153846154, textClass: 'positive' }
```