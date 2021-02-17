
//get random adjective from array
var adjectives = ["gullible", "possible", "milky", "scrawny", "mute", "bored", "weak", "cloudy", "fumbling", "shrill", "zippy", "brash", "spicy", "talented", "smart", "swanky", "kaput", "square", "mundane"];
//var randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];


//get random adverb from array
var adverbs = ["weakly", "likely", "seriously", "elegantly", "powerfully", "roughly", "truly", "crazily","dearly", "afterwards", "helplessly", "rigidly", "lovingly", "anyway", "currently", "upright", "longingly", "woefully", "freely","vastly"];
//var randomAdverb = adverbs[Math.floor(Math.random() * adverbs.length)];


//get random noun from array
var nouns = ["system", "clam", "sleet", "riddle", "quiver", "meal", "thing", "number", "burst", "screw","train", "hook", "stove", "cat", "rice", "dog", "milk", "soup", "juice","yam"];
//var randomNoun = nouns[Math.floor(Math.random() * nouns.length)];


//on-click random verb returned
//get random verb from array
var verbs = ["fancy", "destroy","wink", "prevent", "fix", "crash", "tease", "curve", "screw", "doubt","attempt", "approve", "rob", "amuse", "lighten", "sniff", "rejoice", "laugh", "soothe"];
//var randomVerb = verbs[Math.floor(Math.random() * verbs.length)];

var word = document.querySelector(".random-word")
//console.log(word)
//var input_box = document.querySelector(".random-word-input")

function randomWord(event){

    event.preventDefault();
    //document.location.reload()
    //document.location.reload()
    //event.target.value
    console.log(event.target.value)
    //input_box.placeholder = "yoyo"
    
    if(event.target.value === "verb"){
        var randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
        word.textContent = randomVerb
        
    }
    if(event.target.value === "adjective"){
        var randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        word.textContent = randomAdjective 
    }
    if(event.target.value === "adverb"){
        var randomAdverb = adverbs[Math.floor(Math.random() * adverbs.length)];
        word.textContent = randomAdverb
    }
    if(event.target.value === "noun"){
        var randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
        word.textContent = randomNoun
    }


}



document.querySelector(".random-word-container").addEventListener("click", randomWord)
//document.querySelector('.choose-template-list').addEventListener('click', createStoryHandler);
// put event listener on button group 
// set text area textContent to random part of speech that was clicked 
