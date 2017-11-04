import { TOPLIST_URL } from './content';
import { lazyload } from './lazyload.js';
export class TopList {
    constructor(el) {
        this.el = el;
    }
    start() {
        if ('fetch' in window) {
            fetch(TOPLIST_URL)
                .then(res => res.json())
                .then(json => (this.list = json.data.topList))
                .then(() => this.render());
        }
    }
    render() {
        document.querySelector('.toplist').innerHTML = this.list.map(item => `<li class="top-item">
        <div class="top-item-media">
          <a href='https://y.qq.com/w/toplist.html?ADTAG=myqq&from=myqq&channel=10007100&id=${item.id}&type=top'>
            <img class="lazyload" data-src="${item.picUrl.replace('http://', 'https://')}">
          </a>
        </div>
        <a href='https://y.qq.com/w/toplist.html?ADTAG=myqq&from=myqq&channel=10007100&id=${item.id}&type=top'>
            <div class="top-item-info">
            <h3 class="top-item-title ellipsis">${item.topTitle}</h3>
            <ul class="top-item-list">${this.songlist(item.songList)}</ul>
            </div>
        </a>
      </li>`).join('');
        lazyload(this.el.querySelectorAll('.lazyload'));
    }

    songlist(songs) {
        return songs.map((song,i) => `<li class="top-item-song">
        <i class="song-index">${i + 1}</i>
        <span class="song-name">${song.songname}</span>- ${song.singername}
      </li>`).join('')
    }
}
