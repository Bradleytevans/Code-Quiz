function printHighscores() {
	var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
	highscores.sort((a, b) => {
		return b.score - a.score;
	});
	highscores.forEach((score) => {
		var li = document.createElement("li");
		li.textContent = score.initials + '-' + score.score;
		var ol = document.getElementById('highscores');
		ol.appendChild(li);
	});
}
function clearHighscores() {
	window.localStorage.removeItem("highscores");
	window.location.reload();
}
document.getElementById("clear").onclick = clearHighscores;
printHighscores();