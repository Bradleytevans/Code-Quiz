var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var ChoicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElEmentById("start");
var initialsEl = document.getElementById("initals");
var feedbackEl = document.getElementById("feedback");

function startQuiz() {
    var startEl = document.getelEmentById("start");
    startEl.setAttribute("class", "hide");
    questionsEL.removeAttribute("class");
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;

    getQuestion();
};

startBtn.onclick = startQuiz;