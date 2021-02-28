// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!");
   word = input.question("Enter a word to score: ")
   return word;
}
let simpleScore = function(word){
  let letterPoints = word.length;
  return letterPoints; 
} 

let vowelBonusScore = function(word){
  word = word.toUpperCase();
  let letterPoints = 0;
    for (let i = 0; i < word.length; i++){
      if (word[i] === "A" ||word[i] === "E" ||word[i] === "I" ||word[i] === "O" ||word[i] === "U"){
        letterPoints+= 3;
      }else{
        letterPoints++;
      }
    }
  return letterPoints;
}

let scrabbleScore = function(word){
 word = word.toLowerCase();
  let letterPoints = 0;
  for (let i = 0; i < word.length; i++) {
    for (letter in newPointStructure) {
      if (letter == word[i] ) {
        letterPoints += Number(newPointStructure[letter])
      }
    }
  }
  return letterPoints;

}

let simplePoints = {name:'Simple Score',
description:'Each letter is worth 1 point',
scoringFunction: simpleScore};

let vowelBonusPoints = {name: 'Bonus Vowels',
description: 'Vowels are 3 pts, consonants are 1 pt.',
scoringFunction: vowelBonusScore};

let scrabblePoints = {name: 'Scrabble', 
description: 'The traditional scoring algorithm.',
scoringFunction: scrabbleScore};

const scoringAlgorithms = [simplePoints,vowelBonusPoints,scrabblePoints ];


function scorerPrompt(userWord) {
console.log(`Which scoring method would you like to use?\n\
0 - ${simplePoints.name}: ${simplePoints.description}\n
1 - ${vowelBonusPoints.name}: ${vowelBonusPoints.description}\n
2 - ${scrabblePoints.name}: ${scrabblePoints.description}\n`)

  let scoringChoice = input.question("Enter 0, 1, or 2: ");
  return console.log(`Score for "${userWord}": ${scoringAlgorithms[scoringChoice].scoringFunction(userWord)}`);
}

function transform(obj) {
  let transformedObj = {};
  for (item in obj){
    for (i = 0; i < obj[item].length; i++) {
      transformedObj[obj[item][i].toLowerCase()] = Number(item);
    }
  }
  return transformedObj;
};

 let newPointStructure = transform(oldPointStructure);

function runProgram() {
  let word = initialPrompt();
  scorerPrompt(word);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};