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
const sheetNameSet = "Setting";
const sheetNameR1 = "Round 1";
const sheetNameR2 = "Round 2";
const sheetNameR3 = "Round 3";
const sheetNameR4 = "Round 4";
const sheetNameR5 = "Round 5";
const sheetNameR6 = "Round 6";
const sheetNameR7 = "Round 7";
const sheetNameR8 = "Round 8";
const sheetNameR9 = "Round 9";
const sheetNameR10 = "Round 10";
const interval = 1000;

var timer = 10;
var totalScore = 0;

get("Résultats", updateSheetRes);

setInterval(function () {
	refreshTimer.innerHTML = "Raffraîchissement dans " + timer-- + "s";
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

function updateLifeColor(el, value) {
	el.innerHTML = value > -1 ? value : "💀";
	if (value > 7)
		el.style.color = "green";
	else if (value > 3)
		el.style.color = "orange";
	else if (value > 0)
		el.style.color = "red";
}

function updateSheetRound(values) {
	updateLifeColor(playerOneLife, values[68][3]);
	updateLifeColor(playerTwoLife, values[69][3]);
	updateLifeColor(playerThreeLife, values[70][3]);
	updateLifeColor(playerFourLife, values[71][3]);
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

	totalScore = values[3][2] + values[4][2] + values[5][2] + values[6][2];
	get("Round " + (totalScore + 1), updateSheetRound);
}
