!function(t){function e(i){if(n[i])return n[i].exports;var s=n[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,e),s.l=!0,s.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,n){"use strict";var i=n(1),s=n(5);(function(t){t&&t.__esModule})(s),new i.Recommend(document.querySelector(".rec-view")).start()},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.Recommend=void 0;var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=n(2),a=n(3),o=n(4);e.Recommend=function(){function t(e){i(this,t),this.el=e}return s(t,[{key:"start",value:function(){var t=this;if("fetch"in window)fetch(r.RECOMMEND_URL).then(function(t){return t.json()}).then(function(e){return t.json=e}).then(function(){return t.render()});else{var e=void 0,n=this;e=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),e.open("GET",r.RECOMMEND_URL,!0),e.send(),e.onreadystatechange=function(){4===e.readyState&&(200===e.status?(n.json=JSON.parse(e.responseText),n.render()):console.log("失败"+e.status))}}}},{key:"render",value:function(){document.querySelector(".loading").classList.add("hide"),this.renderSlider(this.json.data.slider),this.renderRadios(this.json.data.radioList),this.renderPlayList(this.json.data.songList),(0,o.lazyload)()}},{key:"renderSlider",value:function(t){this.slider=new a.Slider({el:this.el.querySelector("#slider"),slides:t.map(function(t){return{link:t.linkUrl,image:t.picUrl}})})}},{key:"renderRadios",value:function(t){document.querySelector(".radios .list").innerHTML=t.map(function(t){return' <div class="list-item">\n                <div class="list-media">\n                    <img data-src="'+t.picUrl+'" class="lazyload">\n                    <span class="icon icon_play"></span>\n                </div>\n                <div class="list-info">'+t.Ftitle+"</div>\n            </div>"}).join("")}},{key:"renderPlayList",value:function(t){document.querySelector(".playlists .list").innerHTML=t.map(function(t){return'<div class="list-item">\n            <div class="list-media">\n                <img class="lazyload" data-src="'+t.picUrl+'">\n                <span class="listen_count"><span class="icon icon_listen"></span>'+(t.accessnum/1e4).toFixed(1)+'万</span>\n                <span class="icon icon_play"></span>\n            </div>\n            <div class="list-info">\n                <div class="list_tit">'+t.songListDesc+'</div>\n                <div class="list-text"></div>\n            </div>\n        </div>'}).join("")}}]),t}()},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.RECOMMEND_URL="https://qq-music-api.now.sh",e.TOPLIST_URL="https://qq-music-api.now.sh/top",e.SEARCH_URL="https://qq-music-api.now.sh/search",e.LYRICS_URL="https://qq-music-api.now.sh/lyrics"},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();e.Slider=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,t),this.el=e.el,this.slides=e.slides,this.interval=e.interval||3e3,this.index=0,this.touchX,this.ready_moved=!0,this.render(),this.bindEvent(),this.start()}return s(t,[{key:"render",value:function(){this.el.innerHTML='<div class="qq-slider-wrap"></div>\n     <p class="ui-slider-dots">\n      <b class="active"></b>\n      <b class=""></b>\n      <b class=""></b>\n      <b class=""></b>\n      <b class=""></b>\n    </p>',this.dots=document.querySelector(".ui-slider-dots"),this.wrap=this.el.firstElementChild,this.wrap.style.width=100*this.slides.length+"%",this.wrap.innerHTML=this.slides.map(function(t){return'<div class="qq-slider-item">\n          <a href="'+t.link+'">\n            <img src="'+t.image+'">\n          </a>\n      </div>'}).join("")}},{key:"autoPlay",value:function(){this.timer=setInterval(this.next.bind(this),this.interval)}},{key:"start",value:function(){this.autoPlay()}},{key:"next",value:function(){if(this.index+=1,this.index%this.slides.length==0)return this.wrap.style.transform="translate(0)",this.index=0,void this.setActiveDot();this.wrap.style.transform="translate(-"+100*this.index/this.slides.length+"%)",this.setActiveDot()}},{key:"pre",value:function(){if(this.index-1<0?this.index=this.slides.length+this.index-1:this.index-=1,this.index%this.slides.length==0)return this.wrap.style.transform="translate(0)",this.index=0,void this.setActiveDot();this.wrap.style.transform="translate(-"+(this.slides.length+this.index)%this.slides.length*100/this.slides.length+"%)",this.setActiveDot()}},{key:"setActiveDot",value:function(){for(var t=this.dots.children.length,e=0;e<t;e++){var n=document.getElementsByTagName("b")[e];n.classList.remove("active"),this.index===e&&n.classList.add("active")}}},{key:"bindEvent",value:function(){this.wrap.addEventListener("touchstart",this.touchstart.bind(this)),this.wrap.addEventListener("touchend",this.touchend.bind(this))}},{key:"touchstart",value:function(t){if(this.ready_moved){var e=t.targetTouches[0];this.touchX=e.clientX,this.ready_moved=!1}}},{key:"touchend",value:function(t){var e=(this.touchX,this);if(!e.ready_moved){var n=t.changedTouches[0],i=n.clientX,s=i-e.touchX;s>50?(e.pre(),clearInterval(e.timer),this.autoPlay(),e.ready_moved=!0):s<-50&&(e.next(),clearInterval(e.timer),this.autoPlay(),e.ready_moved=!0)}}}]),t}()},function(t,e,n){"use strict";function i(){var t=Array.from(document.querySelectorAll(".lazyload"));if("IntersectionObserver"in window){var e=new IntersectionObserver(function(t){t.forEach(function(t){t.intersectionRatio>0&&a(t.target,function(){e.unobserve(t.target)})})});t.forEach(function(t){e.observe(t)})}else{var n=s(function(){t=t.filter(function(t){return t.classList.contains("lazyload")}),t.forEach(function(t){return r(t)&&a(t)}),0===t.length&&window.removeEventListener("scroll",n),t.forEach(function(t){return r(t)&&a(t)})},300);window.addEventListener("scroll",n),window.dispatchEvent(new Event("scroll"))}}function s(t,e){var n=void 0,i=void 0,s=void 0,r=0;return function a(){var o=+new Date,c=o-r;n=this,i=arguments,!r||c>=e?(t.apply(n,i),r=o):c<e&&(clearTimeout(s),s=setTimeout(a,e-c))}}function r(t){var e=t.getBoundingClientRect(),n=e.top,i=e.left,s=e.right,r=e.bottom,a=document.documentElement.clientWidth,o=document.documentElement.clientHeight;return(n>0&&n<o||r>0&&r<o)&&(i>0&&i<a||s>0&&s<a)}function a(t,e){var n=new Image;n.src=t.dataset.src,n.onload=function(){t.src=n.src,t.classList.remove("lazyload"),"[object Function]"===Object.prototype.toString.call(e)&&e()}}Object.defineProperty(e,"__esModule",{value:!0}),e.lazyload=i},function(t,e,n){"use strict";document.addEventListener("touchstart",function(t){var e=t.target;if("tab"===e.dataset.role){[].forEach.call(e.parentElement.children,function(t){t.classList.remove("active")}),e.classList.add("active");var n=document.querySelector(e.dataset.view);n&&([].forEach.call(n.parentElement.children,function(t){t.style.display="none"}),n.style.display="block")}})}]);
//# sourceMappingURL=app.js.map