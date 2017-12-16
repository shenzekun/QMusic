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
        console.log(audio.id)
        audio.addEventListener('ended',() => {
            this.audio.play();
            this.lyrics.restart();
            this.progress.restart();
        })
        document.body.appendChild(audio);
        return audio;
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
        if (this.fetching) return
        this.audio.play()
        this.lyrics.start()
        this.progress.start()
        event.target.classList.remove('icon-play');
        event.target.classList.add('icon-pause');
    }


    play(options = {}) {
        if (!options) return 0;
        this.el.querySelector('.song-name').innerText = options.songname;
        this.el.querySelector('.song-artist').innerText = options.artist;
        this.progress.reset(options.duration);
        
        let coverUrl = albumCoverUrl(options.albummid);
        this.el.querySelector('.album-cover').src = coverUrl;
        this.el.querySelector('.player-background').style.backgroundImage = `url(${coverUrl})`;

        if (options.songid) {
            if (this.songid !== options.songid) {
                this.el.querySelector('.icon-action').className = 'icon-action icon-play';
            }

            this.songid = options.songid;
            this.audio.src = songUrl(this.songid);
            this.fetching = true;
            fetch(lyricsUrl(this.songid)).then(res => res.json())
                .then(res => res.json())
                .then(json => console.log(json.lyrics))
                .then(text => this.lyrics.reset(text))
                .catch(() => {})
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
    show() {
        this.el.classList.add('show');
        document.body.classList.add('noscroll')
    }

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
        this.text = ''
        this.index = 0
        this.lyrics = [] //歌词数组
        this.elapsed = 0
        this.reset(this.text)
    }
    start() {
        this.pause()
        this.intervalId = setInterval(this.update.bind(this), 1000)
    }
    pause() {
        clearInterval(this.intervalId)
    }
   
    reset(text) {
        if (text) {
            this.text = this.formatText(text) || '';
            this.lyrics = this.text.match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm) || []
        }
    }

    formatText(text) {
        let div = document.createElement('div')
        div.innerHTML = text
        return div.innerText
    }
}

LyricsPlayer.prototype.LINE_HEIGHT = 42