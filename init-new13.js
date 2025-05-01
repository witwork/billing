$(function () {

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $('html').addClass('mobile');
  } else {
    $('html').addClass('desktop');
  }

  if ($('html').is(':lang(ru)')) {
    var billing_reg = 'https://bill.pq.hosting/billmgr?func=register&lang=ru';
    var billing_auth = 'https://bill.pq.hosting/billmgr?func=logon&lang=ru';


    //var billing_reg = 'https://pq.hosting/billing/reg.html';
    //var billing_auth = 'https://pq.hosting/billing/index.html';


    //var billing_reg = 'https://bill.pq.hosting/billmgr?func=register';
    //var billing_auth = 'https://bill.pq.hosting/';
  } else {
    var billing_reg = 'https://bill.pq.hosting/billmgr?func=register&lang=en';
    var billing_auth = 'https://bill.pq.hosting/billmgr?func=logon&lang=en';


    //var billing_reg = 'https://pq.hosting/billing/reg-en.html';
    //var billing_auth = 'https://pq.hosting/billing/en.html';
  }

  $(".billing-reg").click(function () {
    //window.location.href = billing_reg;
    window.open(billing_reg, '_blank');
  });

  $(".billing-auth").click(function () {
    //window.location.href = billing_auth;
    window.open(billing_auth, '_blank');
  });

  // related

  if ($('.related').length) {
    var relatedLocation = location.pathname.split('/').pop();
    var langPage = $('html').attr('lang');
    if (langPage == 'ru') {
      link_adress = '/' + relatedLocation;
    } else {
      link_adress = '/' + langPage + '/' + relatedLocation;
    }
    $('.related__link[href="' + link_adress + '"]').closest('.related__item').addClass('related__item--active');
  }

  // Headhesive

  let options = {
    offset: '.container',
    offsetSide: 'top',
    classes: {
      clone: 'header-links--clone',
      stick: 'header-links--stick',
      unstick: 'header-links--unstick'
    }
  };

  new Headhesive('.header-links', options);

  $(".scroll[href^='#']").click(function () {
    var _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top - 60 + "px" });
    return false;
  });


  // menu-btn (mob)

  $('.menu-btn').on('click', function () {
    $(this).toggleClass('menu-btn--open');
    $('.mob-menu').toggleClass('mob-menu--open');
    $('body').toggleClass('hidden');
    $('.menu-overlay').fadeToggle();
  });

  $('.page').append('<div class="menu-overlay"></div>');
  $('.header-top').append('<div class="mob-menu"></div>');
  $(".header").find('.menu').clone().appendTo(".mob-menu");
  $(".header").find('.phone').clone().appendTo(".mob-menu");

  $('.mobile .menu__link--sub').on("click", function () {
    $(this).toggleClass('menu__link--open');
    $(this).closest('.menu__item').find('.menu-dropdown').slideToggle(200);
    return false;
  });

  $('.menu-overlay').on('click', function () {
    $('.menu-btn').removeClass('menu-btn--open');
    $('.mob-menu').removeClass('mob-menu--open');
    $('.mobile-filter').removeClass('mobile-filter--open');
    $('.base-page__aside').removeClass('base-page__aside--open');
    $('body').removeClass('hidden');
    $(this).hide();
  });

  $('.open-filter-btn').click(function () {
    $('.mobile-filter').toggleClass('mobile-filter--open');
    $('body').toggleClass('hidden');
    $('.menu-overlay').fadeToggle();
  });

  $('.btn-help-menu').click(function () {
    $('.base-page__aside').toggleClass('base-page__aside--open');
    $('body').toggleClass('hidden');
    $('.menu-overlay').fadeToggle();
  });


  // language

  let language = $(".language");

  /*
  $('.language__select').on("click", function () {
    $(this).parents('.language').toggleClass('language--open');
    $(this).parents('.language').find('.language__dropdown').slideToggle('fast');
  });
  */


  let phone = $(".phone");

  $('.phone__select').on("click", function () {
    $(this).toggleClass('phone__select--open');
    $(this).parents('.phone').find('.phone__dropdown').slideToggle(200);
  });

  // Количество товара

  let $count__field = $('.count__field');
  let count__val = parseInt($count__field.val());

  if (count__val <= 1) {
    $('.count__minus').addClass('count__minus--disabled');
  }

  $('.count__minus').click(function () {
    let $input = $(this).parent().find('.count__field');
    let count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    if (count <= 1) {
      $(this).addClass('count__minus--disabled');
    } else {
      $(this).removeClass('count__minus--disabled');
    }
    if ($input.attr('max')) {
      let max = parseInt($input.attr('max'));
      if (count < max) {
        $(this).closest('.count').find('.count__plus').removeClass('count__plus--disabled');
      }
    }
    $input.val(count);
    $input.change();
    return false;
  });

  $('.count__plus').click(function () {
    let $input = $(this).parent().find('.count__field');
    let count = parseInt($input.val()) + 1;
    if (count >= 1) {
      $(this).closest('.count').find('.count__minus').removeClass('count__minus--disabled');
    }
    if ($input.attr('max')) {
      let max = parseInt($input.attr('max'));
      if (count >= max) {
        count = max;
        $(this).addClass('count__plus--disabled');
      }
    }
    $input.val(count);
    $input.change();
    return false;
  });

  /*$('.count--quantity .count__plus').click(function () {
   $(this).parents('.tariff__item').find('.tariff__footer').addClass('tariff__footer--show');
  });*/

  // ввод только цифр

  $count__field.on('keydown', function (e) {
    if (e.key.length == 1 && e.key.match(/[^0-9'".]/)) {
      return false;
    }
  });


  // select-custom

  let sc = '.select-custom';
  let scItem = '.select-custom__item';
  let scItemActive = 'select-custom__item--active';
  let scDrop = '.select-custom__dropdown';
  let scIcon = '.select-custom__icon';
  let scCurrent = '.select-custom__current';
  let scCurrentOpen = 'select-custom__current--open';

  $(scCurrent).on("click", function () {
    let th = $(this);

    $(scCurrent).not(this).removeClass(scCurrentOpen);
    $(scCurrent).not(this).closest(sc).find(scDrop).slideUp(200);

    th.toggleClass(scCurrentOpen);
    th.closest(sc).find(scDrop).slideToggle(200);
  });


  $(scItem).on("click", function () {
    let th = $(this);
    let f = th.closest(sc);
    let selectImage = th.find(scIcon).attr('src');
    let selectText = th.find('span').text();

    f.find(scCurrent).find(scIcon).attr('src', selectImage);
    f.find(scCurrent).find('span').text(selectText);
    f.find(scDrop).slideUp(200);
    f.find(scCurrent).removeClass(scCurrentOpen);
    f.find(scItem).removeClass(scItemActive);
    th.addClass(scItemActive);
  });

  init_opt_tariffs();

  function init_opt_tariffs() {
    let items = $('.tariff__item--opt');
    if (!items.length) return;
    $('.select-custom__country').children().on('click', function () {
      let country = $(this).attr('data-country');
      items.addClass('hidden');
      items.filter('.t-' + country).removeClass('hidden');
    });
  }

  $('.select-custom__item--active').each(function () {
    let f = $(this).closest(sc);
    let selectImage = $(this).find(scIcon).attr('src');
    let selectText = $(this).find('span').text();

    f.find(scCurrent).find(scIcon).attr('src', selectImage);
    f.find(scCurrent).find('span').text(selectText);
  });

  // end select custom

  // tabs

  $('.js-tab-trigger').on("click", function () {

    let th = $(this);
    let f = th.closest('[data-tab-name]');
    let tabName = f.attr('data-tab-name'); // name tabs
    let tabNameActive = $(this).attr('data-tab'); // name active tab
    let tabContent = $('.tab-content[data-tab-name="' + tabName + '"]'); // tab content
    let tabHash = f.attr('data-tab-hash'); // hash

    // trigger

    f.find('.js-tab-trigger').removeClass('js-tab-trigger--active');
    th.addClass('js-tab-trigger--active');

    // content

    tabContent.find('.js-tab-content').removeClass('js-tab-content--active');
    tabContent.find('.js-tab-content[data-tab="' + tabNameActive + '"]').addClass('js-tab-content--active');

    // hash url

    if (tabHash == 1) {
      window.location.hash = tabNameActive;
    }

    return false;
  });

  $(".js-tab-trigger--active").each(function () {
    $(this).click();
  });

  // faq toggle

  $('.faq__title').on("click", function () {
    $(this).parent().toggleClass('faq__item--open');
    $(this).next().slideToggle();
    return false;
  });

  $('.main-filter-countries__link').on("click", function () {
    $(this).closest('.main-filter-countries__list').find('.main-filter-countries__link').removeClass('main-filter-countries__link--active');
    $(this).addClass('main-filter-countries__link--active');
  });

  //let slideArhive = $('.box-vps .swiper-slide').detach();
  //slideArhive.appendTo('.tariff-slider .swiper-wrapper');

  /*   slider   */

  let tsSettings = {
    navigation: {
      nextEl: '.tariff-slider__button-next',
      prevEl: '.tariff-slider__button-prev',
    },
    pagination: {
      el: '.tariff-slider__pagination',
      clickable: true,
      type: 'fraction',
    },
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    simulateTouch: false,
    //watchSlidesVisibility: true,
    watchSlidesProgress: true,
    watchOverflow: true,
    breakpoints: {
      300: {
        speed: 100,
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
        loop: true,
        /*autoHeight: false,*/
      },
      660: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 20,
        loop: true,
      },
      993: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 20,
        loop: true,
      },
      1101: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 20,
        loop: true,
      },
      1200: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 30,
        loop: false,
      },
    }
  }

  tariffSlider = new Swiper('.tariff-slider__container', tsSettings);

  let paySlider = new Swiper('.payments-slider', {
    navigation: {
      nextEl: '.swiper-button-next',
    },
    slidesPerView: 'auto',
    loop: true,
    loopedSlides: 2,
    spaceBetween: 10,
    grabCursor: true,
  });


  let headerSlider = new Swiper('.header-slider', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 30,
    loop: false,
    autoHeight: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  let newsSlider = new Swiper('.slider-news', {
    pagination: {
      el: '.pagination-bullet--news',
      clickable: true,
    },
    breakpoints: {
      300: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
        autoHeight: true,
        loop: true,
      },
      650: {
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 20,
        autoHeight: false,
        loop: true,
      },
      993: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 20,
        allowTouchMove: false,
        autoHeight: false,
        loop: false,
      },
      1200: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 30,
        allowTouchMove: false,
        autoHeight: false,
        loop: false,
      },
    }
  });


  // year

  let nowDate = new Date();
  $('.year').text(nowDate.getFullYear());


  $(document).on("click", function (e) {

    if (!language.is(e.target) && language.has(e.target).length === 0) {
      language.removeClass('language--open');
      $('.language__dropdown').slideUp('fast');
    }

    if (!phone.is(e.target) && phone.has(e.target).length === 0) {
      $('.phone__select').removeClass('phone__select--open');
      $('.phone__dropdown').slideUp(200);
    }

    if (!$(sc).is(e.target) && $(sc).has(e.target).length === 0) {
      $(scCurrent).removeClass(scCurrentOpen);
      $(scCurrent).closest(sc).find(scDrop).slideUp(200);
    }

  });


  $('.cs-drop__trigger').on("click", function () {
    let th = $(this);
    let f = th.closest('.cs-drop');
    f.toggleClass('opened');

    $('.cs-drop__option').on("click", function () {
      let drop = $(this).closest('.cs-drop');
      let textOption = $(this).text();
      drop.find('.cs-drop__option').removeClass('selection');
      $(this).addClass('selection');
      drop.removeClass('opened');
      drop.find('.cs-drop__trigger').text(textOption);
    });

    $('html').one('click', function () {
      $('.cs-drop').removeClass('opened');
    });

    return false;
  });

  if ($('.control-active').length) {
    $(".control-active").each(function () {
      $(this).click();
    });
  }

  $(".custom-select").each(function () {
    let classes = $(this).attr("class"),
      id = $(this).attr("id"),
      name = $(this).attr("name");
    let template = '<div class="' + classes + '" data-filter-group="">';
    template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
    template += '<div class="custom-options">';
    $(this).find("option").each(function () {
      template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
    });
    template += '</div></div>';

    $(this).wrap('<div class="custom-select-wrapper"></div>');
    $(this).hide();
    $(this).after(template);
  });
  $(".custom-option:first-of-type").hover(function () {
    $(this).parents(".custom-options").addClass("option-hover");
  }, function () {
    $(this).parents(".custom-options").removeClass("option-hover");
  });
  $(".custom-select-trigger").on("click", function () {
    $('html').one('click', function () {
      $(".custom-select").removeClass("opened");
    });
    $(this).parents(".custom-select").toggleClass("opened");
    event.stopPropagation();
  });
  $(".custom-option").on("click", function () {
    $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
    $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
    $(this).addClass("selection");
    $(this).parents(".custom-select").removeClass("opened");
    $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
  });

  // vps-main filter
  if ($('[data-ref="vps-main"]').length) {
    var vpsMain = document.querySelector('[data-ref="vps-main"]');
    var mixer = mixitup(vpsMain, {
      animation: {
        duration: 200
      }
    });
  }

  // tariffs filter
  /*  
  if ($('[data-ref="tariffs"]').length) {
    var tariffs = document.querySelector('[data-ref="tariffs"]');
    var mixer = mixitup(tariffs, {
      animation: {
        duration: 200
      },
      load: {
        filter: '.t-NL'
      }
    });
  }*/

  // servers filter
  if ($('[data-ref="servers"]').length) {
    var servers = document.querySelector('[data-ref="servers"]');
    var mixer = mixitup(servers, {
      multifilter: {
        enable: true
      },
      animation: {
        duration: 200
      }
    });
  }


  // servers ranges
  // if ($('.js-range-slider').length) {
  //   let $rangeA = $('[data-ref="range-slider-a"]');
  //   let $rangeB = $('[data-ref="range-slider-b"]');
  //   let $rangeC = $('[data-ref="range-slider-c"]');

  //   $rangeA.ionRangeSlider({
  //     skin: "round",
  //     type: "double",
  //     onChange: handleRangeInputChange
  //   });

  //   $rangeB.ionRangeSlider({
  //     skin: "round",
  //     type: "double",
  //     onChange: handleRangeInputChange
  //   });

  //   $rangeC.ionRangeSlider({
  //     skin: "round",
  //     type: "double",
  //     onChange: handleRangeInputChange
  //   });

  //   let instanceA = $rangeA.data("ionRangeSlider");
  //   let instanceB = $rangeB.data("ionRangeSlider");
  //   let instanceC = $rangeC.data("ionRangeSlider");

  //   function getRange() {
  //     let aMin = Number(instanceA.result.from);
  //     let aMax = Number(instanceA.result.to);
  //     let bMin = Number(instanceB.result.from);
  //     let bMax = Number(instanceB.result.to);
  //     let cMin = Number(instanceC.result.from);
  //     let cMax = Number(instanceC.result.to);
  //     return {
  //       aMin: aMin,
  //       aMax: aMax,
  //       bMin: bMin,
  //       bMax: bMax,
  //       cMin: cMin,
  //       cMax: cMax,
  //     };
  //   }

  //   function handleRangeInputChange() {
  //     mixer.filter(mixer.getState().activeFilter);
  //   }

  //   function filterTestResult(testResult, target) {
  //     let a = Number(target.dom.el.getAttribute('data-a'));
  //     let b = Number(target.dom.el.getAttribute('data-b'));
  //     let c = Number(target.dom.el.getAttribute('data-c'));
  //     let range = getRange();

  //     if (a < range.aMin || a > range.aMax || b < range.bMin || b > range.bMax || c < range.cMin || c > range.cMax) {
  //       testResult = false;
  //     }
  //     return testResult;
  //   }

  //   mixitup.Mixer.registerFilter('testResultEvaluateHideShow', 'range', filterTestResult);
  // }


  // seo text

  $('.user-text__show-more').on("click", function () {
    let t = $(this).parent('.user-text');
    t.toggleClass('user-text--open');
    t.find('.user-text__full').slideToggle(100);
    $(this).toggleClass('user-text__show-more--active');
    return false;
  });


  // filter vps

  $('.filter-vps__item').on("click", function () {
    $(this).closest('.filter-vps__list').find('.filter-vps__item').removeClass('filter-vps__item--active');
    $(this).addClass('filter-vps__item--active');
  });


  // courses
  let courses = $('html');
  let course_USD = (courses.data('eur') / courses.data('usd'));
  let course_RUB = (courses.data('eur'));
  let course_UAH = (courses.data('eur') / courses.data('uah') * 10);
  let course_KZT = (courses.data('eur') / courses.data('kzt') * 100);
  let course_MDL = (courses.data('eur') / courses.data('mdl') * 10);
  let course_RON = (courses.data('eur') / courses.data('ron'));

  function converter_curr(param) {
    setTimeout(function () {
      $('.trf-rate-value var').each(function (index) {
        let current_price = $(this).text();
        let price_USD = current_price * course_USD;
        let price_RUB = current_price * course_RUB;
        let price_UAH = current_price * course_UAH;
        let price_KZT = current_price * course_KZT;
        let price_MDL = current_price * course_MDL;
        let price_RON = current_price * course_RON;
        $(this).closest('.trf-rate-value').attr('title', '~ ' + price_USD.toFixed(2) + ' USD\n' + '~ ' + price_RUB.toFixed(2) + ' RUB\n' + '~ ' + price_UAH.toFixed(2) + ' UAH\n' + '~ ' + price_KZT.toFixed(2) + ' KZT\n' + '~ ' + price_MDL.toFixed(2) + ' MDL\n' + '~ ' + price_RON.toFixed(2) + ' RON\n');

      });

      $('.trf-cost-value span').each(function (index) {
        let current_price = $(this).text();
        let price_USD = current_price * course_USD;
        let price_RUB = current_price * course_RUB;
        let price_UAH = current_price * course_UAH;
        let price_KZT = current_price * course_KZT;
        let price_MDL = current_price * course_MDL;
        let price_RON = current_price * course_RON;
        $(this).closest('.trf-cost-value').attr('title', '~ ' + price_USD.toFixed(2) + ' USD\n' + '~ ' + price_RUB.toFixed(2) + ' RUB\n' + '~ ' + price_UAH.toFixed(2) + ' UAH\n' + '~ ' + price_KZT.toFixed(2) + ' KZT\n' + '~ ' + price_MDL.toFixed(2) + ' MDL\n' + '~ ' + price_RON.toFixed(2) + ' RON\n');

      });

      $('.trf-saving var').each(function (index) {
        let current_price = $(this).text();
        let price_USD = current_price * course_USD;
        let price_RUB = current_price * course_RUB;
        let price_UAH = current_price * course_UAH;
        let price_KZT = current_price * course_KZT;
        let price_MDL = current_price * course_MDL;
        let price_RON = current_price * course_RON;
        $(this).parent().attr('title', '~ ' + price_USD.toFixed(2) + ' USD\n' + '~ ' + price_RUB.toFixed(2) + ' RUB\n' + '~ ' + price_UAH.toFixed(2) + ' UAH\n' + '~ ' + price_KZT.toFixed(2) + ' KZT\n' + '~ ' + price_MDL.toFixed(2) + ' MDL\n' + '~ ' + price_RON.toFixed(2) + ' RON\n');

      });
    }, 1200);
  }

  converter_curr();


  // tariffs months
  // on load

  function tariffs_months_onload() {

    $('.trf-months input').each(function () {
      if ($(this).is(':checked')) {
        //$(this).closest('.trf-item').find('.btn').attr("onclick", "location.href = '" + $(this).val() + "';");
        $(this).closest('.trf-item').find('.btn').attr("data-link", $(this).val());
        if ($(this).closest('.trf-item').hasClass('discount')) {
          $(this).closest('.trf-item').find('.trf-rate-value var').html(
            $trf_price_new = (
              (1)
              * parseFloat($trf_price_default = $(this).closest('.trf-item').find('.trf-rate-value').attr('data-rate'))
            ).toFixed(2)
          );
        } else {
          $(this).closest('.trf-item').find('.trf-rate-value var').html(
            $trf_price_new = (
              (1 -
                (
                  parseFloat($(this).closest('label').find('.month-discount').text())
                  / 100
                ))
              * parseFloat($trf_price_default = $(this).closest('.trf-item').find('.trf-rate-value').attr('data-rate'))
            ).toFixed(2)
          );
        }

        // cost per year
        $(this).closest('.trf-item').find('.trf-cost-value span').html(
          ($trf_price_new * ($(this).closest('.trf-item').find('.trf-months input:checked').closest('label').find('.month-qty').html())).toFixed(2)
        );
        // saving per year
        $(this).closest('.trf-item').find('.trf-saving var').html(
          ($trf_price_default * ($(this).closest('.trf-item').find('.trf-months input:checked').closest('label').find('.month-qty').html()) - $trf_price_new * ($(this).closest('.trf-item').find('.trf-months input:checked').closest('label').find('.month-qty').html())).toFixed(2)
        );

        $(this).closest('.trf-item').find('.trf-cost-value i').html(
          '/ ' + $(this).closest('label').find('.month-qty').html() + ' ' + $(this).closest('label').find('.month-qty').attr('data-lbl')
        );
      }
    });

  }

  tariffs_months_onload();

  $(document).on('click', '.trf-months input', function () {
    if ($(this).is(':checked')) {
      //$(this).closest('.trf-item').find('.btn').attr("onclick", "location.href = '" + $(this).val() + "';");
      $(this).closest('.trf-item').find('.btn').attr("data-link", $(this).val());

      if ($(this).closest('.trf-item').hasClass('discount')) {
        $(this).closest('.trf-item').find('.trf-rate-value var').html(
          $trf_price_new = (
            (1)
            * parseFloat($trf_price_default = $(this).closest('.trf-item').find('.trf-rate-value').attr('data-rate'))
          ).toFixed(2)
        );
      } else {
        $(this).closest('.trf-item').find('.trf-rate-value var').html(
          $trf_price_new = (
            (1 -
              (
                parseFloat($(this).closest('label').find('.month-discount').text())
                / 100
              ))
            * parseFloat($trf_price_default = $(this).closest('.trf-item').find('.trf-rate-value').attr('data-rate'))
          ).toFixed(2)
        );
      }
      // cost per year
      $(this).closest('.trf-item').find('.trf-cost-value span').html(
        ($trf_price_new * ($(this).closest('.trf-item').find('.trf-months input:checked').closest('label').find('.month-qty').html())).toFixed(2)
      );
      // saving per year
      $(this).closest('.trf-item').find('.trf-saving var').html(
        ($trf_price_default * ($(this).closest('.trf-item').find('.trf-months input:checked').closest('label').find('.month-qty').html()) - $trf_price_new * ($(this).closest('.trf-item').find('.trf-months input:checked').closest('label').find('.month-qty').html())).toFixed(2)
      );
    }

    $(this).closest('.trf-item').find('.trf-cost-value i').html(
      '/ ' + $(this).closest('label').find('.month-qty').html() + ' ' + $(this).closest('label').find('.month-qty').attr('data-lbl')
    );

    if ($(this).hasClass("months-one")) {
      $(this).closest('.trf-item').find('.trf-sale').removeClass('trf-sale--show');
    } else {
      $(this).closest('.trf-item').find('.trf-sale').addClass('trf-sale--show');
    }

    converter_curr();
  });


  $(".filter-vps__item, .th-countries li").on("click", function () {
    let valueItem = $(this).attr('data-filter').slice(3).toLowerCase();
    window.location.hash = valueItem.toLowerCase();
  });


  $(".main-filter-tabs__link").on("click", function () {
    let value = $(this).attr('data-tab');
    let mfcountries = $('.main-filter-countries');

    mfcountries.find('.main-filter-countries__list').removeClass('main-filter-countries__list--show');
    mfcountries.find("[data-mf-filter='" + value + "']").addClass('main-filter-countries__list--show');
  });

  // form

  $(".contacts-feedback").bind('submit', function () {
    $('.contacts-feedback').trigger('reset');
    $('#form_success').fadeIn();
    return false;
  });

  // open mail
  $('.contacts-feedback input').focusin(function () {
    $(this).closest('form').find('input[name=checks]').val('dYeG2BtMfW');
  });
  $('.contacts-feedback button[type=submit]').click(function () {
    $(this).closest('form').find('input[name=checks]').val('dYeG2BtMfW');
  });

  $(".popup-feedback__close").on("click", function () {
    $(this).closest('.popup-feedback').fadeOut();
  });

  $('.tariff-info__desc:lang(en)').contents().filter(function () { return this.nodeType === 3; }).replaceWith(function () { return this.nodeValue.replace('шт.', 'pc.'); });
  $('.tariff-info__desc:lang(ro)').contents().filter(function () { return this.nodeType === 3; }).replaceWith(function () { return this.nodeValue.replace('шт.', 'buc.'); });

  // chat toggle
  $('.h-chat').on("click touchend", function () {
    $('#supportTrigger').trigger('click');
    return false;
  });

  $('.link-opt').on('click', function (e) {
    e.preventDefault();
    let link = $(this).attr('data-link');
    if (link) {
      link = link.split('?');
      sessionStorage.setItem('order_link', link[1]);
      window.location.href = '/billing/';
    }
  });

  $(".vpn-tariff__select").change(function () {
    let th = $(this);
    let f = th.closest('.vpn-tariff__item');
    let price_vpn = th.find('option:selected').attr('data-vpn-price');
    let link_vpn = th.find('option:selected').attr('value');
    f.find('.vpn-tariff__price span').text(price_vpn);
    f.find('.vpn-tariff__btn').attr("onclick", "location.href = '" + link_vpn + "';");
  });

  $('.vpn-tariff__select').each(function () {
    if ($(this).find('option:selected')) {
      let link_vpn = $(this).find('option:selected').attr('value');
      $(this).closest('.vpn-tariff__item').find('.vpn-tariff__btn').attr("onclick", "location.href = '" + link_vpn + "';");
    }
  });

  $(document).on('click', '.tariff-link', function (e) {
    e.preventDefault();
    let link = $(this).attr('data-link');
    //window.location.href = link;
    window.open(link, '_blank');
  });

  $(".t-ajax-btn").click(function () {

    let lang_page = $('html').attr('lang');
    let lang_name_en = $('html').data('lang-en');
    let dbcsv = $(this).attr('data-db');
    let output = $(this).attr('data-output');
    let country = $(this).attr('data-country');

    $.ajax({
      url: '/ajax_tariff.php',
      method: 'post',
      dataType: 'html',
      data: {
        lang_code: lang_page,
        lang_name_en: lang_name_en,
        dbcsv: dbcsv,
        output: output,
        country: country
      },
      success: function (data) {
        $('[data-ajax-tariff]').html(data);
        tariffs_months_onload();
        converter_curr();
        if (output == 'vps_slider') {

        }
      }
    });
  });

  $(".main-filter-countries__link--vps").on("click", function () {
    let slider = $('.tariff-slider');
    let filter = $(this).attr('data-value');
    //tariffSlider.update();
    tariffSlider.destroy();
    tariffSlider = new Swiper('.tariff-slider__container', tsSettings);

    //slider.find('.swiper-slide').removeAttr('role aria-label').detach().appendTo('.box-vps'); // Возвращаем слайды обратно в box
    //$('.box-vps').find("[data-country='"+filter+"']").detach().appendTo('.tariff-slider .swiper-wrapper'); // отправляем нужные обратно в слайдер
    //$('.box-vps').find(".swiper-slide").appendTo('.tariff-slider .swiper-wrapper');
    //tariffSlider = new Swiper('.tariff-slider__container', tsSettings);

    window.location.hash = filter.toLowerCase();
  });


  // active filter Hash
  if ($("[data-filter-hash]").length) {
    let hashUrl = window.location.hash.substr(1);
    if (hashUrl !== "") {
      // vps page
      let vf = $('.main-filter-countries--page_vps').find("[data-filter='.t-" + hashUrl.toUpperCase() + "']");
      if (vf.length) {
        vf.click();
        $("html, body").animate({ scrollTop: $('[data-filter-hash]').offset().top - 100 + "px" });
      }
      // main page
      let mf = $('[data-mf-filter="vps"]').find("[data-value='" + hashUrl.toUpperCase() + "']");
      if (mf.length) {
        mf.click();
        $("html, body").animate({ scrollTop: $('[data-filter-hash]').offset().top - 100 + "px" });
      }
      // sever page
      let sf = $('.filter-server').find("[data-filter='.t-" + hashUrl.toUpperCase() + "']");
      if (sf.length) {
        sf.click();
        $("html, body").animate({ scrollTop: $('[data-filter-hash]').offset().top - 100 + "px" });
      }
    }
  }

  $(document).on('click', '.redirect-link', function (e) {
    thisdata = $(this).attr('data-href');
    //window.location.href = thisdata;
    window.open(thisdata, '_blank');
  });


});
// Init swiper for block Addition service
const swiper = new Swiper('.additional-service__swiper', {
  // loop: true,
  // Optional parameters
  slidesPerView: 'auto',
  spaceBetween: 5,
  loopedSlides: 2,
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1080: {
      slidesPerView: 3,
      spaceBetween: 60,
    }
  },
  breakpointsBase: 'container',

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    type: "fraction",
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});