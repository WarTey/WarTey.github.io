var modal = document.getElementById("modal");
var btnOpen = document.getElementById("open");
var btnClose = document.getElementById("close");

btnOpen.onclick = function() {
	modal.style.display = "block";
	btnOpen.style.display = "none";
}

btnClose.onclick = function () {
	modal.style.display = "none";
	btnOpen.style.display = "block";
}

window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
		btnOpen.style.display = "block";
	}
}
