export class Slider {
    constructor(options = {}) {
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

    /**
     * @description 渲染
     * @memberof Slider
     */
    render() {
        this.el.innerHTML = `<div class="qq-slider-wrap"></div>
        <p class="ui-slider-dots">
        <b class="active"></b>
        <b class=""></b>
        <b class=""></b>
        <b class=""></b>
        <b class=""></b>
        </p>`;
        this.dots = document.querySelector('.ui-slider-dots');
        this.wrap = this.el.firstElementChild;
        this.wrap.style.width = `${this.slides.length * 100}%`;
        this.wrap.innerHTML = this.slides.map(slide => `<div class="qq-slider-item">
          <a href="${slide.link}">
            <img src="${slide.image}">
          </a>
      </div>`).join('');
    }
    
    /**
     * @description 自动播放
     * @memberof Slider
     */
    autoPlay() {
        this.timer = setInterval(this.next.bind(this), this.interval);
    }
    
    /**
     * @description 开始播放
     * @memberof Slider
     */
    start() {
        this.autoPlay();
    }
    
    /**
     * @description 下一张
     * @returns 
     * @memberof Slider
     */
    next() {
        this.index += 1;
        if (this.index % this.slides.length === 0) {
            this.wrap.style.transform = `translate(0)`;
            this.index = 0;
            this.setActiveDot();
            return;
        }
        this.wrap.style.transform = `translate(-${this.index * 100 / this.slides.length}%)`;
        this.setActiveDot();
    }

    /**
     * @description 上一张
     * @returns 
     * @memberof Slider
     */
    pre() {
        if (this.index - 1 < 0) {
            this.index = this.slides.length + this.index - 1;
        } else {
            this.index -= 1;
        }
        if (this.index % this.slides.length === 0) {
            this.wrap.style.transform = `translate(0)`;
            this.index = 0;
            this.setActiveDot();
            return;
        }
        this.wrap.style.transform = `translate(-${((this.slides.length + this.index) % this.slides.length) *
            100 /
            this.slides.length}%)`;
        this.setActiveDot();
    }
    /**
     * @description 设置激活的小点
     * @memberof Slider
     */
    setActiveDot() {
        let len = this.dots.children.length;
        for (let i = 0; i < len; i++) {
            let b = document.getElementsByTagName('b')[i];
            b.classList.remove('active');
            if (this.index === i) {
                b.classList.add('active');
            }
        }
    }

    /**
     * @description 绑定事件
     * @memberof Slider
     */
    bindEvent() {
        this.wrap.addEventListener('touchstart', this.touchstart.bind(this));
        this.wrap.addEventListener('touchend', this.touchend.bind(this));
    }
    /**
     * @description touchstart事件
     * @param {any} e 
     * @memberof Slider
     */
    touchstart(e) {
        if (this.ready_moved) {
            let touch = e.targetTouches[0];
            this.touchX = touch.clientX;
            this.ready_moved = false;
        }
    }

    /**
     * @description touchend事件
     * @param {any} e 
     * @memberof Slider
     */
    touchend(e) {
        let touchX = this.touchX;
        let _this = this;
        if (!_this.ready_moved) {
            let release = e.changedTouches[0];
            let releasedAt = release.clientX;
            let diff = releasedAt - _this.touchX;
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
}
