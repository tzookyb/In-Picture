'use strict'
var gGameBoard = document.querySelector('.mainboard');
var gModal = document.querySelector('.modal');
var gCurrQuestNum;
var gCorrectAns = 0;
var gQuestions = [];

var gModalContent = [
    { id: 0, HTMLcontent: `What's-in-the-picture?<br/><img class="detective" src="img/detective-1424831_640.png"/><div class="modalbutton">Let's begin</div>` },
    { id: 1, HTMLcontent: `<br/><br/>That's Correct!<div class="modalbutton">Continue</div><div class="modalbutton" onclick="renderQuestion()">Continue</div>` },
    { id: 2, HTMLcontent: `<br/><br/>Sorry!<br/>That's wrong!<div class="modalbutton" onclick="renderQuestion()">Continue</div>` },
];

function init() {
    gCorrectAns = 0;
    createQuest()
    renderQuestion()
}

function renderQuestion() {
    if (gQuestions.length === 0) {
        finishGame();
        return;
    }
    gModal.style.display = 'none';
    gCurrQuestNum = getRandomInt(0, gQuestions.length - 1);
    var img = gGameBoard.querySelector('img');
    img.src = `img/Q${gQuestions[gCurrQuestNum].id}.jpg`;
    var quest = gGameBoard.querySelector('.question');
    quest.innerText = gQuestions[gCurrQuestNum].question;
    var answer0 = gGameBoard.querySelector('.answerbox0');
    answer0.innerText = gQuestions[gCurrQuestNum].options[0];
    var answer1 = gGameBoard.querySelector('.answerbox1');
    answer1.innerText = gQuestions[gCurrQuestNum].options[1];
    gGameBoard.style.display = 'block';
}
function checkAnswer(option) {
    if (option === gQuestions[gCurrQuestNum].correctOption) {
        gCorrectAns++;
        gQuestions.splice(gCurrQuestNum, 1);
        toastCorrect();
        return;
    } else {
        gQuestions.splice(gCurrQuestNum, 1);
        toastWrong();
    }
}

function toastCorrect() {
    gGameBoard.style.display = 'none';
    new Audio('audio/correct.mp3').play();
    gModal.innerHTML = gModalContent[1].HTMLcontent;
    gModal.style.display = 'block';
}

function toastWrong() {
    gGameBoard.style.display = 'none';
    new Audio('audio/wrong.mp3').play();
    gModal.innerHTML = gModalContent[2].HTMLcontent;
    gModal.style.display = 'block';
}

function finishGame() {
    gGameBoard.style.display = 'none';
    gModal.innerHTML = `<br/><br/>Game Over.<br/>You answered ${gCorrectAns} ${gCorrectAns === 1 ? 'question ' : 'questions '}right.<div class="modalbutton" onclick="init()">Start Again?</div>`;
    gModal.style.display = 'block';
}

function createQuest() {
    gQuestions = [
        { id: 1, question: 'How many rubber bands are in the picture?', options: ['More than 100.', 'More than 200.'], correctOption: 1 },
        { id: 2, question: 'How many leaves are in the picture?', options: ['More than the strawberrys.', 'More than the average amount of olives on a pizza.'], correctOption: 0 },
        { id: 3, question: 'How many Minion dolls are visible in the picture', options: ['Twenty-Five.', 'The amount of minutes it takes me to shower.'], correctOption: 0 },
        { id: 4, question: 'How many pointy shells are in the picture?', options: ['Same as Bar-Mitzva boy\'s age.', 'Same as Michael Jordan\'s jersey number.'], correctOption: 0 }
    ]
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}