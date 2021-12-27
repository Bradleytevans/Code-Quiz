var currQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var ChoicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

function startQuiz() {
	var startEl = document.getElementById("start");
	startEl.setAttribute("class", "hide");
	questionsEl.removeAttribute("class");
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
	if (currQuestionIndex === questions.length) {
		quizEnd();
	} else {
		getQuestion();
	}
}

function quizEnd() {
	clearInterval(timerId);
	var endEl = document.getElementById("end");
	endEl.removeAttribute("class");
	var finalScoreEl = document.getElementById("final-score");
	finalScoreEl.textContent = time;
	questionsEl.setAttribute("class", "hide");
}

function clockTick() {
	time--;
	timerEl.textContent = time;
	if (time <= 0) {
		quizEnd();
	}
}

function saveHighscore() {
	var initials = initialsEl.value.trim();
	if (initials !== "") {
		var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
		var newScore = {
			score: time,
			initials: initials,
		};
		highscores.push(newScore);
		window.localStorage.setItem("highscores", JSON.stringify(highscores));
		window.location.href = "highscores.html";
	}
}

function checkForEnter(event) {
	if (event.key === "Enter") {
		saveHighscore();
	}
}
submitBtn.onclick = saveHighscore;
startBtn.onclick = startQuiz;
initialsEl.onkeyup = checkForEnter;