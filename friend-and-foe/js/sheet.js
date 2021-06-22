const baseUrl = "https://script.google.com/macros/s/AKfycbwK1JkieFunHfzijnOJxpNebWZCsYgVi8BxCqbzjdkv1pZKrnscNwZ3ftiOxDY_Xozs/exec";
const spreadsheetId = "13_GMlu8BCvk7AfyK2nBOetkdYnUdV725-m-5Tc6IBmk";
const refreshTimer = document.getElementById("refresh-timer");
const playerOneName = document.getElementById("player-one-name");
const playerTwoName = document.getElementById("player-two-name");
const playerThreeName = document.getElementById("player-three-name");
const playerFourName = document.getElementById("player-four-name");
const playerOnePoints = document.getElementById("player-one-points");
const playerTwoPoints = document.getElementById("player-two-points");
const playerThreePoints = document.getElementById("player-three-points");
const playerFourPoints = document.getElementById("player-four-points");
const playerOneLife = document.getElementById("player-one-life");
const playerTwoLife = document.getElementById("player-two-life");
const playerThreeLife = document.getElementById("player-three-life");
const playerFourLife = document.getElementById("player-four-life");
const bossLife = document.getElementById("boss-life");
const interval = 1000;

var timer = 10;
var totalScore = 0;

get("Résultats", updateSheetRes);

setInterval(function () {
	refreshTimer.innerHTML = "Rafraîchissement des scores dans " + timer-- + "s";
	if (timer < 0) {
		timer = 10;
		get("Résultats", updateSheetRes);
	}
}, interval);

function get(sheetName, callback) {
	var para = {
		spreadsheetId: spreadsheetId,
		sheetName: sheetName
	};
	var q = new URLSearchParams(para);
	var url = baseUrl + "?" + q;

	fetch(url).then(res => res.json()).then(res => {
		const values = res.values;
		callback(values);
	});
}

function updateLifeColor(el, value, b1, b2) {
	el.innerHTML = value > 0 ? value : "💀";
	if (value > b1)
		el.style.color = "green";
	else if (value > b2)
		el.style.color = "orange";
	else if (value > 0)
		el.style.color = "red";
}

function updateSheetRound(values) {
	updateLifeColor(playerOneLife, values[68][3], 7, 3);
	updateLifeColor(playerTwoLife, values[69][3], 7, 3);
	updateLifeColor(playerThreeLife, values[70][3], 7, 3);
	updateLifeColor(playerFourLife, values[71][3], 7, 3);
	updateLifeColor(bossLife, values[68][21], 29, 14);
}

function checkWinner(value, el, name) {
	el.innerHTML = value;
	if (value < 3)
		el.style.color = "black";
	else {
		el.style.color = "green";
		alert(name.innerHTML + " est le grand champion !");
	}
}

function updateSheetRes(values) {
	playerOneName.innerHTML = values[3][1];
	playerTwoName.innerHTML = values[4][1];
	playerThreeName.innerHTML = values[5][1];
	playerFourName.innerHTML = values[6][1];

	checkWinner(values[3][2], playerOnePoints, playerOneName);
	checkWinner(values[4][2], playerTwoPoints, playerTwoName);
	checkWinner(values[5][2], playerThreePoints, playerThreeName);
	checkWinner(values[6][2], playerFourPoints, playerFourName);

	get("Round " + values[3][7], updateSheetRound);
}
