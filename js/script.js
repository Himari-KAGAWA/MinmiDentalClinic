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
    effect: 'fade', // フェードのエフェクト
    autoplay: {
      delay: 3000, // ４秒後に次の画像へ
      disableOnInteraction: false, // ユーザー操作後に自動再生を再開する
    },
    speed: 2000, // ２秒かけながら次の画像へ移動

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      clickable: true,
    },
  });
});
