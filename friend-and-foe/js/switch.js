const modal = document.getElementById("modal");
const frame = document.getElementById("players-frame");
const btnOpen = document.getElementById("open");
const btnScores = document.getElementById("scores");
const loading = document.getElementById("loading");
const scoreboard = document.getElementById("players-frame");

function updateFrame() {
	if (frame.style.display == "none") fadeIn(frame);
	else fadeOut(frame);
}

function openModal(el) {
	el.style.display = "block";
	btnOpen.style.display = "none";
	btnScores.style.display = "none";
}

function closeModal() {
	modal.style.display = "none";
	scoreboard.style.display = "none";
	btnOpen.style.display = "block";
	btnScores.style.display = "block";
}

btnOpen.onclick = function () { openModal(modal); }
btnScores.onclick = function () { openModal(scoreboard); }

window.onclick = function (event) { if (event.target == modal || event.target == scoreboard) closeModal(); }

function fadeOut(el) {
	el.style.opacity = 1;
	(function fade() {
		if ((el.style.opacity -= .1) < 0) el.style.display = "none";
		else requestAnimationFrame(fade);
	})();
};

function fadeIn(el) {
	el.style.opacity = 0;
	el.style.display = "block";
	(function fade() { if ((el.style.opacity -= -.1) < 1) requestAnimationFrame(fade); })();
};

document.onreadystatechange = function () {
	if (document.readyState == 'complete') {
		setTimeout(function () {
			closeModal();
			fadeOut(loading);
		}, 2000);
	}
}