function printHighscores() {
	var highscores = JSON.parse(window.localStorage.getItem('Highscores')) || [];
	highscores.sort((a, b) => {
		return b.score - a.score;
	});
	highscores.forEach((score) => {
		var li = document.createElement("li");
		li.textContent = score.initials + '-' + score.score;
		var ol = document.getElementsById('highscores');
		ol.appendChild(li);
	});
}
function clearHighscores() {
	window.localStorage.removeItem("highscores");
	window.location.reload();
}
document.getElementById("clear").onclick = clearHighscores;
printHighscores();