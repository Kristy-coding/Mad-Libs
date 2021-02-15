//need to install 'npm i random-part-of-speech'
const rpos = require('random-part-of-speech');
 
//print random nouns (six) for user to choose
rpos.getNouns(6).then(response => ['train', 'hook', 'stove', 'cat', 'rice', 'dog']

//print random adjectives (six) for user to choose
rpos.getAdjectives(6).then(response => ['scrawny', 'enchanting', 'mute', 'bored', 'weak', 'cloudy']

//print random adverbs (six) for user to choose
rpos.getAdverbs(6).then(response => ['currently', 'upright','longingly','woefully','freely','vastly']

//print random verbs (six) for user to choose
rpos.getVerbs(6).then(response => ['screw', 'listen', 'doubt', 'attempt', 'approve', 'rob']