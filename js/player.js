export class MusicPlayer {
    constructor(el) {
        this.el = el;
        this.xx = new Progress(document.querySelector('.progress'),1000,true);
        this.el.addEventListener('click', this.handleEvent.bind(this));
        this.createAudio();
    }

    createAudio() {
        this.audio = document.createElement('audio');
        this.audio.loop = true;
    }
    handleEvent(event) {
        let target = event.target;
        console.log(target);
        switch (true) {
        case target.matches('.icon-play'):
            this.onPlay(event);
            break;
        case target.matches('.icon-pause'):
            this.onPause(event);
            break;
        case target.matches('.icon-list'):
            console.log('1')
            this.hide();
            break;
        }
    }
    /**
     * @description 显示 play 按钮
     * @param {any} event 
     * @memberof MusicPlayer
     */
    onPlay(event) {
        event.target.classList.remove('icon-play');
        event.target.classList.add('icon-pause');
    }

    /**
     * @description 显示暂停按钮
     * @param {any} event 
     * @memberof MusicPlayer
     */
    onPause(event) {
        event.target.classList.remove('icon-pause');
        event.target.classList.add('icon-play');
    }
    show() {}

    hide() {
        this.el.classList.remove('show');
    }
}

export class Progress {
    constructor(el,duration,start) {
        this.$el = el;
        this.elapsed = 300;
        this.duration = duration || 0;
        this.progress = 0;
        this.render();
        this.$progress = this.$el.querySelector('.progress-bar-progress')
        this.$elapsed = this.$el.querySelector('.progress-elapsed')
        this.$duration = this.$el.querySelector('.progress-duration')
        this.$elapsed.innerText = this.formatTime(this.elapsed)
        this.$duration.innerText = this.formatTime(this.duration)
        if (start) this.start()
    }
    start() {
        this.pause()
        this.intervalId = setInterval(this.update.bind(this), 50)
    }
    update() {
        this.elapsed += 10
        //如果当前时间大于总的持续时间的话就时间重置
        if (this.elapsed >= this.duration) this.reset()
        this.progress = this.elapsed / this.duration
        this.$progress.style.transform = `translate(${this.progress * 100 - 100}%)`
        this.$elapsed.innerText = this.formatTime(this.elapsed)
    }
    pause() {
        clearInterval(this.intervalId)
    }
    reset() {
        this.elapsed = 0;
        this.$progress.style.transform = 'translate(-100%)';
    }
    render() {
        this.$el.innerHTML = `
          <div class="progress-time progress-elapsed"></div>
            <div class="progress-bar">
              <div class="progress-bar-progress"></div>
            </div>
          <div class="progress-time progress-duration"></div>
        `
    }

    /**
     * @description 格式化时间毫秒
     * @param {any} seconds 
     * @returns 返回 05:10这种形式的时间
     * @memberof Progress
     */
    formatTime(seconds) {
        let mins = Math.floor(seconds / 60)
        let secs = Math.floor(seconds % 60)
        if (mins < 10) mins = '0' + mins
        if (secs < 10) secs = '0' + secs
        return `${mins}:${secs}`
    }
}