/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _recommend = __webpack_require__(1);

var _tab = __webpack_require__(5);

var _tab2 = _interopRequireDefault(_tab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var x = new _recommend.Recommend(document.querySelector(".rec-view")).start();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Recommend = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _content = __webpack_require__(2);

var _slider = __webpack_require__(3);

var _lazyload = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Recommend = exports.Recommend = function () {
  function Recommend(el) {
    _classCallCheck(this, Recommend);

    this.el = el;
  }

  _createClass(Recommend, [{
    key: "start",
    value: function start() {
      var _this = this;

      if ("fetch" in window) {
        fetch(_content.RECOMMEND_URL).then(function (res) {
          return res.json();
        }).then(function (json) {
          return _this.json = json;
        }).then(function () {
          return _this.render();
        });
      } else {}
    }
  }, {
    key: "render",
    value: function render() {
      this.renderSlider(this.json.data.slider);
      this.renderRadios(this.json.data.radioList);
      this.renderPlayList(this.json.data.songList);
      (0, _lazyload.lazyload)();
    }
  }, {
    key: "renderSlider",
    value: function renderSlider(slides) {
      this.slider = new _slider.Slider({
        el: this.el.querySelector("#slider"),
        slides: slides.map(function (slide) {
          return {
            link: slide.linkUrl,
            image: slide.picUrl
          };
        })
      });
    }
  }, {
    key: "renderRadios",
    value: function renderRadios(radios) {
      document.querySelector(".radios .list").innerHTML = radios.map(function (radio) {
        return " <div class=\"list-item\">\n                <div class=\"list-media\">\n                    <img data-src=\"" + radio.picUrl + "\" class=\"lazyload\">\n                    <span class=\"icon icon_play\"></span>\n                </div>\n                <div class=\"list-info\">" + radio.Ftitle + "</div>\n            </div>";
      }).join('');
    }
  }, {
    key: "renderPlayList",
    value: function renderPlayList(playlists) {
      document.querySelector(".playlists .list").innerHTML = playlists.map(function (list) {
        return "<div class=\"list-item\">\n            <div class=\"list-media\">\n                <img class=\"lazyload\" data-src=\"" + list.picUrl + "\">\n                <span class=\"icon icon_play\"></span>\n            </div>\n            <div class=\"list-info\">\n                <div class=\"list_tit\">" + list.songListDesc + "</div>\n                <div class=\"list-text\"></div>\n            </div>\n        </div>";
      }).join('');
    }
  }]);

  return Recommend;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var RECOMMEND_URL = exports.RECOMMEND_URL = 'https://qq-music-api.now.sh';
var TOPLIST_URL = exports.TOPLIST_URL = 'https://qq-music-api.now.sh/top';
var SEARCH_URL = exports.SEARCH_URL = 'https://qq-music-api.now.sh/search';
var LYRICS_URL = exports.LYRICS_URL = 'https://qq-music-api.now.sh/lyrics';

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Slider = exports.Slider = function () {
  function Slider() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Slider);

    this.el = options.el;
    this.slides = options.slides;
    this.interval = options.interval || 3000;
    this.index = 0;
    this.render();
    this.start();
  }

  _createClass(Slider, [{
    key: 'render',
    value: function render() {
      this.el.innerHTML = '<div class="qq-slider-wrap"></div>';
      this.wrap = this.el.firstElementChild;
      this.wrap.style.width = this.slides.length * 100 + '%';
      this.wrap.innerHTML = this.slides.map(function (slide) {
        return '<div class="qq-slider-item">\n          <a href="' + slide.link + '">\n            <img src="' + slide.image + '">\n          </a>\n      </div>';
      }).join('');
    }
  }, {
    key: 'start',
    value: function start() {
      setInterval(this.next.bind(this), this.interval);
    }
  }, {
    key: 'next',
    value: function next() {
      this.index += 1;
      if (this.index === this.slides.length) {
        this.wrap.style.transform = 'translate(0)';
        this.index = 0;
        return;
      }
      this.wrap.style.transform = 'translate(-' + this.index * 100 / this.slides.length + '%)';
    }
  }]);

  return Slider;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.lazyload = lazyload;
function lazyload() {
    var imgs = Array.from(document.querySelectorAll(".lazyload"));
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (changes) {
            changes.forEach(function (change) {
                if (change.intersectionRatio > 0) {
                    loadImage(change.target, function () {
                        observer.unobserve(change.target);
                    });
                }
            });
        });
        imgs.forEach(function (img) {
            observer.observe(img);
        });
    } else {}
}

function loadImage(img, callback) {
    var image = new Image();
    image.src = img.dataset.src;
    image.onload = function () {
        img.src = image.src;
        img.classList.remove('lazyload');
        if (Object.prototype.toString.call(callback) === '[object Function]') callback();
    };
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


document.addEventListener("click", function (event) {
  var target = event.target;
  if (target.dataset.role !== "tab") return;
  [].forEach.call(target.parentElement.children, function (tab) {
    tab.classList.remove("active");
  });
  target.classList.add("active");
  var content = document.querySelector(target.dataset.view);
  if (content) {
    [].forEach.call(content.parentElement.children, function (child) {
      child.style.display = "none";
    });
    content.style.display = "block";
  }
});

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map