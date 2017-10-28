import { RECOMMEND_URL } from "./content.js";
import { Slider } from "./slider.js";
import { lazyload } from "./lazyload.js";
export class Recommend {
  constructor(el) {
    this.el = el;
  }
  start() {
    if ("fetch" in window) {
      fetch(RECOMMEND_URL)
        .then(res => res.json())
        .then(json => (this.json = json))
        .then(() => this.render());
    } else {
      let xhr;
      let _this = this;
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else {
        //兼容 ie6
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
      //连接
      xhr.open("GET", RECOMMEND_URL, true);
      //发送请求
      xhr.send();

      xhr.onreadystatechange = function() {
        //读取完成
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            _this.json = JSON.parse(xhr.responseText);
            _this.render();
          } else {
            console.log("失败" + xhr.status);
          }
        }
      };
    }
  }

  render() {
    console.log(document.querySelector(".loading").classList);
    document.querySelector(".loading").classList.add("hide");
    this.renderSlider(this.json.data.slider);
    this.renderRadios(this.json.data.radioList);
    this.renderPlayList(this.json.data.songList);
    lazyload();
  }

  renderSlider(slides) {
    this.slider = new Slider({
      el: this.el.querySelector("#slider"),
      slides: slides.map(slide => ({
        link: slide.linkUrl,
        image: slide.picUrl
      }))
    });
  }
  renderRadios(radios) {
    document.querySelector(".radios .list").innerHTML = radios
      .map(
        radio =>
          ` <div class="list-item">
                <div class="list-media">
                    <img data-src="${radio.picUrl}" class="lazyload">
                    <span class="icon icon_play"></span>
                </div>
                <div class="list-info">${radio.Ftitle}</div>
            </div>`
      )
      .join("");
  }
  renderPlayList(playlists) {
    document.querySelector(".playlists .list").innerHTML = playlists
      .map(
        list =>
          `<div class="list-item">
            <div class="list-media">
                <img class="lazyload" data-src="${list.picUrl}">
                <span class="icon icon_play"></span>
            </div>
            <div class="list-info">
                <div class="list_tit">${list.songListDesc}</div>
                <div class="list-text"></div>
            </div>
        </div>`
      )
      .join("");
  }
}
