'use strict';
(function () {
  // Production steps of ECMA-262, Edition 6, 22.1.2.1
if (!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }());
}
  var navMain = document.querySelector(".header__nav");
  var navToggle = document.querySelector(".header__toggle");
  var headerLogo = document.querySelector(".header__logo");

  if (navToggle.classList.contains("header__toggle--close")) {
    navToggle.classList.remove("header__toggle--close");
    navToggle.classList.add("header__toggle--open");
  }

  if (navMain.classList.contains("header__nav--nojs")) {
    navMain.classList.remove("header__nav--open");
    navMain.classList.add("header__nav--toggle");
    navMain.classList.remove("header__nav--nojs");
    headerLogo.classList.remove("visually-hidden")
  };

  navToggle.addEventListener("click", function () {
    if (navMain.classList.contains("header__nav--toggle")) {
      navMain.classList.remove("header__nav--toggle");
      navMain.classList.add("header__nav--open");
      headerLogo.classList.add("visually-hidden");
      navToggle.classList.add("header__toggle--close");
      navToggle.classList.remove("header__toggle--open");
    } else {
      navMain.classList.add("header__nav--toggle");
      navMain.classList.remove("header__nav--open");
      headerLogo.classList.remove("visually-hidden");
      navToggle.classList.remove("header__toggle--close");
      navToggle.classList.add("header__toggle--open");
    }
  });

  function closingModal (block) {
    var closeBtn = block.querySelector(".modal__close");
    closeBtn.addEventListener("click", function () {
      block.classList.add("visually-hidden");
    })
  }

  var modalAccount = document.querySelector(".modal__account");
  var modalFeedback = document.querySelector(".modal__feedback");
  var loginBtn = document.querySelector(".header__icon--login");
  var callbackBtn = document.querySelector(".header__icon--callback");

  loginBtn.addEventListener("click", function () {
    modalAccount.classList.remove("visually-hidden");
    closingModal(modalAccount);
  })

  callbackBtn.addEventListener("click", function () {
    modalFeedback.classList.remove("visually-hidden");
    closingModal(modalFeedback);
  })

  function makeArray (collection) {
    var array = Array.from(collection);
    return array;
  };

  var smallBackBtn = document.querySelector(".offer__small-slide-control--back");
  var smallForthBtn = document.querySelector(".offer__small-slide-control--forth");

  smallBackBtn.addEventListener("click", function () {
    var smallSlides = document.querySelectorAll(".offer__small-slide");
    for (var i = 0; i < smallSlides.length; i++) {
      if (smallSlides[i].classList.contains("show-small")) {
        smallSlides[i].classList.remove("show-small");
        smallSlides[i].classList.add("visually-hidden");
        var j = i - 1;
        if (j < 0) {
          j = smallSlides.length - 1;
        }
        smallSlides[j].classList.add("show-small");
        smallSlides[j].classList.remove("visually-hidden");
        break;
      }
    }
    }
  );

  smallForthBtn.addEventListener("click", function () {
    var smallSlides = document.querySelectorAll(".offer__small-slide");
    for (var i = 0; i < smallSlides.length; i++) {
      if (smallSlides[i].classList.contains("show-small")) {
        smallSlides[i].classList.remove("show-small");
        smallSlides[i].classList.add("visually-hidden");
        var j = i + 1;
        if (j >= smallSlides.length) {
          j = 0;
        }
        smallSlides[j].classList.add("show-small");
        smallSlides[j].classList.remove("visually-hidden");
        break;
      }
    }
    }
  );

  function moveSlides (contols, slidesClass) {
    Array.from(contols).forEach(function (button) {
      button.addEventListener("click", function() {
        Array.from(document.querySelectorAll(slidesClass)).forEach(function(element) {
          if (!element.classList.contains("visually-hidden")) {
            element.classList.add("visually-hidden");
          }
          if (button.id === element.dataset.index) {
            element.classList.remove("visually-hidden");
          }
        })
      })
    })
  }



  var bigSliderControls = document.getElementsByName("big-slider-choise");
  var newsSliderControls = document.getElementsByName("news-slider");
  var publicationsSliderControls = document.getElementsByName("publications-slider");
  var news = document.querySelector(".container__news");
  var publications = document.querySelector(".container__publications");

  moveSlides(bigSliderControls, ".offer__big-slide");
  moveSlides(newsSliderControls, ".news__block");
  moveSlides(publicationsSliderControls, ".publications__block");

  var newsBtn = document.querySelector(".news__caption");
  var publicationsBtn = document.querySelector(".publications__caption");

  newsBtn.addEventListener("click", function() {
    if (!newsBtn.classList.contains("active")) {
      newsBtn.classList.add("active");
      publicationsBtn.classList.remove("active");
      news.classList.remove("visually-hidden");
      publications.classList.add("visually-hidden");
      lastOne = "";
      lastIndex = 0;
    }
  })

  publicationsBtn.addEventListener("click", function() {
    if (!publicationsBtn.classList.contains("active")) {
      publicationsBtn.classList.add("active");
      newsBtn.classList.remove("active");
      publications.classList.remove("visually-hidden");
      news.classList.add("visually-hidden");
      lastOne = "";
      lastIndex = 0;
    }
  })

  var widthMatch = window.matchMedia("(min-width: 780px)");
  var newsArray = Array.from(document.querySelectorAll(".news__block"));
  var publicationsArray = Array.from(document.querySelectorAll(".publications__block"));

  if (widthMatch.matches) {
    newsArray.forEach(function(element) {
      element.classList.remove("visually-hidden");
    })
    publicationsArray.forEach(function(element) {
      element.classList.remove("visually-hidden");
    })
  } else {
    newsArray.forEach(function(element) {
      if (!element.classList.contains("news__block--0")) {
        element.classList.add("visually-hidden");
      }
    })
    publicationsArray.forEach(function(element) {
      if (!element.classList.contains("publications__block--0")) {
        element.classList.add("visually-hidden");
      }
    })
  }

  widthMatch.addEventListener("change", function(mm) {
    if (mm.matches) {
      newsArray.forEach(function(element) {
        element.classList.remove("visually-hidden");
      })
      publicationsArray.forEach(function(element) {
        element.classList.remove("visually-hidden");
      })
    } else {
      newsArray.forEach(function(element) {
        if (!element.classList.contains("news__block--0")) {
          element.classList.add("visually-hidden");
        }
      })
      publicationsArray.forEach(function(element) {
        if (!element.classList.contains("publications__block--0")) {
          element.classList.add("visually-hidden");
        }
      })
    }
  })

  var urlGet;
  var OK_RESPONSE = 200;
  var RESPONSE_TIMEOUT = 10000;
  function parseServerAnswer (onSuccess, onFail, block, template) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === OK_RESPONSE) {
        onSuccess(xhr.response, block, template);
      } else {
        onFail('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onFail('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onFail('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = RESPONSE_TIMEOUT; // 10s
    return xhr;
  };

  function load (success, fail, block, template) {
    var xhr = parseServerAnswer(success, fail, block, template);
    xhr.open('GET', urlGet);
    xhr.send();
  };

  function onLoad (array, block, template) {
    array.forEach(function (element, index) {
      element.indexForData = index + "-event";
    })
    renderArticles(array, block, template);
  };

  function renderPublications (dataArray) {
    var publicationsArray = document.querySelectorAll(".publications__block");
    for (var i=0; i < publicationsArray.length; i++) {
      publicationsArray[i].childNodes[1].innerText = dataArray[i].title;
      publicationsArray[i].childNodes[3].innerText = dataArray[i].text;
      publicationsArray[i].childNodes[5].innerText = dataArray[i].time;
    }
  }

  function onFail (error) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; width: 500px; height: 150px; position: absolute; top: 50%; left: 50%; transform: translateY(-50%) translateX(-50%); font-size: 30px; color: black; background-color: red; text-align: center';
    node.textContent = error;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  var moreNews = document.querySelector(".btn--more-news");
  var morePublications = document.querySelector(".btn--more-publications");

  moreNews.addEventListener("click", function() {
    urlGet = "js/news.xml"
    var newBlock = addNewBlock(newsContainer, "news__blocks");
    load(onLoad, onFail, newBlock, similarNewsTemplate);
  })

  morePublications.addEventListener("click", function() {
    urlGet = "js/publications.xml"
    var newBlock = addNewBlock(publicationsContainer, "publications__blocks");
    load(onLoad, onFail, newBlock, similarPublicationsTemplate);
  })

  var newsContainer = document.querySelector(".container__news");
  var similarNewsElement = document.querySelector(".news__blocks");
  var similarNewsTemplate = document.querySelector("#news-template")
    .content
    .querySelector(".news__block");
  var publicationsContainer = document.querySelector(".container__publications");
  var similarPublicationsElement = document.querySelector(".publications__blocks");
  var similarPublicationsTemplate = document.querySelector("#publications-template")
      .content
      .querySelector(".publications__block");
  var fragment = document.createDocumentFragment();

  function renderArticle (arrayElement, template) {
    var articleElement = template.cloneNode(true);
    var type;
    if (articleElement.classList.contains("news__block")) {
      type = ".news";
    } else if (articleElement.classList.contains("publications__block")) {
      type = ".publications";
    }
    if (lastOne) {
      articleElement.querySelector(type + "__title").textContent = lastOne;
    } else {
      articleElement.querySelector(type + "__title").textContent = arrayElement.title;
      articleElement.querySelector(type + "__text").textContent = arrayElement.text;
      articleElement.querySelector(type + "__time").textContent = arrayElement.time;
      articleElement.querySelector("time").datetime = arrayElement.datetime;
      articleElement.setAttribute('data-index', arrayElement.indexForData);
    }
    return articleElement;
  };
  var lastIndex = 0;
  var lastOne;

  function renderArticles (array, block, template) {
    for (var i=lastIndex; i < lastIndex + 3 && i < array.length; i++) {
      fragment.appendChild(renderArticle(array[i], template));
      block.appendChild(fragment);
    }
      lastIndex = lastIndex + 3;
      if (lastIndex > array.length - 1) {
        lastIndex = array.length - 1;
        lastOne = "Больше ничего нет!";
        if (block.classList.contains("news__block")) {
          lastNewsIndex = lastIndex;
        } else if (block.classList.contains("publications__block")) {
          LastPublicationsIndex = lastIndex;
        }
      }
    }

  var count = 0;

  function addNewBlock(container, className) {
    var newBlock = document.createElement("div");
    newBlock.classList.add(className);
    count = count + 1;
    newBlock.classList.add(className + "--" + count);
    fragment.appendChild(newBlock);
    container.appendChild(fragment);
    return newBlock;
  }

  var lastNewsIndex;
  var LastPublicationsIndex;


})();
