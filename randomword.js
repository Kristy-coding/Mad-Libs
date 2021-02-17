//need to install 'npm i random-part-of-speech'
const rpos = require('random-part-of-speech');
const fs = require('fs');
const seekableStream = require('fs-readstream-seek');

const VERB = "verb", NOUN = "noun", ADVERB = "adverb", ADJECTIVE = "adjective";

//functions
module.exports = {
	getVerbs: (amount = 3) => getWord(VERB, amount),
	getNouns: (amount = 3) => getWord(NOUN, amount),
	getAdverbs: (amount = 3) => getWord(ADVERB, amount),
	getAdjectives: (amount = 3) => getWord(ADJECTIVE, amount),
};



//this produces a data file path
function getPathOfType(type) {
	if(type = [NOUN, VERB, ADVERB, ADJECTIVE][randomInt(0, 3)]); {
	return `${__dirname}/word_files/${type}s.words`;
}

//returns a random word
function getWord(type, amount) {
	return new Promise((resolveMain, rejectMain) => {
		if(amount <= 0) {
			resolveMain([]);
			return;
		}

		try {
			//open the desired file as a stream to freely seek around it
			const data_path = getPathOfType(type);
			const file_size = fs.stat(data_path, (err, stats) => {
				if(err) {
					rejectMain(err);
					return;
				}
				var data_stream = new seekableStream(data_path);
				data_stream.setEncoding('utf8');

				//grab a random word from the stream `amount` times
				var promise_array = [];
				for (var i = amount - 1; i >= 0; i--) {

					promise_array.push(
						() => new Promise((resolve, reject) => {
							data_stream.seek(randomInt(0, stats.size - 1));
							data_stream.on('data', chunk => {
								chunk = chunk.split("\n");
								if(chunk.length < 2) {
									data_stream.seek(randomInt(0, stats.size));
									return;
								}
								data_stream.removeAllListeners('data');
								resolve(chunk[1]);
								return;
							});
						})
					);

				}
				promise_array.reduce((chain, nextPromiseFunc) => {
					return chain.then(word_array => {
						return nextPromiseFunc().then(last_word => {
							return [...word_array, last_word];
						});
					});
				}, Promise.resolve([]))
				.then(word_array => {
					data_stream.destroy();
					resolveMain(word_array);
				});
			});
		} catch(err) {
			rejectMain(err);
			return;
		}
	});
}
}
