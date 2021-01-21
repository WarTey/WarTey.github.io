$(document).ready(function () {
	var sections = ["presentation", "skills"];
	var sectionIndex = 0;
	var isScrolling = false;
	var scrollTime = 500;
	var pageHeightForAnimation = 665;
	var mobilePage = $(window).height() <= pageHeightForAnimation;

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

	function goToLastSection() {
		if (mobilePage && $(window).height() > pageHeightForAnimation) {
			mobilePage = false;
			isScrolling = true;
			scrollTo(sections[sectionIndex]);
			stopScrolling();
		} else if ($(window).height() <= pageHeightForAnimation) {
			mobilePage = true;
		}
	}

	function goToNextSection(event) {
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
	}

	/*function castResponsive() {
		var responsive = false;
		console.log($("#presentation").prop('scrollHeight'));
		console.log($("#presentation").height());
		sections.forEach(section => {
			if ($("#" + section).prop('scrollHeight') > $("#" + section).height()) {
				responsive = true;
			}
		});
		console.log(responsive);
		//$('link[href="css/responsive.css"]').prop('disabled', responsive);
		if (responsive) {
			$('head').append('<link href="css/responsive.css" rel="stylesheet">');
		} else {
			$('link[href="css/responsive.css"]').remove();
		}
	}*/

	scrollTo(sections[sectionIndex]);
	//castResponsive();

	$(window).bind('mousewheel DOMMouseScroll', function (event) {
		goToNextSection(event);
	});

	$(window).resize(function () {
		//castResponsive();
		goToLastSection();
	});
});
