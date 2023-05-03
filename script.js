const anagramWord = document.querySelector('#anagramWord');
const wordsLeft = document.querySelector('#wordsLeft');
const possibleWord = document.querySelector('#possibleWord');
const checkWord = document.querySelector('#checkWord');
const correctlyGuessedWords = document.querySelector('#correctlyGuessedWords');
const incorrectlyGuessedWords = document.querySelector('#incorrectlyGuessedWords');
const godMode = document.querySelector('#godMode');

var generatedAnagramObject;
var generatedAnagramWord;
var generatedAnagramWords;
var correctlyGuessedWordsList = [];
var incorrectlyGuessedWordsList = [];

async function generateAnagramObject() {
    var response = await fetch('https://shadify.dev/api/anagram/generator');
    generatedAnagramObject = await response.json();
}

function unpackGeneratedAnagramObject(){
    generatedAnagramWord = generatedAnagramObject["task"];
    generatedAnagramWords = generatedAnagramObject["words"];
}

function reflectAnagramWord () {
    anagramWord.innerHTML = generatedAnagramWord;
}

function reflectWordsLeft() {
    var wordsLeftCount = generatedAnagramWords.length - correctlyGuessedWordsList.length;
    wordsLeft.innerHTML = `${wordsLeftCount} words left`;
}

function correctlyGuessedWordsAppend(word) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.classList.add("text-success");
    td.innerHTML = word;
    tr.append(td);
    correctlyGuessedWords.appendChild(tr)
}

function incorrectlyGuessedWordsAppend(word) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.classList.add("text-danger");
    td.innerHTML = word;
    tr.append(td);
    incorrectlyGuessedWords.appendChild(tr)
}

function correctlyGuessedWordsReset() {
    correctlyGuessedWords.replaceChildren();
}

function incorrectlyGuessedWordsReset() {
    incorrectlyGuessedWords.replaceChildren();
}

function guessedWordsListReset(){
    correctlyGuessedWordsList = []
    incorrectlyGuessedWordsList = []
}

async function resetAnagram() {
    await generateAnagramObject();
    unpackGeneratedAnagramObject();
    reflectAnagramWord();
    reflectWordsLeft();
    correctlyGuessedWordsReset();
    incorrectlyGuessedWordsReset();
    guessedWordsListReset();
}

function printCheats(){
    console.log(generatedAnagramWords);
}



// Program run

await resetAnagram();

possibleWord.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        checkWord.click();
    }
})

checkWord.addEventListener('click', async () => {
    var userInput = possibleWord.value
    if (generatedAnagramWords.includes(userInput)) {
        if (!correctlyGuessedWordsList.includes(userInput)) {
            correctlyGuessedWordsList.push(userInput);
            correctlyGuessedWordsAppend(userInput);
            reflectWordsLeft();
        }

    } else {
        if (!incorrectlyGuessedWordsList.includes(userInput)) {
            incorrectlyGuessedWordsList.push(userInput);
            incorrectlyGuessedWordsAppend(userInput);
        }
    }
    possibleWord.value = '';

    if ((generatedAnagramWords.length - correctlyGuessedWordsList.length) == 0) {
        await resetAnagram();
    }
})

resetWord.addEventListener('click', async () => {
    await resetAnagram();
})

godMode.addEventListener('click', () => {
    printCheats();
})