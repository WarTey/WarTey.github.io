var modal = document.getElementById("modal");
var btnOpen = document.getElementById("open");
var btnClose = document.getElementById("close");
var loading = document.getElementById("loading");

function openModal() {
	modal.style.display = "block";
	btnOpen.style.display = "none";
}

function closeModal() {
	modal.style.display = "none";
	btnOpen.style.display = "block";
}

btnOpen.onclick = function() { openModal(); }
btnClose.onclick = function () { closeModal(); }

window.onclick = function(event) { if (event.target == modal) closeModal(); }

function fadeOut(el) {
	el.style.opacity = 1;
	(function fade() {
		if ((el.style.opacity -= .1) < 0) el.style.display = "none";
		else requestAnimationFrame(fade);
	})();
};

document.onreadystatechange = function () {
	if (document.readyState == 'complete') {
		setTimeout(function () {
			closeModal();
			fadeOut(loading);
		}, 2000);
	}
}
