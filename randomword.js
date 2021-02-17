var myAdjective;
var myAdverb;
var myNoun;
var myVerb;
var compiled = Handlebars.compile(myTemplate);

//on-click random adjective returned
$('#adjective').click(function(){
  myAdjective = $('#adjective').val();
  $('#adjective').html(compiled({adjective:myAdjective}));
//get random adjective from array
var adjectives = ["gullible", "possible", "milky", "scrawny", "mute", "bored", "weak", "cloudy", "fumbling", "shrill", "zippy", "brash", "spicy", 			"talented", "smart", "swanky", "kaput", "square", "mundane"];
var randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
});

//on-click random adverb returned
$('#adverb').click(function(){
	myAdverb = $('#adverb').val();
	$('#adverb').html(compiled({adverb:myAdverb}));
//get random adverb from array
var adverbs = ["weakly", "likely", "seriously", "elegantly", "powerfully", "roughly", "truly", "crazily","dearly", "afterwards", "helplessly", "rigidly", "lovingly", "anyway", "currently", "upright", "longingly", "woefully", "freely","vastly"];
var randomAdverb = adverbs[Math.floor(Math.random() * adverbs.length)];
});

//on-click random noun returned
$('#noun').click(function(){
	myNoun = $('noun').val();
	$('#noun').html(compiled({noun:myNoun}));
//get random noun from array
var nouns = ["system", "clam", "sleet", "riddle", "quiver", "meal", "thing", "number", "burst", "screw","train", "hook", "stove", "cat", "rice", "dog", "milk", "soup", "juice","yam"];
var randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
});

//on-click random verb returned
$('#verb').click(function(){
	myVerb = $('verb').val();
	$('#verb').html(compiled({verb:myverb}));
//get random verb from array
var verbs = ["fancy", "destroy","wink", "prevent", "fix", "crash", "tease", "curve", "screw", "doubt","attempt", "approve", "rob", "amuse", "lighten", "sniff", "rejoice", "laugh", "soothe"];
var randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
});

