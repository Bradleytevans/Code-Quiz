var currQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var ChoicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElEmentById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

function startQuiz() {
  var startEl = document.getElEmentById("start");
  startEl.setAttribute("class", "hide");
  questionsEL.removeAttribute("class");
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  var currQuestion = questions[currQuestionIndex];
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currQuestion.title;
  ChoicesEl.innerHTML = "";
  currQuestion.choices.forEach((choice, i) => {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);
    choiceNode.textContent = i + 1 + ". " + choice;
    choiceNode.onclick = questionClick;
    ChoicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
    if (this.value !== questions[currQuestionIndex].answer) {
        time -= 15;
        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
        feedbackEl.textContent = "Wrong!";
    } else {
        feedbackEl.textContent = "Correct";
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(() => {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);
    currQuestionIndex++;
    if (currQuestionIndex ===  questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

startBtn.onclick = startQuiz;
