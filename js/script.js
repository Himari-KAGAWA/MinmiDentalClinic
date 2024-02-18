jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる
  //ナビバートグル
  $(".js-hamburger").on("click", function () {
    if ($(this).hasClass("is-open")) {
      // メニューが開いたとき
      $(".js-drawer-menu").fadeOut();
      $(this).removeClass("is-open");
      $(".header__drawer").css("z-index", "9999"); // z-indexを付与
    } else {
      // メニューが閉じたとき
      $(".js-drawer-menu").fadeIn();
      $(this).addClass("is-open");
      $(".header__drawer").css("z-index", ""); // z-indexを削除
    }
  });

  //ドロワーメニュー
  $(".js-hamburger").click(function () {
    if ($(".js-hamburger").hasClass("is-active")) {
      $(".js-hamburger").removeClass("is-active");
      $(".js-sp-nav").fadeOut(300);
      $("body").removeClass("no-scroll"); // スクロールバー非表示
    } else {
      $(".js-hamburger").addClass("is-active");
      $(".js-sp-nav").fadeIn(300);
      $("body").addClass("no-scroll");
    }
  });

  // ドロワーメニュー内のリンクがクリックされたとき
  $(".js-sp-nav a").click(function () {
    $(".js-hamburger").removeClass("is-active");
    $(".js-hamburger").removeClass("is-open");
    $(".js-sp-nav").fadeOut(300);
    $("body").removeClass("no-scroll"); // ナビ内のリンクがクリックされたらno-scrollクラスを外す
  });

  // swiper:メインビュー
  const swiper = new Swiper(".js-mv-swiper", {
    loop: true,
    effect: "fade", // フェードのエフェクト
    autoplay: {
      delay: 3000, // ４秒後に次の画像へ
      disableOnInteraction: false, // ユーザー操作後に自動再生を再開する
    },
    speed: 2000, // ２秒かけながら次の画像へ移動

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
      clickable: true,
    },
  });

  $(function () {
    var toTopButton = $(".to-top");
    toTopButton.hide();

    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        toTopButton.fadeIn(); // 100px以上スクロールされたらフェードイン
      } else {
        toTopButton.fadeOut(); // 100px以下にスクロールされたらフェードアウト
      }
    });

    // to-topボタンをクリックしたときのアニメーション
    toTopButton.click(function () {
      $("html, body").animate({ scrollTop: 0 }, 600);
      return false;
    });
  });

  // underナビの色変更
  // アンダーナビのクラス名付与
  let underNav = $(".under-nav");
  // footerの高さ取得
  let footerHeight = $(".footer__corporate").outerHeight();

  $(window).scroll(function () {
    // スクロール量取得
    let scrollTop = $(this).scrollTop();
    // ナビの上端位置を取得
    let navTop = underNav.offset().top;
    // ページの底部位置を計算
    let pageBottom = $(document).height() - $(window).height();

    if (navTop + underNav.height() < pageBottom - footerHeight) {
      // フッターの上にある場合、ナビの背景色を変更
      underNav.removeClass("is-color");
    } else {
      // フッターの下にある場合、ナビの背景色を元に戻す
      underNav.addClass("is-color");
    }
  });

  // スムーススクロール
  jQuery('a[href^="#"]').click(function () {
    // .headerクラスがついた要素の高さを取得
    let header = jQuery(".header").innerHeight();
    // 追加のスクロール量を決定
    let additionalScroll = window.innerWidth >= 768 ? 90 : 40;
    // 移動速度を指定（ミリ秒）
    let speed = 300;
    // hrefで指定されたidを取得
    let id = jQuery(this).attr("href");
    // idの値が#のみだったらターゲットをhtmlタグにしてトップへ戻るようにする
    let target = jQuery("#" == id ? "html" : id);
    // ページのトップを基準にターゲットの位置を取得
    let position = jQuery(target).offset().top - header - additionalScroll;
    // その分だけ移動すればヘッダーと被りません
    jQuery("html, body").animate(
      {
        scrollTop: position,
      },
      speed
    );
    return false;
  });

  // 下層：staff 画像スライダー
  const slideLength = document.querySelectorAll(
    ".page-staff__slider .swiper-slide"
  ).length;

  const initSwiper = () => {
    const staffSwiper = new Swiper(".page-staff__slider .swiper", {
      slidesPerView: "auto",
      spaceBetween: 10,
      loop: true,
      loopedSlides: slideLength,
      speed: 8000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      freeMode: {
        enabled: true,
        momentum: false,
      },
      grabCursor: true,
      breakpoints: {
        768: {
          spaceBetween: 20,
        },
      },
      on: {
        touchEnd: (swiper) => {
          swiper.slideTo(swiper.activeIndex + 1);
        },
      },
    });
  };

  window.addEventListener("load", function () {
    initSwiper();
  });
});
