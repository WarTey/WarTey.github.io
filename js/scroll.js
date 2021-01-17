$(document).ready(function () {
	var sections = ["presentation", "skills"];
	var sectionIndex = 0;
	var isScrolling = false;
	var scrollTime = 500;
	var pageHeightForAnimation = 665;
	var mobilePage = $(window).height() <= pageHeightForAnimation;

	console.log(mobilePage);

	function scrollTo(id) {
		$('html, body').animate({
			scrollTop: $("#" + id).offset().top
		}, scrollTime);
	}

	function stopScrolling() {
		setTimeout(function () {
			isScrolling = false;
		}, scrollTime);
	}

	scrollTo(sections[sectionIndex]);

	$(window).bind('mousewheel DOMMouseScroll', function (event) {
		if (!isScrolling && $(window).height() > pageHeightForAnimation) {
			isScrolling = true;
			if ((event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) && sectionIndex > 0) {
				sectionIndex -= 1;
				scrollTo(sections[sectionIndex]);
				stopScrolling();
			} else if (!(event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) && sectionIndex < sections.length - 1) {
				sectionIndex += 1;
				scrollTo(sections[sectionIndex]);
				stopScrolling();
			} else {
				isScrolling = false;
			}
		}
	});

	$(window).resize(function () {
		if (mobilePage && $(window).height() > pageHeightForAnimation) {
			mobilePage = false;
			isScrolling = true;
			scrollTo(sections[sectionIndex]);
			stopScrolling();
		} else if ($(window).height() <= pageHeightForAnimation) {
			mobilePage = true;
		}
	});
});
