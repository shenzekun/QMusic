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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.lazyload = lazyload;
function lazyload() {
    var imgs = Array.from(document.querySelectorAll('.lazyload'));
    //判断浏览器是否有IntersectionObserver
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
    } else {
        var onscroll = throttle(function () {
            imgs = imgs.filter(function (img) {
                return img.classList.contains('lazyload');
            });
            imgs.forEach(function (img) {
                return isVisible(img) && loadImage(img);
            });
            //如果图片到没有了，移除监听事件提高性能
            if (imgs.length === 0) {
                window.removeEventListener('scroll', onscroll);
            }
            imgs.forEach(function (img) {
                return isVisible(img) && loadImage(img);
            });
        }, 300);
        window.addEventListener('scroll', onscroll);
        window.dispatchEvent(new Event('scroll'));
    }
}

//节流
function throttle(func, wait) {
    var context = void 0,
        args = void 0,
        timer = void 0;
    var prev = 0;
    return function fn() {
        var now = +new Date();
        var diff = now - prev;
        context = this;
        args = arguments;
        if (!prev || diff >= wait) {
            func.apply(context, args);
            prev = now;
        } else if (diff < wait) {
            clearTimeout(timer);
            timer = setTimeout(fn, wait - diff);
        }
    };
}
//判断是否可见
function isVisible(img) {
    var _img$getBoundingClien = img.getBoundingClientRect(),
        top = _img$getBoundingClien.top,
        left = _img$getBoundingClien.left,
        right = _img$getBoundingClien.right,
        bottom = _img$getBoundingClien.bottom;

    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    return (top > 0 && top < windowHeight || bottom > 0 && bottom < windowHeight) && (left > 0 && left < windowWidth || right > 0 && right < windowWidth);
}

//加载图片
function loadImage(img, callback) {
    var image = new Image();
    image.src = img.dataset.src;
    image.onload = function () {
        img.src = image.src;
        img.classList.remove('lazyload');
        if (Object.prototype.toString.call(callback) === '[object Function]') {
            callback();
        }
    };
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _recommend = __webpack_require__(3);

var _tab = __webpack_require__(5);

var _tab2 = _interopRequireDefault(_tab);

var _toplist = __webpack_require__(6);

var _search = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var x = new _recommend.Recommend(document.querySelector('.rec-view')).start();

var y = new _toplist.TopList(document.querySelector('.rank-view')).start();

var z = new _search.Search().search();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Recommend = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _content = __webpack_require__(0);

var _slider = __webpack_require__(4);

var _lazyload = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Recommend = exports.Recommend = function () {
    function Recommend(el) {
        _classCallCheck(this, Recommend);

        this.el = el;
    }

    _createClass(Recommend, [{
        key: 'start',
        value: function start() {
            var _this2 = this;

            if ('fetch' in window) {
                fetch(_content.RECOMMEND_URL).then(function (res) {
                    return res.json();
                }).then(function (json) {
                    return _this2.json = json;
                }).then(function () {
                    return _this2.render();
                });
            } else {
                //如果不兼容 fetch
                var xhr = void 0;
                var _this = this;
                if (window.XMLHttpRequest) {
                    xhr = new XMLHttpRequest();
                } else {
                    //兼容 ie6
                    xhr = new ActiveXObject('Microsoft.XMLHTTP');
                }
                //连接
                xhr.open('GET', _content.RECOMMEND_URL, true);
                //发送请求
                xhr.send();

                xhr.onreadystatechange = function () {
                    //读取完成
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            _this.json = JSON.parse(xhr.responseText);
                            _this.render();
                        } else {
                            console.log('失败' + xhr.status);
                        }
                    }
                };
            }
        }
    }, {
        key: 'render',
        value: function render() {
            document.querySelector('.loading').classList.add('hide');
            this.renderSlider(this.json.data.slider);
            this.renderRadios(this.json.data.radioList);
            this.renderPlayList(this.json.data.songList);
            (0, _lazyload.lazyload)();
        }
    }, {
        key: 'renderSlider',
        value: function renderSlider(slides) {
            this.slider = new _slider.Slider({
                el: this.el.querySelector('#slider'),
                slides: slides.map(function (slide) {
                    return {
                        link: slide.linkUrl,
                        image: slide.picUrl
                    };
                })
            });
        }
    }, {
        key: 'renderRadios',
        value: function renderRadios(radios) {
            document.querySelector('.radios .list').innerHTML = radios.map(function (radio) {
                return '<div class="list-item">\n                <div class="list-media">\n                    <img data-src="' + radio.picUrl + '" class="lazyload">\n                    <span class="icon icon_play"></span>\n                </div>\n                <div class="list-info">' + radio.Ftitle + '</div>\n            </div>';
            }).join('');
        }
    }, {
        key: 'renderPlayList',
        value: function renderPlayList(playlists) {
            document.querySelector('.playlists .list').innerHTML = playlists.map(function (list) {
                return '<div class="list-item">\n            <div class="list-media">\n                <img class="lazyload" data-src="' + list.picUrl + '">\n                <span class="listen_count"><span class="icon icon_listen"></span>' + ((list.accessnum / 10000).toFixed(1) + '万') + '</span>\n                <span class="icon icon_play"></span>\n            </div>\n            <div class="list-info">\n                <div class="list_tit">' + list.songListDesc + '</div>\n                <div class="list-text"></div>\n            </div>\n        </div>';
            }).join('');
        }
    }]);

    return Recommend;
}();

/***/ }),
/* 4 */
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
        this.touchX = 0; //触控开始的手指最初落点
        this.ready_moved = true; //判断每次滑动开始的标记变量
        this.render();
        this.bindEvent();
        this.start();
    }

    _createClass(Slider, [{
        key: 'render',
        value: function render() {
            this.el.innerHTML = '<div class="qq-slider-wrap"></div>\n     <p class="ui-slider-dots">\n      <b class="active"></b>\n      <b class=""></b>\n      <b class=""></b>\n      <b class=""></b>\n      <b class=""></b>\n    </p>';
            this.dots = document.querySelector('.ui-slider-dots');
            this.wrap = this.el.firstElementChild;
            this.wrap.style.width = this.slides.length * 100 + '%';
            this.wrap.innerHTML = this.slides.map(function (slide) {
                return '<div class="qq-slider-item">\n          <a href="' + slide.link + '">\n            <img src="' + slide.image + '">\n          </a>\n      </div>';
            }).join('');
        }
        //自动播放

    }, {
        key: 'autoPlay',
        value: function autoPlay() {
            this.timer = setInterval(this.next.bind(this), this.interval);
        }
        //开始

    }, {
        key: 'start',
        value: function start() {
            this.autoPlay();
        }
        //下一张

    }, {
        key: 'next',
        value: function next() {
            this.index += 1;
            if (this.index % this.slides.length === 0) {
                this.wrap.style.transform = 'translate(0)';
                this.index = 0;
                this.setActiveDot();
                return;
            }
            this.wrap.style.transform = 'translate(-' + this.index * 100 / this.slides.length + '%)';
            this.setActiveDot();
        }

        //上一张

    }, {
        key: 'pre',
        value: function pre() {
            if (this.index - 1 < 0) {
                this.index = this.slides.length + this.index - 1;
            } else {
                this.index -= 1;
            }
            if (this.index % this.slides.length === 0) {
                this.wrap.style.transform = 'translate(0)';
                this.index = 0;
                this.setActiveDot();
                return;
            }
            this.wrap.style.transform = 'translate(-' + (this.slides.length + this.index) % this.slides.length * 100 / this.slides.length + '%)';
            this.setActiveDot();
        }
    }, {
        key: 'setActiveDot',
        value: function setActiveDot() {
            var len = this.dots.children.length;
            for (var i = 0; i < len; i++) {
                var b = document.getElementsByTagName('b')[i];
                b.classList.remove('active');
                if (this.index === i) {
                    b.classList.add('active');
                }
            }
        }
    }, {
        key: 'bindEvent',
        value: function bindEvent() {
            this.wrap.addEventListener('touchstart', this.touchstart.bind(this));
            this.wrap.addEventListener('touchend', this.touchend.bind(this));
        }
    }, {
        key: 'touchstart',
        value: function touchstart(e) {
            if (this.ready_moved) {
                var touch = e.targetTouches[0];
                this.touchX = touch.clientX;
                this.ready_moved = false;
            }
        }
    }, {
        key: 'touchend',
        value: function touchend(e) {
            var touchX = this.touchX;
            var _this = this;
            if (!_this.ready_moved) {
                var release = e.changedTouches[0];
                var releasedAt = release.clientX;
                var diff = releasedAt - _this.touchX;
                if (diff > 50) {
                    _this.pre();
                    clearInterval(_this.timer);
                    this.autoPlay();
                    _this.ready_moved = true;
                } else if (diff < -50) {
                    _this.next();
                    clearInterval(_this.timer);
                    this.autoPlay();
                    _this.ready_moved = true;
                }
            }
        }
    }]);

    return Slider;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


document.addEventListener('touchstart', function (event) {
    var target = event.target;
    if (target.dataset.role !== 'tab') return;
    [].forEach.call(target.parentElement.children, function (tab) {
        tab.classList.remove('active');
    });
    target.classList.add('active');
    var content = document.querySelector(target.dataset.view);
    if (content) {
        [].forEach.call(content.parentElement.children, function (child) {
            child.style.display = 'none';
        });
        content.style.display = 'block';
    }
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TopList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _content = __webpack_require__(0);

var _lazyload = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TopList = exports.TopList = function () {
    function TopList(el) {
        _classCallCheck(this, TopList);

        this.el = el;
    }

    _createClass(TopList, [{
        key: 'start',
        value: function start() {
            var _this2 = this;

            if ('fetch' in window) {
                fetch(_content.TOPLIST_URL).then(function (res) {
                    return res.json();
                }).then(function (json) {
                    return _this2.list = json.data.topList;
                }).then(function () {
                    return _this2.render();
                });
            } else {
                var xhr = void 0;
                var _this = this;
                if (window.XMLHttpRequest) {
                    xhr = new XMLHttpRequest();
                } else {
                    xhr = new ActiveXObject('Microsoft.XMLHTTP');
                }
                xhr.open('GET', _content.TOPLIST_URL, true);
                xhr.send();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            _this.json = JSON.parse(xhr.responseText);
                            _this.render();
                        } else {
                            console.log('失败' + xhr.status);
                        }
                    }
                };
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            document.querySelector('.toplist').innerHTML = this.list.map(function (item) {
                return '<li class="top-item">\n        <div class="top-item-media">\n          <a href=\'https://y.qq.com/w/toplist.html?ADTAG=myqq&from=myqq&channel=10007100&id=' + item.id + '&type=top\'>\n            <img class="lazyload" data-src="' + item.picUrl.replace('http://', 'https://') + '">\n          </a>\n        </div>\n        <a href=\'https://y.qq.com/w/toplist.html?ADTAG=myqq&from=myqq&channel=10007100&id=' + item.id + '&type=top\'>\n            <div class="top-item-info">\n            <h3 class="top-item-title ellipsis">' + item.topTitle + '</h3>\n            <ul class="top-item-list">' + _this3.songlist(item.songList) + '</ul>\n            </div>\n        </a>\n      </li>';
            }).join('');
            (0, _lazyload.lazyload)(this.el.querySelectorAll('.lazyload'));
        }
    }, {
        key: 'songlist',
        value: function songlist(songs) {
            return songs.map(function (song, i) {
                return '<li class="top-item-song">\n        <i class="song-index">' + (i + 1) + '</i>\n        <span class="song-name">' + song.songname + '</span>- ' + song.singername + '\n      </li>';
            }).join('');
        }
    }]);

    return TopList;
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Search = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _content = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Search = exports.Search = function () {
    function Search() {
        _classCallCheck(this, Search);

        this.input = document.querySelector('#search');
        this.input.addEventListener('keyup', this.onEnter.bind(this));
        this.songs = document.querySelector('.song-list');
        this.keyword = ''; //输入搜索的值
        this.page = 1; //默认页数为1
        this.isLoad = true;
        this.fetching = false;
        window.addEventListener('scroll', this.onScroll.bind(this));
    }

    _createClass(Search, [{
        key: 'onEnter',
        value: function onEnter(event) {
            //获取输入的值,并且去除两边的空格
            this.keyword = event.target.value.trim();
            //如果为空，去除显示的歌
            if (!this.keyword) return this.reset();
            //如果不是 enter 直接返回
            if (event.keyCode !== 13) return;
            this.search(this.keyword);
        }
        //重置

    }, {
        key: 'reset',
        value: function reset() {
            this.page = 1;
            this.keyword = '';
            this.isLoad = true;
            this.songs.innerHTML = '';
        }
    }, {
        key: 'onScroll',
        value: function onScroll(e) {
            if (this.isLoad) {
                if (document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight - 100) {
                    this.search(this.keyword, this.page + 1);
                }
            } else {
                return window.removeEventListener('scroll', this.onScroll.bind(this));
            }
        }
    }, {
        key: 'handleSearchUrl',
        value: function handleSearchUrl(keyword) {
            var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

            return _content.SEARCH_URL + '?keyword=' + keyword + '&page=' + page;
        }
    }, {
        key: 'search',
        value: function search(keyword, page) {
            var _this = this;

            if (this.keyword === '') return;
            if (this.fetching || !this.isLoad) return;
            if (this.keyword !== keyword) {
                this.reset();
                this.keyword = keyword;
            }
            this.keyword = keyword;
            this.loading();
            fetch(this.handleSearchUrl(this.keyword, page || this.page)).then(function (res) {
                return res.json();
            }).then(function (json) {
                _this.page = json.data.song.curpage;
                _this.isLoad = json.message !== 'no results';
                return json.data.song.list;
            }).then(function (songs) {
                return _this.append(songs);
            }).then(function () {
                return _this.accomplish();
            }).catch(function () {
                return console.log('error');
            });
        }
    }, {
        key: 'append',
        value: function append(songs) {
            var html = songs.map(function (song) {
                var artist = song.singer.map(function (s) {
                    return s.name;
                }).join('');
                return '<a class="song-item"\n               href="#player?artist=' + artist + '&songid=' + song.songid + '&songname=' + song.songname + '&albummid=' + song.albummid + '&duration=' + song.interval + '">\n              <i class="icon icon-music"></i>\n              <div class="song-name">' + song.songname + '</div>\n              <div class="song-artist">' + artist + '</div>\n            </a>';
            }).join('');
            this.songs.insertAdjacentHTML('beforeend', html);
        }
    }, {
        key: 'loading',
        value: function loading() {
            this.fetching = true;
            document.querySelector('.search-loading').classList.add('show');
        }
    }, {
        key: 'accomplish',
        value: function accomplish() {
            this.fetching = false;
            if (!this.isLoad) {
                document.querySelector('.loading-icon').style.display = 'none';
                document.querySelector('.loading-text').style.display = 'none';
                document.querySelector('.loading-done').style.display = 'block';
            } else {
                document.querySelector('.search-loading').classList.remove('show');
            }
        }
    }]);

    return Search;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map