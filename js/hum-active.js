// Global variables(hensu)
var display_mode = "w"; // "w" or "n"
var resize_eventname = "resize"; // "resize" or "orientationchange"(画面縦横)
var device = "pc"; // "pc" or "smart phone"
var touch_device = false;
var user_agent = window.navigator.userAgent.toLowerCase();//小文字にしてブラウザを判定

//整列を拒否,スマホ判定
/* prettier-ignore */
if ((user_agent.match(/(iphone|iPhone)/) > 0 &&	user_agent.match(/(ipad|iPad)/) == -1) || user_agent.match(/(ipod|iPod)/) > 0 || user_agent.match(/(android|Android)/) > 0) {resize_eventname = 'orientationchange';device = 'sp';}
if (window.ontouchstart === null) {
	touch_device = true;
}

//FontAwesome5
window.FontAwesomeConfig = {
	searchPseudoElements: true,
};

var $y = jQuery.noConflict();
(function($y) {
/* ---------------------- function ---------------------- */
/* set_display_mode -------------------- */
function set_display_mode() {
	var break_point = 767;
	display_mode = $y(window).innerWidth() <= break_point ? "n" : "w";
}

/* ---------------------- DOM_ready ---------------------- */
$y(function(){
	"user strict";
	if (touch_device){
		$y("body").addclass("touch");
	}
	/* resize_event -------------------- */
	var resize_event = function () {
		set_display_mode();
	};
	resize_event();
	
	$y(window).on("load " + resize_eventname, resize_event);
	
	/* IE,Edgeでのカクつき対応 -------------------- */
	if (
		navigator.userAgent.match(/MSIE 10/i) ||
		navigator.userAgent.match(/Trident\/7\./) ||
		navigator.userAgent.match(/Edge\/12\./)
	){
		$y("body").on("mousewheel", function () {
			event.preventDefault();
			var wd = event.wheelDelta;
			var csp = window.pageYOffset;
			window.scrollTo(0, csp - wd);
		});
	}
	
	/* PC時はTELリンク削除 -------------------- */
	if (display_mode === "w") {
		$y("a").each(function () {
			var telHref = $y(this).attr("href");
			if (telHref && telHref.match(/tel:/)) {
				$y(this).removeAttr("href");
			}
		});
	}
	/* smartphone_menu -------------------- */
	// Hamburger
	$y(".hum-wrap").click(function () {
		//.stop()->動作中のアニメーションをストップ
		$y(this).stop().toggleClass("is-active"); //ハンバーガーストップして、is-activeを有効化
		$y(".overlay").stop().fadeToggle(); //オーバーレイをストップして、メニューを開閉
		$y(".header__nav").stop().toggleClass("is-active");//ナヴィゲーションをストップして、is-activeを有効化
		$y("body").stop().toggleClass("oh-open");//bodyをストップして、overflowを隠す
	});
	
	// ページ内リンクが存在する場合
	$y(".page-link[href*='#']").on("click", function () {
		$y("body").attr("class", "");//body内のclass名を取得
		$y(".hum-wrap").stop().removeClass("is-active");//ハンバーガーをストップして、is-activeを削除
		$y(".header__nav").stop().removeClass("is-active");//ナヴィゲーションをストップして、is-activeを削除
		$y(".overlay").stop().fadeOut();//オーバーレイストップして、メニューをフェードアウト
		$y("body").removeClass("oh-open");
	});
});

/* ---------------------- DOM_load ---------------------- */
$y(window).on("load", function () {
	/* load_animation -------------------- */
	$y(".js-load")
		.delay(400)
		.queue(function () {
			$y(this).addClass("js-load--on").dequeue();
		});
	/* anchor_link -------------------- */
	var header = $y("header"),
		headerHeight = header.height();
	//ヘッダー固定時のアンカーリンク
	$y('.page-link[href^="#"]').click(function () {
		var href = $y($y(this).attr("href")),
			position = href.offset().top - headerHeight;
		$y("body,html")
			.stop(true, false)
			.animate({ scrollTop: position }, 480, "swing");
		return false;
	});
	//別ページからのアンカーリンク
	var hash = location.hash,
		userAgent = window.navigator.userAgent.toLowerCase();//小文字にしてブラウザを判定
	if ($y(hash).length) {
		var position = $y(hash).offset().top;
		// IE対策
		if (
			navigator.userAgent.match(/MSIE 10/i) ||
			navigator.userAgent.match(/Trident\/7\./) ||
			navigator.userAgent.match(/Edge\/12\./)
		) {
			setTimeout(function () {
				$y("html, body").scrollTop(Number(position) - headerHeight);
			}, 200);
		} else {
			$y("html, body").scrollTop(Number(position) - headerHeight);
		}
	}
});
/* ---------------------- DOM_load or scroll ---------------------- */
$y(window).on("load scroll", function () {
	/* page_top -------------------- */
	if ($y(this).scrollTop() > 200) {
		$y(".pageTop").fadeIn();
	} else {
		$y(".pageTop").fadeOut();
	}
	scrollHeight = $y(document).height();
	scrollPosition = $y(window).height() + $y(window).scrollTop();
	trgPosition = $y("#footer").offset().top; //ターゲット要素
	footHeight = trgPosition - 0;
	if ($y(window).width() > 767) {
		if (scrollPosition >= trgPosition) {
			$y(".pageTop a").css({ position: "absolute", bottom: "0" });
		} else {
			$y(".pageTop a").css({ position: "fixed", bottom: "0" });
		}
	} else {
		if (scrollPosition >= trgPosition) {
			$y(".pageTop a").css({ position: "absolute", bottom: "0" });
		} else {
			$y(".pageTop a").css({ position: "fixed", bottom: "0" });
		}
	}
	/* scroll_animation -------------------- */
	var scroll = $y(window).scrollTop(),
		windowHeight = $y(window).height(),
		firingHeight;
	if ($y(window).width() > 767) {
		firingHeight = 100;
	} else {
		firingHeight = 60;
	}
	$y(".scr-anin").each(function () {
		var elemPos = $y(this).offset().top;
		if (scroll > elemPos - windowHeight + firingHeight) {
			$y(this).addClass("scr-anin--on");
		}
	});
});
})($y);