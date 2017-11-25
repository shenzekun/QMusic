import { TOPLIST_URL } from './content';
import { lazyload } from './lazyload.js';
export class TopList {
    constructor(el) {
        this.el = el;
    }
    /**
     * @description 开始
     * @memberof TopList
     */
    start() {
        if ('fetch' in window) {
            fetch(TOPLIST_URL)
                .then(res => res.json())
                .then(json => (this.list = json.data.topList))
                .then(() => this.render());
        } else {
            let xhr
            let _this = this
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest()
            } else {
                xhr = new ActiveXObject('Microsoft.XMLHTTP')
            }
            xhr.open('GET',TOPLIST_URL,true)
            xhr.send()
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        _this.json = JSON.parse(xhr.responseText)
                        _this.render()
                    } else {
                        console.log('失败' + xhr.status)
                    }
                }
            }
        }
    }

    /**
     * @description 渲染
     * @memberof TopList
     */
    render() {
        document.querySelector('.toplist').innerHTML = this.list.map(item => `<li class="top-item">
        <div class="top-item-media">
          <a href='https://y.qq.com/w/toplist.html?ADTAG=myqq&from=myqq&channel=10007100&id=${item.id}&type=top'>
            <img class="lazyload" data-src="${item.picUrl.replace('http://', 'https://')}">
            <span class="listen_count"><i class="icon icon-listen"></i>${(item.listenCount / 10000).toFixed(1) + '万'}</span>
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

    /**
     * @description 获取歌
     * @param {any} songs 返回字符串
     * @returns 
     * @memberof TopList
     */
    songlist(songs) {
        return songs.map((song,i) => `<li class="top-item-song">
        <i class="song-index">${i + 1}</i>
        <span class="song-name">${song.songname}</span>- ${song.singername}
      </li>`).join('')
    }
}
