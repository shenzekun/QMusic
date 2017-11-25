!function(e){function t(i){if(n[i])return n[i].exports;var s=n[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,t),s.l=!0,s.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.RECOMMEND_URL="https://qq-music-api.now.sh",t.TOPLIST_URL="https://qq-music-api.now.sh/top",t.SEARCH_URL="https://qq-music-api.now.sh/search",t.LYRICS_URL="https://qq-music-api.now.sh/lyrics"},function(e,t,n){"use strict";function i(){var e=Array.from(document.querySelectorAll(".lazyload"));if("IntersectionObserver"in window){var t=new IntersectionObserver(function(e){e.forEach(function(e){e.intersectionRatio>0&&r(e.target,function(){t.unobserve(e.target)})})});e.forEach(function(e){t.observe(e)})}else{var n=s(function(){e=e.filter(function(e){return e.classList.contains("lazyload")}),e.forEach(function(e){return o(e)&&r(e)}),0===e.length&&window.removeEventListener("scroll",n),e.forEach(function(e){return o(e)&&r(e)})},300);window.addEventListener("scroll",n),window.dispatchEvent(new Event("scroll"))}}function s(e,t){var n=void 0,i=void 0,s=void 0,o=0;return function r(){var a=+new Date,c=a-o;n=this,i=arguments,!o||c>=t?(e.apply(n,i),o=a):c<t&&(clearTimeout(s),s=setTimeout(r,t-c))}}function o(e){var t=e.getBoundingClientRect(),n=t.top,i=t.left,s=t.right,o=t.bottom,r=document.documentElement.clientWidth,a=document.documentElement.clientHeight;return(n>0&&n<a||o>0&&o<a)&&(i>0&&i<r||s>0&&s<r)}function r(e,t){var n=new Image;n.src=e.dataset.src,n.onload=function(){e.src=n.src,e.classList.remove("lazyload"),"[object Function]"===Object.prototype.toString.call(t)&&t()}}Object.defineProperty(t,"__esModule",{value:!0}),t.lazyload=i},function(e,t,n){"use strict";var i=n(3),s=n(5),o=(function(e){e&&e.__esModule}(s),n(6)),r=n(7);new i.Recommend(document.querySelector(".rec-view")).start(),new o.TopList(document.querySelector(".rank-view")).start(),(new r.Search).search()},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.Recommend=void 0;var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=n(0),r=n(4),a=n(1);t.Recommend=function(){function e(t){i(this,e),this.el=t}return s(e,[{key:"start",value:function(){var e=this;if("fetch"in window)fetch(o.RECOMMEND_URL).then(function(e){return e.json()}).then(function(t){return e.json=t}).then(function(){return e.render()});else{var t=void 0,n=this;t=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),t.open("GET",o.RECOMMEND_URL,!0),t.send(),t.onreadystatechange=function(){4===t.readyState&&(200===t.status?(n.json=JSON.parse(t.responseText),n.render()):console.log("失败"+t.status))}}}},{key:"render",value:function(){document.querySelector(".loading").classList.add("hide"),this.renderSlider(this.json.data.slider),this.renderRadios(this.json.data.radioList),this.renderPlayList(this.json.data.songList),(0,a.lazyload)()}},{key:"renderSlider",value:function(e){this.slider=new r.Slider({el:this.el.querySelector("#slider"),slides:e.map(function(e){return{link:e.linkUrl,image:e.picUrl}})})}},{key:"renderRadios",value:function(e){document.querySelector(".radios .list").innerHTML=e.map(function(e){return'<div class="list-item">\n                <div class="list-media">\n                    <img data-src="'+e.picUrl+'" class="lazyload">\n                    <span class="icon icon_play"></span>\n                </div>\n                <div class="list-info">'+e.Ftitle+"</div>\n            </div>"}).join("")}},{key:"renderPlayList",value:function(e){document.querySelector(".playlists .list").innerHTML=e.map(function(e){return'<div class="list-item">\n            <a href=\'https://y.qq.com/w/taoge.html?ADTAG=myqq&from=myqq&channel=10007100&id='+e.id+'\'>\n            <div class="list-media">\n                <img class="lazyload" data-src="'+e.picUrl+'">\n                <span class="listen_count"><span class="icon icon_listen"></span>'+(e.accessnum/1e4).toFixed(1)+'万</span>\n                <span class="icon icon_play"></span>\n            </div>\n            <div class="list-info">\n                <div class="list_tit">'+e.songListDesc+'</div>\n                <div class="list-text"></div>\n            </div>\n            </a>\n        </div>'}).join("")}}]),e}()},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();t.Slider=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,e),this.el=t.el,this.slides=t.slides,this.interval=t.interval||2e3,this.index=0,this.width=0,this.touchX=0,this.ready_moved=!0,this.render(),this.bindEvent(),this.start(),this.onresize()}return s(e,[{key:"onresize",value:function(){var e=this;window.addEventListener("resize",function(){e.width=e.el.clientWidth})}},{key:"render",value:function(){this.el.innerHTML='<div class="qq-slider-wrap"></div>\n        <p class="ui-slider-dots">\n        <b class="active"></b>\n        <b class=""></b>\n        <b class=""></b>\n        <b class=""></b>\n        <b class=""></b>\n        </p>',this.dots=document.querySelector(".ui-slider-dots"),this.wrap=this.el.firstElementChild,this.wrap.style.width=100*(this.slides.length+1)+"%",this.wrap.innerHTML=this.slides.map(function(e){return'<div class="qq-slider-item">\n          <a href="'+e.link+'">\n            <img src="'+e.image+'">\n          </a>\n      </div>'}).join(""),this.width=this.el.clientWidth;var e=this.wrap.firstElementChild;this.wrap.insertAdjacentHTML("beforeend",this.domToString(e))}},{key:"domToString",value:function(e){var t=document.createElement("div");t.appendChild(e.cloneNode(!0));var n=t.innerHTML;return t=e=null,n}},{key:"autoPlay",value:function(){this.timer=setInterval(this.next.bind(this),this.interval)}},{key:"start",value:function(){this.autoPlay()}},{key:"next",value:function(){this.index===this.slides.length&&(this.index=0,this.wrap.style.left="0"),this.index+=1,this.animate(this.wrap,-this.width*this.index),this.setActiveDot()}},{key:"animate",value:function(e,t){clearInterval(e.timer),e.timer=setInterval(function(){var n=e.offsetLeft,i=(t-n)/3;i=i>0?Math.ceil(i):Math.floor(i),n+=i,e.style.left=n+"px",n===t&&clearInterval(e.timer)},30)}},{key:"pre",value:function(){0===this.index&&(this.index=this.slides.length,this.wrap.style.left="-"+this.index*this.width+"px"),this.index-=1,this.animate(this.wrap,-this.index*this.width),this.setActiveDot()}},{key:"setActiveDot",value:function(){for(var e=this.dots.children.length,t=0;t<=e;t++){var n=document.getElementsByTagName("b")[t];n&&n.classList.remove("active"),this.index===t&&n&&n.classList.add("active"),5===this.index&&(n=document.getElementsByTagName("b")[0],n.classList.add("active"))}}},{key:"bindEvent",value:function(){this.wrap.addEventListener("touchstart",this.touchstart.bind(this)),this.wrap.addEventListener("touchend",this.touchend.bind(this))}},{key:"touchstart",value:function(e){if(this.ready_moved){var t=e.targetTouches[0];this.touchX=t.clientX,this.ready_moved=!1}}},{key:"touchend",value:function(e){var t=(this.touchX,this);if(!t.ready_moved){var n=e.changedTouches[0],i=n.clientX,s=i-t.touchX;s>50?(t.pre(),clearInterval(t.timer),this.autoPlay(),t.ready_moved=!0):s<-50&&(t.next(),clearInterval(t.timer),this.autoPlay(),t.ready_moved=!0)}}}]),e}()},function(e,t,n){"use strict";document.addEventListener("touchstart",function(e){var t=e.target;if("tab"===t.dataset.role){[].forEach.call(t.parentElement.children,function(e){e.classList.remove("active")}),t.classList.add("active");var n=document.querySelector(t.dataset.view);n&&([].forEach.call(n.parentElement.children,function(e){e.style.display="none"}),n.style.display="block")}})},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.TopList=void 0;var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=n(0),r=n(1);t.TopList=function(){function e(t){i(this,e),this.el=t}return s(e,[{key:"start",value:function(){var e=this;if("fetch"in window)fetch(o.TOPLIST_URL).then(function(e){return e.json()}).then(function(t){return e.list=t.data.topList}).then(function(){return e.render()});else{var t=void 0,n=this;t=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),t.open("GET",o.TOPLIST_URL,!0),t.send(),t.onreadystatechange=function(){4===t.readyState&&(200===t.status?(n.json=JSON.parse(t.responseText),n.render()):console.log("失败"+t.status))}}}},{key:"render",value:function(){var e=this;document.querySelector(".toplist").innerHTML=this.list.map(function(t){return'<li class="top-item">\n        <div class="top-item-media">\n          <a href=\'https://y.qq.com/w/toplist.html?ADTAG=myqq&from=myqq&channel=10007100&id='+t.id+'&type=top\'>\n            <img class="lazyload" data-src="'+t.picUrl.replace("http://","https://")+'">\n            <span class="listen_count"><i class="icon icon-listen"></i>'+(t.listenCount/1e4).toFixed(1)+"万</span>\n          </a>\n        </div>\n        <a href='https://y.qq.com/w/toplist.html?ADTAG=myqq&from=myqq&channel=10007100&id="+t.id+'&type=top\'>\n            <div class="top-item-info">\n            <h3 class="top-item-title ellipsis">'+t.topTitle+'</h3>\n            <ul class="top-item-list">'+e.songlist(t.songList)+"</ul>\n            </div>\n        </a>\n      </li>"}).join(""),(0,r.lazyload)(this.el.querySelectorAll(".lazyload"))}},{key:"songlist",value:function(e){return e.map(function(e,t){return'<li class="top-item-song">\n        <i class="song-index">'+(t+1)+'</i>\n        <span class="song-name">'+e.songname+"</span>- "+e.singername+"\n      </li>"}).join("")}}]),e}()},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.Search=void 0;var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=n(0);t.Search=function(){function e(){i(this,e),this.input=document.querySelector("#search"),this.input.addEventListener("keyup",this.onEnter.bind(this)),this.songs=document.querySelector(".song-list"),this.songsObject={},this.keyword="",this.page=1,this.isLoad=!0,this.fetching=!1,window.addEventListener("scroll",this.onScroll.bind(this))}return s(e,[{key:"onEnter",value:function(e){var t=e.target.value.trim();if(!t)return this.reset();13===e.keyCode&&this.search(t)}},{key:"reset",value:function(){this.page=1,this.keyword="",this.isLoad=!0,this.songsObject={},this.songs.innerHTML="",document.querySelector(".loading-icon").style.display="block",document.querySelector(".loading-text").style.display="block",document.querySelector(".loading-done").style.display="none",document.querySelector(".search-loading").classList.remove("show")}},{key:"onScroll",value:function(e){if(!this.isLoad)return window.removeEventListener("scroll",this.onScroll.bind(this));document.documentElement.clientHeight+pageYOffset>document.body.scrollHeight-100&&this.search(this.keyword,this.page+1)}},{key:"handleSearchUrl",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return o.SEARCH_URL+"?keyword="+e+"&page="+t}},{key:"search",value:function(e,t){var n=this;void 0===e&&(e=""),""!==e&&(this.keyword===e&&this.songsObject[t||this.page]||(this.keyword!==e&&this.reset(),!this.fetching&&this.isLoad&&(this.keyword=e,this.loading(),fetch(this.handleSearchUrl(this.keyword,t||this.page)).then(function(e){return e.json()}).then(function(e){return n.page=e.data.song.curpage,n.songsObject[n.page]=e.data.song.list,n.isLoad="no results"!==e.message,e.data.song.list}).then(function(e){return n.append(e)}).then(function(){return n.accomplish()}).catch(function(){return console.log("error")}))))}},{key:"append",value:function(e){var t=e.map(function(e){var t=e.singer.map(function(e){return e.name}).join("");return'<a class="song-item"\n               href="#player?artist='+t+"&songid="+e.songid+"&songname="+e.songname+"&albummid="+e.albummid+"&duration="+e.interval+'">\n              <i class="icon icon-music"></i>\n              <div class="song-name">'+e.songname+'</div>\n              <div class="song-artist">'+t+"</div>\n            </a>"}).join("");this.songs.insertAdjacentHTML("beforeend",t)}},{key:"loading",value:function(){this.fetching=!0,document.querySelector(".search-loading").classList.add("show")}},{key:"accomplish",value:function(){this.fetching=!1,this.isLoad?document.querySelector(".search-loading").classList.remove("show"):(document.querySelector(".loading-icon").style.display="none",document.querySelector(".loading-text").style.display="none",document.querySelector(".loading-done").style.display="block")}}]),e}()}]);
//# sourceMappingURL=app.js.map