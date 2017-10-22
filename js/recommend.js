import { RECOMMEND_URL } from "./content.js";
import { Slider } from "./slider.js";

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
    }
  }

  render() {
    this.renderSlider(this.json.data.slider);
    this.renderRadios(this.json.data.radioList);
    this.renderPlayList(this.json.data.songList);
    //lazyload();
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
      .map(radio =>
          ` <div class="list-item">
                <div class="list-media">
                    <img src="${radio.picUrl}" alt="">
                    <span class="icon icon_play"></span>
                </div>
                <div class="list-info">${radio.Ftitle}</div>
            </div>`
      ).join('');
  }
  renderPlayList(playlists) {
    document.querySelector(".playlists .list").innerHTML = playlists.map(
      list =>
        `<div class="list-item">
            <div class="list-media">
                <img src="${list.picUrl}" alt="">
                <span class="icon icon_play"></span>
            </div>
            <div class="list-info">
                <div class="list_tit">${list.songListDesc}</div>
                <div class="list-text"></div>
            </div>
        </div>`
    ).join('');
  }
}
