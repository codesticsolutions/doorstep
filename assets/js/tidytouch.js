(function ($) {
  "use strict";

  /* main slider title animation */
  $('.main-slider__title, .main-slider-two__title, .main-slider-three__title, .main-slider-four__title').each(function () {
    const originalHtml = $(this).html();
    let newHtml = '';
    let i = 0;
    let delay = 0.05;
    let insideTag = false;
    let tagBuffer = '';
    let tagStack = [];

    function wrapWord(word, isManualDiv = false) {
      let result = isManualDiv ? '' : '<span style="display:inline-block;">';
      for (let j = 0; j < word.length; j++) {
        const char = word[j];
        if (char.trim()) {
          result += `<span style="animation-delay:${(delay).toFixed(2)}s">${char}</span>`;
          delay += 0.05;
        } else {
          result += char;
        }
      }
      if (!isManualDiv) result += '</span>';
      return result;
    }

    let buffer = '';
    let insideManualDiv = false;

    while (i < originalHtml.length) {
      const char = originalHtml[i];

      if (char === '<') {
        if (buffer.trim()) {
          const words = buffer.split(/(\s+)/);
          for (const word of words) {
            if (word.trim()) {
              newHtml += wrapWord(word, insideManualDiv);
            } else {
              newHtml += word;
            }
          }
        } else {
          newHtml += buffer;
        }
        buffer = '';
        insideTag = true;
        tagBuffer = '<';
      } else if (insideTag) {
        tagBuffer += char;
        if (char === '>') {
          insideTag = false;

          const isClosing = /^<\//.test(tagBuffer);
          const tagNameMatch = tagBuffer.match(/^<\/?(\w+)/);
          const tagName = tagNameMatch ? tagNameMatch[1].toLowerCase() : '';

          if (tagName === 'div') {
            if (!isClosing) {
              tagStack.push('div');
              insideManualDiv = true;
            } else {
              tagStack.pop();
              insideManualDiv = tagStack.includes('div');
            }
          }

          newHtml += tagBuffer;
          tagBuffer = '';
        }
      } else {
        buffer += char;
      }

      i++;
    }

    if (buffer.trim()) {
      const words = buffer.split(/(\s+)/);
      for (const word of words) {
        if (word.trim()) {
          newHtml += wrapWord(word, insideManualDiv);
        } else {
          newHtml += word;
        }
      }
    } else {
      newHtml += buffer;
    }

    $(this).html(newHtml);
  });

  /* projects 01 */
  function updateCenterActive() {
    var $carousel = $('.projects-one__carousel');
    var $activeItems = $carousel.find('.owl-item.active');
    var itemsVisible = $activeItems.length;
    $carousel.find('.owl-item').removeClass('center-active');
    if (itemsVisible > 1 && itemsVisible % 2 === 1) {
      var middleIndex = Math.floor(itemsVisible / 2);
      $activeItems.eq(middleIndex).addClass('center-active');
    }
  }

  $('.projects-one__carousel').on('initialized.owl.carousel resized.owl.carousel translated.owl.carousel', function () {
    updateCenterActive();
  });

  /* features 01 hover */
  $(".features-one__card__button").hide();
  $(".features-one__card").on("mouseenter", function () {
    $(this).find(".features-one__card__button").stop(true, false).slideDown(500);
  });

  $(".features-one__card").on("mouseleave", function () {
    $(this).find(".features-one__card__button").stop(true, false).slideUp(500);
  });

  /* team card 01 */
  $('.team-card__btn').on('click', function (e) {
    e.stopPropagation();
    $('.team-card__btn').removeClass('active');
    $('.team-card__social').removeClass('active');
    var $this = $(this);
    var $social = $this.closest('.team-card').find('.team-card__social');

    $this.addClass('active');
    $social.addClass('active');
  });
  $(document).on('click', function () {
    $('.team-card__btn').removeClass('active');
    $('.team-card__social').removeClass('active');
  });

  /* team card 03 */
  $('.team-card-three__btn').on('click', function (e) {
    e.stopPropagation();
    const $parentCard = $(this).closest('.team-card-three');
    const $socialLinks = $parentCard.find('.social-links');
    $('.team-card-three__btn').removeClass('active');
    $('.team-card-three').removeClass('active');
    $('.social-links').css({
      'opacity': '',
      'transform': ''
    });
    $(this).addClass('active');
    $parentCard.addClass('active');
    $socialLinks.css({
      'opacity': '1',
      'transform': 'translateX(-50%) translateY(0%)'
    });
  });
  $(document).on('click', function () {
    $('.team-card-three__btn').removeClass('active');
    $('.team-card-three').removeClass('active');
    $('.social-links').css({
      'opacity': '',
      'transform': ''
    });
  });

  /* blog 03 hover */
  $(".blog-card-three__button").hide();
  $(".blog-card-three").on("mouseenter", function () {
    $(this).find(".blog-card-three__button").stop(true, false).slideDown(500);
  });

  $(".blog-card-three").on("mouseleave", function () {
    $(this).find(".blog-card-three__button").stop(true, false).slideUp(500);
  });

  /* blog 04 hover */
  $(".blog-card-four__button").hide();
  $(".blog-card-four").on("mouseenter", function () {
    $(this).find(".blog-card-four__button").stop(true, false).slideDown(500);
  });

  $(".blog-card-four").on("mouseleave", function () {
    $(this).find(".blog-card-four__button").stop(true, false).slideUp(500);
  });

  /*-- Checkout Accoradin --*/
  if ($(".checkout-page__payment__title").length) {
    $(".checkout-page__payment__item")
      .find(".checkout-page__payment__content")
      .hide();
    $(".checkout-page__payment__item--active")
      .find(".checkout-page__payment__content")
      .show();
    $(".checkout-page__payment__title").on("click", function (e) {
      e.preventDefault();
      $(this)
        .parents(".checkout-page__payment")
        .find(".checkout-page__payment__item")
        .removeClass("checkout-page__payment__item--active");
      $(this)
        .parents(".checkout-page__payment")
        .find(".checkout-page__payment__content")
        .slideUp();
      $(this).parent().addClass("checkout-page__payment__item--active");
      $(this).parent().find(".checkout-page__payment__content").slideDown();
    });
  }

  // dynamic year
  let dynamicyearElm = $(".dynamic-year");
  if (dynamicyearElm.length) {
    let currentYear = new Date().getFullYear();
    dynamicyearElm.html(currentYear);
  }

  // Date Picker
  if ($(".tidytouch-datepicker").length) {
    $(".tidytouch-datepicker").each(function () {
      $(this).datepicker();
    });
  }

  // Popular Causes Progress Bar
  if ($(".count-bar").length) {
    $(".count-bar").appear(
      function () {
        var el = $(this);
        var percent = el.data("percent");
        $(el).css("width", percent).addClass("counted");
      }, {
        accY: -50
      }
    );
  }

  //Fact Counter + Text Count
  if ($(".count-box").length) {
    $(".count-box").appear(
      function () {
        var $t = $(this),
          n = $t.find(".count-text").attr("data-stop"),
          r = parseInt($t.find(".count-text").attr("data-speed"), 10);

        if (!$t.hasClass("counted")) {
          $t.addClass("counted");
          $({
            countNum: $t.find(".count-text").text()
          }).animate({
            countNum: n
          }, {
            duration: r,
            easing: "linear",
            step: function () {
              $t.find(".count-text").text(Math.floor(this.countNum));
            },
            complete: function () {
              $t.find(".count-text").text(this.countNum);
            }
          });
        }
      }, {
        accY: 0
      }
    );
  }

  // custom coursor
  if ($(".custom-cursor").length) {
    var cursor = document.querySelector(".custom-cursor__cursor");
    var cursorinner = document.querySelector(".custom-cursor__cursor-two");
    var a = document.querySelectorAll("a");

    document.addEventListener("mousemove", function (e) {
      var x = e.clientX;
      var y = e.clientY;
      cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
    });

    document.addEventListener("mousemove", function (e) {
      var x = e.clientX;
      var y = e.clientY;
      cursorinner.style.left = x + "px";
      cursorinner.style.top = y + "px";
    });

    document.addEventListener("mousedown", function () {
      cursor.classList.add("click");
      cursorinner.classList.add("custom-cursor__innerhover");
    });

    document.addEventListener("mouseup", function () {
      cursor.classList.remove("click");
      cursorinner.classList.remove("custom-cursor__innerhover");
    });

    a.forEach((item) => {
      item.addEventListener("mouseover", () => {
        cursor.classList.add("custom-cursor__hover");
      });
      item.addEventListener("mouseleave", () => {
        cursor.classList.remove("custom-cursor__hover");
      });
    });
  }

  if ($(".contact-form-validated").length) {
    $(".contact-form-validated").validate({
      // initialize the plugin
      rules: {
        name: {
          required: true
        },
        email: {
          required: true,
          email: true
        },
        message: {
          required: true
        },
        subject: {
          required: true
        }
      },
      submitHandler: function (form) {
        // sending value with ajax request
        $.post(
          $(form).attr("action"),
          $(form).serialize(),
          function (response) {
            $(form).parent().find(".result").append(response);
            $(form).find('input[type="text"]').val("");
            $(form).find('input[type="email"]').val("");
            $(form).find("textarea").val("");
          }
        );
        return false;
      }
    });
  }

  // mailchimp form
  if ($(".mc-form").length) {
    $(".mc-form").each(function () {
      var Self = $(this);
      var mcURL = Self.data("url");
      var mcResp = Self.parent().find(".mc-form__response");

      Self.ajaxChimp({
        url: mcURL,
        callback: function (resp) {
          // appending response
          mcResp.append(function () {
            return '<p class="mc-message">' + resp.msg + "</p>";
          });
          // making things based on response
          if (resp.result === "success") {
            // Do stuff
            Self.removeClass("errored").addClass("successed");
            mcResp.removeClass("errored").addClass("successed");
            Self.find("input").val("");

            mcResp.find("p").fadeOut(10000);
          }
          if (resp.result === "error") {
            Self.removeClass("successed").addClass("errored");
            mcResp.removeClass("successed").addClass("errored");
            Self.find("input").val("");

            mcResp.find("p").fadeOut(10000);
          }
        }
      });
    });
  }

  if ($(".video-popup").length) {
    $(".video-popup").magnificPopup({
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: true,

      fixedContentPos: false
    });
  }

  if ($(".img-popup").length) {
    var groups = {};
    $(".img-popup").each(function () {
      var id = parseInt($(this).attr("data-group"), 10);

      if (!groups[id]) {
        groups[id] = [];
      }

      groups[id].push(this);
    });

    $.each(groups, function () {
      $(this).magnificPopup({
        type: "image",
        closeOnContentClick: true,
        closeBtnInside: false,
        gallery: {
          enabled: true
        }
      });
    });
  }

  function dynamicCurrentMenuClass(selector) {
    let FileName = window.location.href.split("/").reverse()[0];

    selector.find("li").each(function () {
      let anchor = $(this).find("a");
      if ($(anchor).attr("href") === FileName) {
        $(this).addClass("current");
      }
    });
    // if any li has .current elmnt add class
    selector.children("li").each(function () {
      if ($(this).find(".current").length) {
        $(this).addClass("current");
      }
    });
    // if no file name return
    if ("" === FileName) {
      selector.find("li").eq(0).addClass("current");
    }
  }

  if ($(".main-menu__list").length) {
    // dynamic current class
    let mainNavUL = $(".main-menu__list");
    dynamicCurrentMenuClass(mainNavUL);

    $(".main-menu__list").find("li > a:not(:only-child)").append(function () {
      return '<span class="main-menu__list__square"></span> <span class="main-menu__list__square"></span> <span class="main-menu__list__square"></span>';
    });
  }

  if ($(".service-details__nav").length) {
    // dynamic current class
    let mainNavUL = $(".service-details__nav");
    dynamicCurrentMenuClass(mainNavUL);
  }

  if ($(".main-menu").length && $(".mobile-nav__container").length) {
    let navContent = document.querySelector(".main-menu").innerHTML;
    let mobileNavContainer = document.querySelector(".mobile-nav__container");
    mobileNavContainer.innerHTML = navContent;
  }

  if ($(".sticky-header").length) {
    $(".sticky-header")
      .clone()
      .insertAfter(".sticky-header")
      .addClass("sticky-header--cloned");
  }

  if ($(".mobile-nav__container .main-menu__list").length) {
    let dropdownAnchor = $(
      ".mobile-nav__container .main-menu__list .dropdown > a"
    );
    dropdownAnchor.each(function () {
      let self = $(this);
      let toggleBtn = document.createElement("BUTTON");
      toggleBtn.setAttribute("aria-label", "dropdown toggler");
      toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
      self.append(function () {
        return toggleBtn;
      });
      self.find("button").on("click", function (e) {
        e.preventDefault();
        let self = $(this);
        self.toggleClass("expanded");
        self.parent().toggleClass("expanded");
        self.parent().parent().children("ul").slideToggle();
      });
    });
  }

  //Show Popup menu
  $(document).on("click", ".megamenu-clickable--toggler > a", function (e) {
    $("body").toggleClass("megamenu-popup-active");
    $(this).parent().find("ul").toggleClass("megamenu-clickable--active");
    e.preventDefault();
  });
  $(document).on("click", ".megamenu-clickable--close", function (e) {
    $("body").removeClass("megamenu-popup-active");
    $(".megamenu-clickable--active").removeClass("megamenu-clickable--active");
    e.preventDefault();
  });

  if ($(".mobile-nav__toggler").length) {
    $(".mobile-nav__toggler").on("click", function (e) {
      e.preventDefault();
      $(".mobile-nav__wrapper").toggleClass("expanded");
      $("body").toggleClass("locked");
    });
  }

  if ($(".search-toggler").length) {
    $(".search-toggler").on("click", function (e) {
      e.preventDefault();
      $(".search-popup").toggleClass("active");
      $(".mobile-nav__wrapper").removeClass("expanded");
      $("body").toggleClass("locked");
    });
  }

  // Sidebar
  if ($(".sidebar-btn__toggler").length) {
    $(".sidebar-btn__toggler").on("click", function (e) {
      e.preventDefault();
      $(".sidebar-one").toggleClass("active");
      $("body").toggleClass("locked");
    });
  }

  if ($(".mini-cart__toggler").length) {
    $(".mini-cart__toggler").on("click", function (e) {
      e.preventDefault();
      $(".mini-cart").toggleClass("expanded");
      $(".mobile-nav__wrapper").removeClass("expanded");
      $("body").toggleClass("locked");
    });
  }

  if ($(".wow").length) {
    var wow = new WOW({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      mobile: true, // trigger animations on mobile devices (default is true)
      live: true // act on asynchronously loaded content (default is true)
    });
    wow.init();
  }

  //accordion
  if ($(".tidytouch-accordion").length) {
    var accordionGrp = $(".tidytouch-accordion");
    accordionGrp.each(function () {
      var accordionName = $(this).data("grp-name");
      var Self = $(this);
      var accordion = Self.find(".accordion");
      Self.addClass(accordionName);
      Self.find(".accordion .accordion-content").hide();
      Self.find(".accordion.active").find(".accordion-content").show();
      accordion.each(function () {
        $(this)
          .find(".accordion-title")
          .on("click", function () {
            if ($(this).parent().hasClass("active") === false) {
              $(".tidytouch-accordion." + accordionName)
                .find(".accordion")
                .removeClass("active");
              $(".tidytouch-accordion." + accordionName)
                .find(".accordion")
                .find(".accordion-content")
                .slideUp();
              $(this).parent().addClass("active");
              $(this).parent().find(".accordion-content").slideDown();
            }
          });
      });
    });
  }

  $(".add").on("click", function () {
    if ($(this).prev().val() < 999) {
      $(this)
        .prev()
        .val(+$(this).prev().val() + 1);
    }
  });

  $(".sub").on("click", function () {
    if ($(this).next().val() > 0) {
      if ($(this).next().val() > 0)
        $(this)
        .next()
        .val(+$(this).next().val() - 1);
    }
  });

  if ($(".tabs-box").length) {
    $(".tabs-box .tab-buttons .tab-btn").on("click", function (e) {
      e.preventDefault();
      var target = $($(this).attr("data-tab"));

      if ($(target).is(":visible")) {
        return false;
      } else {
        target
          .parents(".tabs-box")
          .find(".tab-buttons")
          .find(".tab-btn")
          .removeClass("active-btn");
        $(this).addClass("active-btn");
        target
          .parents(".tabs-box")
          .find(".tabs-content")
          .find(".tab")
          .fadeOut(0);
        target
          .parents(".tabs-box")
          .find(".tabs-content")
          .find(".tab")
          .removeClass("active-tab");
        $(target).fadeIn(300);
        $(target).addClass("active-tab");
      }
    });
  }

  if ($(".range-slider-price").length) {
    var priceRange = document.getElementById("range-slider-price");

    noUiSlider.create(priceRange, {
      start: [30, 150],
      limit: 200,
      behaviour: "drag",
      connect: true,
      range: {
        min: 10,
        max: 200
      }
    });

    var limitFieldMin = document.getElementById("min-value-rangeslider");
    var limitFieldMax = document.getElementById("max-value-rangeslider");

    priceRange.noUiSlider.on("update", function (values, handle) {
      (handle ? $(limitFieldMax) : $(limitFieldMin)).text(values[handle]);
    });
  }

  function thmOwlInit() {
    // owl slider
    let tidytouchowlCarousel = $(".tidytouch-owl__carousel");
    if (tidytouchowlCarousel.length) {
      tidytouchowlCarousel.each(function () {
        let elm = $(this);
        let options = elm.data("owl-options");
        let thmOwlCarousel = elm.owlCarousel(
          "object" === typeof options ? options : JSON.parse(options)
        );
        elm.find("button").each(function () {
          $(this).attr("aria-label", "carousel button");
        });
      });
    }

    let tidytouchowlCarouselWithFilter = $(".tidytouch-owl__carousel--filter");
    if (tidytouchowlCarouselWithFilter.length) {
      tidytouchowlCarouselWithFilter.each(function () {
        let elm = $(this);
        let options = elm.data("owl-options");
        let filtersDiv = elm.data("owl-filters-div");
        let thmOwlCarousel = elm.owlCarousel(
          "object" === typeof options ? options : JSON.parse(options)
        );

        elm.find("button").each(function () {
          $(this).attr("aria-label", "carousel button");
        });

        $(filtersDiv).on('click', '.item', function () {
          var $item = $(this);
          $(filtersDiv).find(".item").removeClass("active");
          $item.addClass("active");
          var filter = $item.data('owl-filter')
          thmOwlCarousel.owlcarousel2_filter(filter);
          setTimeout(function () {
            var carousel = thmOwlCarousel.data('owl.carousel');
            elm.find(".tidytouch-owl__carousel__counter__current").text(carousel.relative(carousel.current()) + 1);
          }, 100);
        });
      });
    }

    let tidytouchowlCarouselNav = $(".tidytouch-owl__carousel--custom-nav");
    if (tidytouchowlCarouselNav.length) {
      tidytouchowlCarouselNav.each(function () {
        let elm = $(this);
        let owlNavPrev = elm.data("owl-nav-prev");
        let owlNavNext = elm.data("owl-nav-next");
        $(owlNavPrev).on("click", function (e) {
          elm.trigger("prev.owl.carousel");
          e.preventDefault();
        });

        $(owlNavNext).on("click", function (e) {
          elm.trigger("next.owl.carousel");
          e.preventDefault();
        });
      });
    }

    let tidytouchowlCarouselCustomDots = $(".tidytouch-owl__carousel--custom-dots");
    if (tidytouchowlCarouselCustomDots.length) {
      tidytouchowlCarouselCustomDots.each(function () {
        let elm = $(this);
        let tidytouchowlCarouselThumb = elm.data("thumb-elm");
        $(tidytouchowlCarouselThumb).each(function () {
          let self = $(this);
          self.find(".owl-dot").on("click", function () {
            elm.trigger("to.owl.carousel", [$(this).index(), 300]);
          });
        });
        elm.on("changed.owl.carousel", function (element) {
          $(tidytouchowlCarouselThumb).each(function () {
            let self = $(this);
            self.find(".owl-dot").removeClass("active");
            self.find(".owl-dot").eq(element.item.index).addClass("active");
          });
        });
      });
    }
  }

  function thmTinyInit() {
    // tiny slider
    const tinyElm = document.querySelectorAll(".thm-tiny__slider");
    tinyElm.forEach(function (tinyElm) {
      const tinyOptions = JSON.parse(tinyElm.dataset.tinyOptions);
      let thmTinySlider = tns(tinyOptions);
    });
  }

  function tidytouchSlickInit() {
    // slick slider
    let tidytouchslickCarousel = $(".tidytouch-slick__carousel");
    if (tidytouchslickCarousel.length) {
      tidytouchslickCarousel.each(function () {
        let elm = $(this);
        let options = elm.data("slick-options");
        let tidytouchslickCarousel = elm.slick(
          "object" === typeof options ? options : JSON.parse(options)
        );
      });
    }
    let tidytouchslickCarouselCounter = $(".tidytouch-slick__custome-counter");
    if (tidytouchslickCarouselCounter.length) {
      tidytouchslickCarouselCounter.each(function () {
        let elm = $(this);
        let options = elm.data("slick-options");
        let currentSlide;
        let slidesCount;
        let sliderCounter = document.createElement('div');
        sliderCounter.classList.add('tidytouch-slick__counter');

        let updateSliderCounter = function (slick, currentIndex) {
          currentSlide = slick.slickCurrentSlide() + 1;
          slidesCount = slick.slideCount;
          $(sliderCounter).html('<span class="tidytouch-slick__counter__active">' + currentSlide + '</span>' + '' + '<span>' + slidesCount + '</span>')
        };
        elm.on('init', function (event, slick) {
          elm.append(sliderCounter);
          updateSliderCounter(slick);
        });
        elm.on('afterChange', function (event, slick, currentSlide) {
          updateSliderCounter(slick, currentSlide);
        });

        let tidytouchslickCarousel = elm.slick(
          "object" === typeof options ? options : JSON.parse(options)
        );
      });
    }
  }

  /*-- Handle Scrollbar --*/
  function handleScrollbar() {
    const bodyHeight = $("body").height();
    const scrollPos = $(window).innerHeight() + $(window).scrollTop();
    let percentage = (scrollPos / bodyHeight) * 100;
    if (percentage > 100) {
      percentage = 100;
    }
    $(".scroll-to-top .scroll-to-top__inner").css("width", percentage + "%");
  }

  /*-- One Page Menu --*/
  function SmoothMenuScroll() {
    var anchor = $(".scrollToLink");
    if (anchor.length) {
      anchor.children("a").on("click", function (event) {
        if ($(window).scrollTop() > 10) {
          var headerH = "0";
        } else {
          var headerH = "0";
        }
        var target = $(this);
        $("html, body")
          .stop()
          .animate({
              scrollTop: $(target.attr("href")).offset().top - headerH + "px"
            },
            900,
            "easeInOutExpo"
          );
        anchor.removeClass("current");
        anchor.removeClass("current-menu-ancestor");
        anchor.removeClass("current_page_item");
        anchor.removeClass("current-menu-parent");
        target.parent().addClass("current");
        event.preventDefault();
      });
    }
  }
  SmoothMenuScroll();

  function OnePageMenuScroll() {
    var windscroll = $(window).scrollTop();
    if (windscroll >= 117) {
      var menuAnchor = $(".one-page-scroll-menu .scrollToLink").children("a");
      menuAnchor.each(function () {
        var sections = $(this).attr("href");
        $(sections).each(function () {
          if ($(this).offset().top <= windscroll + 100) {
            var Sectionid = $(sections).attr("id");
            $(".one-page-scroll-menu").find("li").removeClass("current");
            $(".one-page-scroll-menu")
              .find("li")
              .removeClass("current-menu-ancestor");
            $(".one-page-scroll-menu")
              .find("li")
              .removeClass("current_page_item");
            $(".one-page-scroll-menu")
              .find("li")
              .removeClass("current-menu-parent");
            $(".one-page-scroll-menu")
              .find("a[href*=\\#" + Sectionid + "]")
              .parent()
              .addClass("current");
          }
        });
      });
    } else {
      $(".one-page-scroll-menu li.current").removeClass("current");
      $(".one-page-scroll-menu li:first").addClass("current");
    }
  }

  // window scroll event
  function stickyMenuUpScroll($targetMenu, $toggleClass) {
    var lastScrollTop = 0;
    window.addEventListener(
      "scroll",
      function () {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > 500) {
          if (st > lastScrollTop) {
            // downscroll code
            $targetMenu.removeClass($toggleClass);
            // console.log("down");
          } else {
            // upscroll code
            $targetMenu.addClass($toggleClass);
            // console.log("up");
          }
        } else {
          $targetMenu.removeClass($toggleClass);
        }
        lastScrollTop = st;
      },
      false
    );
  }
  stickyMenuUpScroll($(".sticky-header--normal"), "active");

  //Strech Column
  function tidytouch_stretch() {
    var i = $(window).width();
    $(".row .tidytouch-stretch-element-inside-column").each(function () {
      var $this = $(this),
        row = $this.closest(".row"),
        cols = $this.closest('[class^="col-"]'),
        colsheight = $this.closest('[class^="col-"]').height(),
        rect = this.getBoundingClientRect(),
        l = row[0].getBoundingClientRect(),
        s = cols[0].getBoundingClientRect(),
        r = rect.left,
        d = i - rect.right,
        c = l.left + (parseFloat(row.css("padding-left")) || 0),
        u = i - l.right + (parseFloat(row.css("padding-right")) || 0),
        p = s.left,
        f = i - s.right,
        styles = {
          "margin-left": 0,
          "margin-right": 0
        };
      if (Math.round(c) === Math.round(p)) {
        var h = parseFloat($this.css("margin-left") || 0);
        styles["margin-left"] = h - r;
      }
      if (Math.round(u) === Math.round(f)) {
        var w = parseFloat($this.css("margin-right") || 0);
        styles["margin-right"] = w - d;
      }
      $this.css(styles);
    });
  }
  tidytouch_stretch();

  function tidytouch_cuved_circle() {
    let circleTypeElm = $(".curved-circle--item");
    if (circleTypeElm.length) {
      circleTypeElm.each(function () {
        let elm = $(this);
        let options = elm.data("circle-text-options");
        elm.circleType(
          "object" === typeof options ? options : JSON.parse(options)
        );
      });
    }
  }

  /*-- Price Range --*/
  function priceFilter() {
    if ($(".price-ranger").length) {
      $(".price-ranger #slider-range").slider({
        range: true,
        min: 50,
        max: 1000,
        values: [11, 500],
        slide: function (event, ui) {
          $(".price-ranger .ranger-min-max-block .min").val("$" + ui.values[0]);
          $(".price-ranger .ranger-min-max-block .max").val("$" + ui.values[1]);
        }
      });
      $(".price-ranger .ranger-min-max-block .min").val(
        "$" + $(".price-ranger #slider-range").slider("values", 0)
      );
      $(".price-ranger .ranger-min-max-block .max").val(
        "$" + $(".price-ranger #slider-range").slider("values", 1)
      );
    }
  }

  // window load event
  $(window).on("load", function () {
    if ($(".preloader").length) {
      $(".preloader").fadeOut();
    }
    thmOwlInit();
    thmTinyInit();
    tidytouchSlickInit();
    priceFilter();

    if ($(".circle-progress").length) {
      $(".circle-progress").appear(function () {
        $(".circle-progress").each(function () {
          let progress = $(this);
          let progressOptions = progress.data("options");
          progress.circleProgress(progressOptions);
          progress.data("original-options", progressOptions);
        });
      });
    }

    $(".skill-box").on("mouseenter", function () {
      var $circle = $(this).find(".circle-progress");
      var originalOptions = $circle.data("original-options");
      if (originalOptions) {
        let hoverOptions = $.extend(true, {}, originalOptions);
        hoverOptions.fill.color = "#1947CD";
        $circle.circleProgress(hoverOptions);
      }
    });

    $(".skill-box").on("mouseleave", function () {
      var $circle = $(this).find(".circle-progress");
      var originalOptions = $circle.data("original-options");
      if (originalOptions) {
        $circle.circleProgress(originalOptions);
      }
    });

    if ($(".masonry-layout").length) {
      $(".masonry-layout").imagesLoaded(function () {
        $(".masonry-layout").isotope({
          layoutMode: "masonry"
        });
      });
    }

    if ($(".fitRow-layout").length) {
      $(".fitRow-layout").imagesLoaded(function () {
        $(".fitRow-layout").isotope({
          layoutMode: "fitRows"
        });
      });
    }

    if ($(".post-filter").length) {
      var postFilterList = $(".post-filter li");
      // for first init
      $(".filter-layout").isotope({
        filter: ".filter-item",
        animationOptions: {
          duration: 500,
          easing: "linear",
          queue: false
        }
      });
      // on click filter links
      postFilterList.on("click", function () {
        var Self = $(this);
        var selector = Self.attr("data-filter");
        postFilterList.removeClass("active");
        Self.addClass("active");

        $(".filter-layout").isotope({
          filter: selector,
          animationOptions: {
            duration: 500,
            easing: "linear",
            queue: false
          }
        });
        return false;
      });
    }

    if ($(".post-filter.has-dynamic-filter-counter").length) {
      // var allItem = $('.single-filter-item').length;

      var activeFilterItem = $(".post-filter.has-dynamic-filter-counter").find(
        "li"
      );

      activeFilterItem.each(function () {
        var filterElement = $(this).data("filter");
        var count = $(".filter-layout").find(filterElement).length;
        $(this).append("<sup>[" + count + "]</sup>");
      });
    }

    tidytouch_cuved_circle();
  });

  $(window).on("scroll", function () {
    OnePageMenuScroll();
    handleScrollbar();
    if ($(".sticky-header--one-page").length) {
      var headerScrollPos = 130;
      var stricky = $(".sticky-header--one-page");
      if ($(window).scrollTop() > headerScrollPos) {
        stricky.addClass("active");
      } else if ($(this).scrollTop() <= headerScrollPos) {
        stricky.removeClass("active");
      }
    }

    var scrollToTopBtn = ".scroll-to-top";
    if (scrollToTopBtn.length) {
      if ($(window).scrollTop() > 500) {
        $(scrollToTopBtn).addClass("show");
      } else {
        $(scrollToTopBtn).removeClass("show");
      }
    }
  });

  $(window).on("resize", function () {
    tidytouch_stretch();
  });
})(jQuery);