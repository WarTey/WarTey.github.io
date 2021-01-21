$(document).ready(function () {
	var sections = ["#presentation", "#skills", "#projects"];
	var isFading = false;
	var fadeTimer = 250;
	var currentSection;

	// Hide all sections
	function hide(time) {
		sections.forEach(element => {
			$(element).fadeOut(time);
		});
	}

	// Show one specific section
	function show(time, index) {
		$(sections[index]).fadeIn(time);
	}

	// Initialize section
	function init() {
		// This action is mandatory to put the display flex rule in fadeIn/fadeOut memory
		sections.forEach(element => {
			$(element).css("display", "flex").hide();
		});

		// Get the id from the url and display the section
		if (sections.includes(location.hash)) {
			show(fadeTimer, sections.indexOf(location.hash));
		} else {
			location.hash = sections[0];
			show(fadeTimer, 0);
		}
		// Save/Init current section
		currentSection = $("div.hidden").not(":hidden").prop("id");
	}

	// Start page transition from one section to another
	function updatePage(time, index) {
		isFading = true;
		hide(time);

		setTimeout(function () {
			show(time, index);
		}, time);

		// Will be available to scroll when section will be fully displayed
		setTimeout(function () {
			isFading = false;
		}, time * 2);
	}

	// Change hash in url
	function updateLocationHash(index) {
		currentSection = sections[index].substring(1, sections[index].length);
		location.hash = sections[index];
	}

	function getScrollState(event) {
		var indexCurrentSection = sections.indexOf("#" + currentSection);
		// When scrolling down and at the bottom of the page
		if (Math.abs($("#" + currentSection).offset().top) + $(window).height() >= $(document).height() && !(event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0)) {
			indexCurrentSection = (indexCurrentSection + 1) % sections.length;
			updateLocationHash(indexCurrentSection);
		// When scrolling up and at the top of the page
		} else if ($("#" + currentSection).offset().top >= 0 && (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0)) {
			indexCurrentSection -= 1;
			if (indexCurrentSection < 0) {
				indexCurrentSection = sections.length - 1;
			}
			updateLocationHash(indexCurrentSection);
		}
	}

	init();

	$(window).bind('mousewheel DOMMouseScroll', function (event) {
		if (!isFading) {
			getScrollState(event);
		}
	});

	$(window).on('hashchange', function () {
		if (sections.indexOf(location.hash) > -1) {
			updatePage(fadeTimer, sections.indexOf("#" + currentSection));
		}
	});
});