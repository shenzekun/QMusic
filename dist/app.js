!function(e){function t(n){if(i[n])return i[n].exports;var s=i[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,t),s.l=!0,s.exports}var i={};t.m=e,t.c=i,t.d=function(e,i,n){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.RECOMMEND_URL="https://shenzekun-qmusic-api.now.sh/",t.TOPLIST_URL="https://shenzekun-qmusic-api.now.sh/top",t.SEARCH_URL="https://shenzekun-qmusic-api.now.sh/search",t.LYRICS_URL="https://shenzekun-qmusic-api.now.sh/lyrics",t.HOTKEYS_URL="https://shenzekun-qmusic-api.now.sh/hotkey"},function(e,t,i){"use strict";function n(){var e=Array.from(document.querySelectorAll(".lazyload"));if("IntersectionObserver"in window){var t=new IntersectionObserver(function(e){e.forEach(function(e){e.intersectionRatio>0&&a(e.target,function(){t.unobserve(e.target)})})});e.forEach(function(e){t.observe(e)})}else{var i=s(function(){e=e.filter(function(e){return e.classList.contains("lazyload")}),e.forEach(function(e){return r(e)&&a(e)}),0===e.length&&window.removeEventListener("scroll",i),e.forEach(function(e){return r(e)&&a(e)})},300);window.addEventListener("scroll",i),window.dispatchEvent(new Event("scroll"))}}function s(e,t){var i=void 0,n=void 0,s=void 0,r=0;return function a(){var o=+new Date,l=o-r;i=this,n=arguments,!r||l>=t?(e.apply(i,n),r=o):l<t&&(clearTimeout(s),s=setTimeout(a,t-l))}}function r(e){var t=e.getBoundingClientRect(),i=t.top,n=t.left,s=t.right,r=t.bottom,a=document.documentElement.clientWidth,o=document.documentElement.clientHeight;return(i>0&&i<o||r>0&&r<o)&&(n>0&&n<a||s>0&&s<a)}function a(e,t){var i=new Image;i.src=e.dataset.src,i.onload=function(){e.src=i.src,e.classList.remove("lazyload"),"[object Function]"===Object.prototype.toString.call(t)&&t()}}Object.defineProperty(t,"__esModule",{value:!0}),t.lazyload=n},function(e,t,i){"use strict";function n(e){return"http://ws.stream.qqmusic.qq.com/"+e+".m4a?fromtag=46"}function s(e){return o.LYRICS_URL+"?id="+e}function r(e){return"https://y.gtimg.cn/music/photo_new/T002R150x150M000"+e+".jpg"}function a(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return o.SEARCH_URL+"?keyword="+e+"&page="+t}Object.defineProperty(t,"__esModule",{value:!0}),t.songUrl=n,t.lyricsUrl=s,t.albumCoverUrl=r,t.searchUrl=a;var o=i(0)},function(e,t,i){"use strict";function n(){var e=location.hash;if(/#player\?.+/.test(e)){var t=e.slice(e.indexOf("?")+1).match(/(\w+)=([^&]+)/g),i=t&&t.reduce(function(e,t){var i=t.split("=");return e[i[0]]=decodeURIComponent(i[1]),e},{});u.play(i)}else u.hide()}var s=i(4),r=i(6),a=(function(e){e&&e.__esModule}(r),i(7)),o=i(8),l=i(9),c=i(10),u=(new s.Recommend(document.querySelector(".rec-view")).start(),new c.HotKey(document.querySelector(".result-tags")).start(),(new o.Search).search(),new a.TopList(document.querySelector(".rec-view")).start(),new l.MusicPlayer(document.querySelector("#player")));document.querySelector("#show_player").addEventListener("click",function(){u.show()}),n(),addEventListener("hashchange",n)},function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.Recommend=void 0;var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),r=i(0),a=i(5),o=i(1);t.Recommend=function(){function e(t){n(this,e),this.el=t}return s(e,[{key:"start",value:function(){var e=this;if("fetch"in window)fetch(r.RECOMMEND_URL).then(function(e){return e.json()}).then(function(t){return e.json=t}).then(function(){return e.render()});else{var t=void 0,i=this;t=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),t.open("GET",r.RECOMMEND_URL,!0),t.send(),t.onreadystatechange=function(){4===t.readyState&&(200===t.status?(i.json=JSON.parse(t.responseText),i.render()):console.log("失败"+t.status))}}}},{key:"render",value:function(){document.querySelector(".loading").classList.add("hide"),this.renderSlider(this.json.data.slider),this.renderRadios(this.json.data.radioList),this.renderPlayList(this.json.data.songList),(0,o.lazyload)()}},{key:"renderSlider",value:function(e){this.slider=new a.Slider({el:this.el.querySelector("#slider"),slides:e.map(function(e){return{link:e.linkUrl,image:e.picUrl}})})}},{key:"renderRadios",value:function(e){document.querySelector(".radios .list").innerHTML=e.map(function(e){return'<div class="list-item">\n                <div class="list-media">\n                    <img data-src="'+e.picUrl+'" class="lazyload" src="./images/default_pic.jpg">\n                    <span class="icon icon_play"></span>\n                </div>\n                <div class="list-info">'+e.Ftitle+"</div>\n            </div>"}).join("")}},{key:"renderPlayList",value:function(e){document.querySelector(".playlists .list").innerHTML=e.map(function(e){return'<div class="list-item">\n            <a href=\'https://y.qq.com/w/taoge.html?ADTAG=myqq&from=myqq&channel=10007100&id='+e.id+'\'>\n            <div class="list-media">\n                <img class="lazyload" data-src="'+e.picUrl+'" src="./images/default_pic.jpg">\n                <span class="listen_count"><span class="icon icon_listen"></span>'+(e.accessnum/1e4).toFixed(1)+'万</span>\n                <span class="icon icon_play"></span>\n            </div>\n            <div class="list-info">\n                <div class="list_tit">'+e.songListDesc+'</div>\n                <div class="list-text"></div>\n            </div>\n            </a>\n        </div>'}).join("")}}]),e}()},function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}();t.Slider=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};n(this,e),this.el=t.el,this.slides=t.slides,this.interval=t.interval||2e3,this.index=0,this.width=0,this.touchX=0,this.ready_moved=!0,this.render(),this.bindEvent(),this.start(),this.onresize()}return s(e,[{key:"onresize",value:function(){var e=this;window.addEventListener("resize",function(){e.width=e.el.clientWidth})}},{key:"render",value:function(){this.el.innerHTML='<div class="qq-slider-wrap"></div>\n        <p class="ui-slider-dots">\n        <b class="active"></b>\n        <b class=""></b>\n        <b class=""></b>\n        <b class=""></b>\n        <b class=""></b>\n        </p>',this.dots=document.querySelector(".ui-slider-dots"),this.wrap=this.el.firstElementChild,this.wrap.style.width=100*(this.slides.length+1)+"%",this.wrap.innerHTML=this.slides.map(function(e){return'<div class="qq-slider-item">\n          <a href="'+e.link+'">\n            <img src="'+e.image+'">\n          </a>\n      </div>'}).join(""),this.width=this.el.clientWidth;var e=this.wrap.firstElementChild;this.wrap.insertAdjacentHTML("beforeend",this.domToString(e))}},{key:"domToString",value:function(e){var t=document.createElement("div");t.appendChild(e.cloneNode(!0));var i=t.innerHTML;return t=e=null,i}},{key:"autoPlay",value:function(){this.timer=setInterval(this.next.bind(this),this.interval)}},{key:"start",value:function(){this.autoPlay()}},{key:"next",value:function(){this.index===this.slides.length&&(this.index=0,this.wrap.style.left="0"),this.index+=1,this.animate(this.wrap,-this.width*this.index),this.setActiveDot()}},{key:"animate",value:function(e,t){clearInterval(e.timer),e.timer=setInterval(function(){var i=e.offsetLeft,n=(t-i)/2;n=n>0?Math.ceil(n):Math.floor(n),i+=n,e.style.left=i+"px",i===t&&clearInterval(e.timer)},30)}},{key:"pre",value:function(){0===this.index&&(this.index=this.slides.length,this.wrap.style.left="-"+this.index*this.width+"px"),this.index-=1,this.animate(this.wrap,-this.index*this.width),this.setActiveDot()}},{key:"setActiveDot",value:function(){for(var e=this.dots.children.length,t=0;t<=e;t++){var i=document.getElementsByTagName("b")[t];i&&i.classList.remove("active"),this.index===t&&i&&i.classList.add("active"),5===this.index&&(i=document.getElementsByTagName("b")[0],i.classList.add("active"))}}},{key:"bindEvent",value:function(){this.wrap.addEventListener("touchstart",this.touchstart.bind(this)),this.wrap.addEventListener("touchmove",this.touchmove.bind(this)),this.wrap.addEventListener("touchend",this.touchend.bind(this))}},{key:"touchstart",value:function(e){if(clearInterval(this.timer),this.ready_moved){var t=e.targetTouches[0];this.touchX=t.clientX,this.ready_moved=!1}}},{key:"touchmove",value:function(e){if(e.preventDefault(),e.stopPropagation(),clearInterval(this.timer),!this.ready_moved){var t=e.changedTouches[0],i=t.clientX,n=i-this.touchX,s=-this.index*this.width;n>0&&n<=this.width&&s+n<0?this.animate(this.wrap,s+n):n<0&&Math.abs(n)<=this.width&&s-Math.abs(n)>-this.slides.length*this.width?this.animate(this.wrap,s-Math.abs(n)):s+n>0?(0===this.index&&(this.index=this.slides.length,this.wrap.style.left="-"+this.index*this.width+"px"),this.animate(this.wrap,-this.index*this.width+n)):s-n<this.width*this.slides.length&&(this.index===this.slides.length&&(this.index=0,this.wrap.style.left="-"+this.index*this.width+"px"),this.animate(this.wrap,-this.index*this.width-n))}}},{key:"touchend",value:function(e){var t=this;if(!t.ready_moved){clearInterval(t.timer);var i=e.changedTouches[0],n=i.clientX,s=n-t.touchX;s>t.width/2?(t.pre(),t.autoPlay(),t.ready_moved=!0):s<-t.width/2?(t.next(),t.autoPlay(),t.ready_moved=!0):(t.animate(t.wrap,-t.index*t.width),t.autoPlay(),t.ready_moved=!0)}}}]),e}()},function(e,t,i){"use strict";document.addEventListener("touchstart",function(e){var t=e.target;if("tab"===t.dataset.role){[].forEach.call(t.parentElement.children,function(e){e.classList.remove("active")}),t.classList.add("active");var i=document.querySelector(t.dataset.view);i&&([].forEach.call(i.parentElement.children,function(e){e.style.display="none"}),i.style.display="block")}})},function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.TopList=void 0;var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),r=i(0),a=i(1);t.TopList=function(){function e(t){n(this,e),this.el=t}return s(e,[{key:"start",value:function(){var e=this;if("fetch"in window)fetch(r.TOPLIST_URL).then(function(e){return e.json()}).then(function(t){return e.list=t.data.topList}).then(function(){return e.render()});else{var t=void 0,i=this;t=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),t.open("GET",r.TOPLIST_URL,!0),t.send(),t.onreadystatechange=function(){4===t.readyState&&(200===t.status?(i.json=JSON.parse(t.responseText),i.render()):console.log("失败"+t.status))}}}},{key:"render",value:function(){var e=this;document.querySelector(".toplist").innerHTML=this.list.map(function(t){return'<li class="top-item">\n        <div class="top-item-media">\n          <a href=\'https://y.qq.com/w/toplist.html?ADTAG=myqq&from=myqq&channel=10007100&id='+t.id+'&type=top\'>\n            <img class="lazyload" data-src="'+t.picUrl.replace("http://","https://")+'" src="./images/default_pic.jpg">\n            <span class="listen_count"><i class="icon icon-listen"></i>'+(t.listenCount/1e4).toFixed(1)+"万</span>\n          </a>\n        </div>\n        <a href='https://y.qq.com/w/toplist.html?ADTAG=myqq&from=myqq&channel=10007100&id="+t.id+'&type=top\'>\n            <div class="top-item-info">\n            <h3 class="top-item-title ellipsis">'+t.topTitle+'</h3>\n            <ul class="top-item-list">'+e.songlist(t.songList)+"</ul>\n            </div>\n        </a>\n      </li>"}).join(""),(0,a.lazyload)(this.el.querySelectorAll(".lazyload"))}},{key:"songlist",value:function(e){return e.map(function(e,t){return'<li class="top-item-song">\n        <i class="song-index">'+(t+1)+'</i>\n        <span class="song-name">'+e.songname+"</span>- "+e.singername+"\n      </li>"}).join("")}}]),e}()},function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.Search=void 0;var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),r=i(2);t.Search=function(){function e(){n(this,e),this.input=document.querySelector("#search"),this.songs=document.querySelector(".song-list"),this.songsObject={},this.keyword="",this.page=1,this.isLoad=!0,this.fetching=!1,this.history=[],this.delete=document.querySelector(".icon-delete"),this.cancel=document.querySelector(".search-cancel"),this.input.addEventListener("keyup",this.onEnter.bind(this)),window.addEventListener("scroll",this.onScroll.bind(this)),window.addEventListener("click",this.onClick.bind(this))}return s(e,[{key:"onEnter",value:function(e){var t=e.target.value.trim();if(!t)return this.delete.classList.add("hide"),this.reset();this.delete.classList.remove("hide"),13===e.keyCode&&this.search(t)}},{key:"onClick",value:function(e){e.target===this.input&&this.cancel.classList.remove("hide"),e.target===this.cancel&&(this.cancel.classList.add("hide"),this.delete.classList.add("hide"),this.input.value="",this.reset()),e.target===this.delete&&(this.input.value="",this.delete.classList.add("hide"))}},{key:"addHistory",value:function(e){console.log("keyword"+e),-1===this.history.indexOf(e)&&(this.history.unshift(e),localStorage.setItem())}},{key:"renderHistory",value:function(){if(this.history.length>0){var e=this.history.map(function(e){return'\n                <li>\n                    <a href="#" class="record-main">\n                        <span class="icon icon-clock"></span>\n                        <span class="record-con ellipsis">'+e+'</span>\n                        <span class="icon icon-close"></span>\n                    </a>\n                </li>\n            '}).join("");e+='\n                <p class="record-clear-btn record-delete">清除搜索记录</p>\n            ',console.log(e),console.log(this.$history),this.$history.innerHTML=e}else 0===this.history.length&&(this.$history.innerHTML="",this.history=[])}},{key:"reset",value:function(){this.page=1,this.keyword="",this.isLoad=!0,this.songsObject={},this.songs.innerHTML="",document.querySelector(".loading-icon").style.display="block",document.querySelector(".loading-text").style.display="block",document.querySelector(".loading-done").style.display="none",document.querySelector(".search-loading").classList.remove("show")}},{key:"onScroll",value:function(e){if(!this.isLoad)return window.removeEventListener("scroll",this.onScroll.bind(this));document.documentElement.clientHeight+pageYOffset>document.body.scrollHeight-100&&this.search(this.keyword,this.page+1)}},{key:"search",value:function(e,t){var i=this;void 0===e&&(e=""),""!==e&&(this.keyword===e&&this.songsObject[t||this.page]||(this.keyword!==e&&this.reset(),!this.fetching&&this.isLoad&&(this.keyword=e,this.loading(),fetch((0,r.searchUrl)(this.keyword,t||this.page)).then(function(e){return e.json()}).then(function(e){return i.page=e.data.song.curpage,i.songsObject[i.page]=e.data.song.list,i.isLoad="no results"!==e.message,e.data.song.list}).then(function(e){return i.append(e)}).then(function(){return i.accomplish()}).catch(function(){return console.log("error")}))))}},{key:"append",value:function(e){var t=e.map(function(e){var t=e.singer.map(function(e){return e.name}).join("");return'<a class="song-item"\n               href="#player?artist='+t+"&songid="+e.songid+"&songname="+e.songname+"&albummid="+e.albummid+"&duration="+e.interval+'">\n              <i class="icon icon-music"></i>\n              <div class="song-name">'+e.songname+'</div>\n              <div class="song-artist">'+t+"</div>\n            </a>"}).join("");this.songs.insertAdjacentHTML("beforeend",t)}},{key:"loading",value:function(){this.fetching=!0,document.querySelector(".search-loading").classList.add("show")}},{key:"accomplish",value:function(){this.fetching=!1,this.isLoad?document.querySelector(".search-loading").classList.remove("show"):(document.querySelector(".loading-icon").style.display="none",document.querySelector(".loading-text").style.display="none",document.querySelector(".loading-done").style.display="block")}}]),e}()},function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.MusicPlayer=void 0;var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),r=i(2),a=(t.MusicPlayer=function(){function e(t){n(this,e),this.el=t,this.el.addEventListener("click",this.handleEvent.bind(this)),this.audio=this.createAudio(),this.lyrics=new o(this.el.querySelector(".player-lyrics"),this.audio),this.progress=new a(this.el.querySelector(".progress")),this.fetching=!1}return s(e,[{key:"createAudio",value:function(){var e=this,t=document.createElement("audio");return t.id="player-"+Math.floor(100*Math.random())+"-"+ +new Date,t.addEventListener("ended",function(){e.audio.play(),e.lyrics.restart(),e.progress.restart()}),document.body.appendChild(t),t}},{key:"handleEvent",value:function(e){var t=e.target;switch(!0){case t.matches(".icon-play"):this.onPlay(e);break;case t.matches(".icon-pause"):this.onPause(e);break;case t.matches(".icon-list"):this.hide()}}},{key:"onPlay",value:function(e){this.fetching||(this.audio.play(),this.lyrics.start(),this.progress.start(),e.target.classList.remove("icon-play"),e.target.classList.add("icon-pause"))}},{key:"play",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!t)return 0;this.el.querySelector(".song-name").innerText=t.songname,this.el.querySelector(".song-artist").innerText=t.artist,this.progress.reset(t.duration);var i=(0,r.albumCoverUrl)(t.albummid);this.el.querySelector(".album-cover").src=i,this.el.querySelector(".player-background").style.backgroundImage="url("+i+")",t.songid&&(this.songid!==t.songid&&(this.el.querySelector(".icon-action").className="icon-action icon-play"),this.songid=t.songid,this.audio.src=(0,r.songUrl)(this.songid),this.fetching=!0,fetch((0,r.lyricsUrl)(this.songid)).then(function(e){return e.json()}).then(function(e){return e.lyric}).then(function(t){return e.lyrics.reset(t)}).catch(function(e){return alert(e)}).then(function(){e.fetching=!1})),this.show()}},{key:"onPause",value:function(e){this.audio.pause(),this.lyrics.pause(),this.progress.pause(),e.target.classList.remove("icon-pause"),e.target.classList.add("icon-play")}},{key:"show",value:function(){this.el.classList.add("show"),document.body.classList.add("noscroll")}},{key:"hide",value:function(){this.el.classList.remove("show"),document.body.classList.remove("noscroll")}}]),e}(),function(){function e(t,i,s){n(this,e),this.$el=t,this.elapsed=0,this.duration=i||0,this.progress=0,this.render(),this.$progress=this.$el.querySelector(".progress-bar-progress"),this.$elapsed=this.$el.querySelector(".progress-elapsed"),this.$duration=this.$el.querySelector(".progress-duration"),this.$elapsed.innerText=this.formatTime(this.elapsed),this.$duration.innerText=this.formatTime(this.duration),s&&this.start()}return s(e,[{key:"restart",value:function(){this.reset(),this.start()}},{key:"start",value:function(){this.pause(),this.intervalId=setInterval(this.update.bind(this),50)}},{key:"update",value:function(){this.elapsed+=.05,this.elapsed>=this.duration&&this.reset(),this.progress=this.elapsed/this.duration,this.$progress.style.transform="translate("+(100*this.progress-100)+"%)",this.$elapsed.innerText=this.formatTime(this.elapsed)}},{key:"pause",value:function(){clearInterval(this.intervalId)}},{key:"reset",value:function(e){this.pause(),this.elapsed=0,this.progress=0,this.$progress.style.transform="translate(-100%)",this.$elapsed.innerText=this.formatTime(this.elapsed),e&&(this.duration=+e,this.$duration.innerText=this.formatTime(this.duration))}},{key:"render",value:function(){this.$el.innerHTML='\n          <div class="progress-time progress-elapsed"></div>\n            <div class="progress-bar">\n              <div class="progress-bar-progress"></div>\n            </div>\n          <div class="progress-time progress-duration"></div>\n        '}},{key:"formatTime",value:function(e){var t=Math.floor(e/60),i=Math.floor(e%60);return t<10&&(t="0"+t),i<10&&(i="0"+i),t+":"+i}}]),e}()),o=function(){function e(t,i){n(this,e),this.$el=t,this.$el.innerHTML='<div class="player-lyrics-lines"></div>',this.$lines=this.$el.querySelector(".player-lyrics-lines"),this.$audio=i,this.text="",this.index=0,this.lyrics=[],this.reset(this.text)}return s(e,[{key:"start",value:function(){this.pause(),this.intervalId=setInterval(this.update.bind(this),1e3)}},{key:"restart",value:function(){this.reset(),this.start()}},{key:"pause",value:function(){clearInterval(this.intervalId)}},{key:"update",value:function(){var e=this;if(this.$audio.ontimeupdate=function(t){for(var i=0,n=e.lyrics.length;i<n;i++)this.currentTime>e.getSeconds(e.lyrics[i])-.5&&(e.$lines.children[e.index].classList.remove("active"),e.$lines.children[i].classList.add("active"),e.index=i)},this.index>2){var t=-(this.index-2)*this.LINE_HEIGHT;this.$lines.style.transform="translateY("+t+"px)"}}},{key:"reset",value:function(e){this.pause(),this.index=0,this.$lines.style.transform="translateY(0)";var t=this.$lines.querySelector(".active");t&&t.classList.remove("active"),e&&(this.text=this.formatText(e)||"",this.lyrics=this.text.match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm)||[],this.lyrics.length&&this.render()),this.lyrics.length&&this.$lines.children[this.index].classList.add("active")}},{key:"getSeconds",value:function(e){return+e.replace(/^\[(\d{2}):(\d{2}\.\d{2}).*/,function(e,t,i){return 60*+t+parseFloat(+i)})}},{key:"render",value:function(){var e=this.lyrics.map(function(e){return'\n          <div class="player-lyrics-line">'+e.slice(10)+"</div>\n        "}).join("");this.$lines.innerHTML=e}},{key:"formatText",value:function(e){var t=document.createElement("div");return t.innerHTML=e,t.innerText}}]),e}();o.prototype.LINE_HEIGHT=42},function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.HotKey=void 0;var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),r=i(0);t.HotKey=function(){function e(t){n(this,e),this.el=t}return s(e,[{key:"start",value:function(){var e=this;fetch(r.HOTKEYS_URL).then(function(e){return e.json()}).then(function(t){return e.render(t.data)})}},{key:"render",value:function(e){var t=e.hotkey,i=this.shuffle(t,6).map(function(e){return'\n            <a href="#" class="tag tag-keyword">'+e.k+"</a>\n        "});this.el.innerHTML='<a href="'+e.special_url+'" class="tag tag-hot">'+e.special_key+"</a>"+i}},{key:"shuffle",value:function(e,t){for(var i=[],n=Math.min(t,e.length),s=0;s<n;s++){var r=e,a=Math.floor(Math.random()*r.length);i[s]=r[a],e.splice(a,1)}return i}}]),e}()}]);
//# sourceMappingURL=app.js.map