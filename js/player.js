import {
    songUrl,
    lyricsUrl,
    albumCoverUrl
} from './helper.js'

/**
 * @description 音乐播放器界面
 * @export
 * @class MusicPlayer
 */
export class MusicPlayer {
    constructor(el) {
        this.el = el;
        this.el.addEventListener('click', this.handleEvent.bind(this));
        this.audio = this.createAudio();
        this.lyrics = new LyricsPlayer(this.el.querySelector('.player-lyrics'), this.audio)
        this.progress = new Progress(this.el.querySelector('.progress'))
        this.fetching = false;
    }
    /**
     * @description 创建 audio
     * @returns HTMLAudioElement
     * @memberof MusicPlayer
     */
    createAudio() {
        let audio = document.createElement('audio');
        audio.id = `player-${Math.floor(Math.random() * 100)}-${+new Date()}`;
        // console.log(audio.id)
        //播放结束的时候
        audio.addEventListener('ended', () => {
            this.audio.play();
            this.lyrics.restart();
            this.progress.restart();
        })
        document.body.appendChild(audio);
        return audio;
    }
    /**
     * @description 处理事件
     * @param {any} event 
     * @memberof MusicPlayer
     */
    handleEvent(event) {
        let target = event.target;
        // console.log(target);
        switch (true) {
        case target.matches('.icon-play'):
            this.onPlay(event);
            break;
        case target.matches('.icon-pause'):
            this.onPause(event);
            break;
        case target.matches('.icon-list'):
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
        //如果正在 fetching 返回
        if (this.fetching) return
        this.audio.play()
        this.lyrics.start()
        this.progress.start()
        event.target.classList.remove('icon-play');
        event.target.classList.add('icon-pause');
    }

    /**
     * @description 播放
     * @param {any} [options={}] 
     * @returns 
     * @memberof MusicPlayer
     */
    play(options = {}) {
        if (!options) return 0;
        this.el.querySelector('.song-name').innerText = options.songname;
        this.el.querySelector('.song-artist').innerText = options.artist;
        this.progress.reset(options.duration);

        //设置背景图和头像
        let coverUrl = albumCoverUrl(options.albummid);
        this.el.querySelector('.album-cover').src = coverUrl;
        this.el.querySelector('.player-background').style.backgroundImage = `url(${coverUrl})`;

        if (options.songid) {
            if (this.songid !== options.songid) {
                this.el.querySelector('.icon-action').className = 'icon-action icon-play';
            }

            this.songmid = options.songmid;
            console.log(this.songmid);
            this.songid = options.songid;
            this.audio.src = songUrl(this.songmid);
            this.fetching = true;
            fetch(lyricsUrl(this.songid))
                .then(res => res.json())
                .then(json => json.lyric)
                .then(text => this.lyrics.reset(text))
                .catch((err) => alert(err))
                .then(() => {
                    this.fetching = false;
                })
        }
        this.show()
    }
    /**
     * @description 显示暂停按钮
     * @param {any} event 
     * @memberof MusicPlayer
     */
    onPause(event) {
        this.audio.pause()
        this.lyrics.pause()
        this.progress.pause()
        event.target.classList.remove('icon-pause');
        event.target.classList.add('icon-play');
    }
    /**
     * @description 显示播放器
     * @memberof MusicPlayer
     */
    show() {
        this.el.classList.add('show');
        document.body.classList.add('noscroll')
    }
    /**
     * @description 隐藏播放器
     * @memberof MusicPlayer
     */
    hide() {
        this.el.classList.remove('show');
        document.body.classList.remove('noscroll')
    }
}

/**
 * @description 进度条
 * @export
 * @class Progress
 */
class Progress {
    constructor(el, duration, start) {
        this.$el = el;
        this.elapsed = 0; //当前时间
        this.duration = duration || 0; //持续时间
        this.progress = 0; //进度条
        this.render();
        this.$progress = this.$el.querySelector('.progress-bar-progress')
        this.$elapsed = this.$el.querySelector('.progress-elapsed')
        this.$duration = this.$el.querySelector('.progress-duration')
        this.$elapsed.innerText = this.formatTime(this.elapsed)
        this.$duration.innerText = this.formatTime(this.duration)
        if (start) this.start()
    }
    /**
     * @description 重新开始
     * @memberof Progress
     */
    restart() {
        this.reset();
        this.start();
    }
    /**
     * @description 开始
     * @memberof Progress
     */
    start() {
        this.pause()
        this.intervalId = setInterval(this.update.bind(this), 50)
    }
    /**
     * @description 更新时间
     * @memberof Progress
     */
    update() {
        this.elapsed += 0.05
        //如果当前时间大于总的持续时间的话就时间重置
        if (this.elapsed >= this.duration) this.reset()
        this.progress = this.elapsed / this.duration
        this.$progress.style.transform = `translate(${this.progress * 100 - 100}%)`
        this.$elapsed.innerText = this.formatTime(this.elapsed)
    }
    /**
     * @description 清除计时器
     * @memberof Progress
     */
    pause() {
        clearInterval(this.intervalId)
    }
    /**
     * @description 重置
     * @param {any} duration 
     * @memberof Progress
     */
    reset(duration) {
        this.pause()
        this.elapsed = 0
        this.progress = 0
        this.$progress.style.transform = 'translate(-100%)';
        this.$elapsed.innerText = this.formatTime(this.elapsed);
        if (duration) {
            this.duration = +duration
            this.$duration.innerText = this.formatTime(this.duration)
        }
    }
    /**
     * @description 渲染
     * @memberof Progress
     */
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

/**
 * @description 歌词
 * @export
 * @class LyricsPlayer
 */
class LyricsPlayer {
    constructor(el, audio) {
        this.$el = el
        this.$el.innerHTML = '<div class="player-lyrics-lines"></div>'
        this.$lines = this.$el.querySelector('.player-lyrics-lines')
        this.$audio = audio
        this.text = '' //歌词文本
        this.index = 0 //页数
        this.lyrics = [] //歌词数组
        this.reset(this.text)
    }
    start() {
        this.pause()
        this.intervalId = setInterval(this.update.bind(this), 1000);
    }
    /**
     * @description 重新开始
     * @memberof LyricsPlayer
     */
    restart() {
        this.reset()
        this.start()
    }
    pause() {
        clearInterval(this.intervalId)
    }
    /**
     * @description 更新歌词
     * @memberof LyricsPlayer
     */
    update() {
        let _this = this;
        this.$audio.ontimeupdate = function (e) {
            for (let i = 0, l = _this.lyrics.length; i < l; i++) {
                // console.log(this.currentTime,_this.getSeconds(_this.lyrics[i]));
                if (this.currentTime /*当前播放的时间*/ > _this.getSeconds(_this.lyrics[i]) - 0.50) {
                    //显示到页面
                    _this.$lines.children[_this.index].classList.remove('active');
                    _this.$lines.children[i].classList.add('active');
                    _this.index = i;
                }
            }
        }
        //如果歌词页数大于2的话，歌词向上翻
        if (this.index > 2) {
            let y = -(this.index - 2) * this.LINE_HEIGHT;
            this.$lines.style.transform = `translateY(${y}px)`
        }
    }
    /**
     * @description 重置
     * @param {any} text 
     * @memberof LyricsPlayer
     */
    reset(text) {
        this.pause();
        this.index = 0;
        this.$lines.style.transform = `translateY(0)`;
        let $active = this.$lines.querySelector('.active');
        if ($active) {
            $active.classList.remove('active')
        }
        if (text) {
            this.text = this.formatText(text) || '';
            this.lyrics = this.text.match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm) || [];
            //如果 lyrics 数组有长度
            if (this.lyrics.length) this.render();
        }

        if (this.lyrics.length) {
            this.$lines.children[this.index].classList.add('active')
        }
    }
    //获取秒数
    getSeconds(line) {
        return +line.replace(/^\[(\d{2}):(\d{2}\.\d{2}).*/, (match, p1, p2) => (+p1) * 60 + parseFloat(+p2));
    }
    /**
     * @description 渲染
     * @memberof LyricsPlayer
     */
    render() {
        let html = this.lyrics.map(line => `
          <div class="player-lyrics-line">${line.slice(10)}</div>
        `).join('')
        this.$lines.innerHTML = html
    }
    /**
     * @description 格式化文本 类似⬇️
     * [xx:xx.xx]xxxxx
     * [xx:xx.xx]xxxxx
     * [xx:xx.xx]xxxxx
     * @param {any} text 
     * @returns 
     * @memberof LyricsPlayer
     */
    formatText(text) {
        let div = document.createElement('div')
        div.innerHTML = text
        return div.innerText
    }
}

LyricsPlayer.prototype.LINE_HEIGHT = 42