interface IOptions {
  el: Element;
  wrap: any;
  slides: any;
  interval: number;
  duration: number;
  index: number;
}
class Silder {
  el: any;
  wrap: any;
  duration: number;
  slides: any;
  constructor(options: IOptions) {
    this.el = options.el;
    this.wrap = options.wrap;
    this.slides = options.slides;
    this.render();
  }
  render() {
    this.el.innerHTML = `<div class="qq-slider-wrap"></div>`;
    this.wrap = this.el.firstElementChild;
    this.wrap.style.width = `${this.slides.length * 100}%`;
    this.slides.map(
     (slide:any) => `<div class="qq-slider-item">
        <a href="${slide.link}">
          <img src="${slide.image}">
        </a>
    </div>`
    );
  }
}
