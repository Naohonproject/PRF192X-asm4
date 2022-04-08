/** @format */

$(document).ready(function () {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 158) {
			$("#main-nav").addClass("nav-sticky");
		} else {
			$("#main-nav").removeClass("nav-sticky");
		}
	});

	$(window).on("resize", function () {
		let width = $(this).width();
		const navbar = $("#navbar");
		if (width > 768) {
			if (navbar.css("display") === "none") {
				navbar.css("display", "flex");
			}
		} else {
			navbar.css("display", "none");
		}
	});

	$("#menuBtn").click(function () {
		$("#navbar").slideToggle("fast", function () {
			var _this = $(this);
			if (_this.hasClass("fa-bars")) {
				_this.removeClass("fa-bars").addClass("fa-xmark");
			} else {
				_this.addClass("fa-bars").removeClass("fa-xmark");
			}
		});
	});
	const searchBtn = $("#search-btn");
	const modal = $("#modal");
	const popup = $("#pop-up");
	const closeBtn = $("#close-btn");
	const searchInput = $("#search__input");
	const modalSearch = $("#modal-search");
	const topNews = $("#top-news");
	const footer = $("footer");

	searchBtn.click(function (e) {
		modal.css({ "display": "block" });
		popup.css({ "transform": "translateY(500px)" });
	});
	modal.click(function (e) {
		$(this).css("display", "none");
	});
	popup.click(function (e) {
		e.preventDefault();
		e.stopPropagation();
	});
	closeBtn.click(function (e) {
		modal.css("display", "none");
	});

	modalSearch.click(function (e) {
		let lang = "";
		if (searchInput.val() !== "") {
			if ($("#language").val() !== "language") {
				lang = $("#language").val();
			}
			let userInput = searchInput.val();
			$(".loader").css("display", "block");
			const searchUrl = `https://gnews.io/api/v4/search?q=${userInput}&lang=${lang}&token=b9d7457cd77f7158bc331a8fee403d7a`;
			fetch(searchUrl)
				.then(function (response) {
					return response.json();
				})
				.then(function (data) {
					topNews.empty();
					parseHTML(data);
					$(".loader").css("display", "none");
				});

			modal.css("display", "none");
		} else {
			alert("You need to input to search");
		}
	});

	function parseHTML(json) {
		const jsonObj = json["articles"];
		let results = $(jsonObj).map(function (index, item) {
			return `<div class="row"><img src="${item.image}"/>
			<div>
			<a target= "_blank" href="${item.url}">${item.title}</a>
			<h3>${item.publishedAt}</h3>
			<p>${item.content}</p>		
			</div>
			</div>`;
		});

		let html = "";
		results.each(function (index, item) {
			html += item.toString();
		});
		topNews.html(html);
	}

	const url =
		"https://gnews.io/api/v4/top-headlines?token=b9d7457cd77f7158bc331a8fee403d7a";
	$.getJSON(url, function (data) {
		parseHTML(data);
	});
});
