//function to generate Noun
var nouns = ["clock", "doorway", "heart", "hammer"];
var noun = nouns[Math.floor(Math.random() * nouns.length)];
var randomNoun = GetNoun();
randomNoun.SetVar("RandomNoun", noun);
