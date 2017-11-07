import { SEARCH_URL } from './content';

export class Search {
    constructor() {
        this.input = document.querySelector('#search')
        this.input.addEventListener('keyup',this.onEnter.bind(this))
        this.songs = document.querySelector('.song-list')
        this.keyword = '' //输入搜索的值
        this.page = 1;//默认页数为1
    }

    onEnter() {
        //获取值
        let keyword = event.target.value.trim()
        // if (!keyword) return this.reset()
        //如果不是 enter 直接返回
        if (event.keyCode !== 13) return
        this.search(keyword)
    }
    handleSearchUrl(keyword,page = 1) {
        return `${SEARCH_URL}?keyword=${keyword}&page=${page}`
    }
    search(keyword, page) {
        fetch(this.handleSearchUrl(keyword))
            .then(res => res.json())
            .then(json => {
                return json.data.song.list
            })
            .then(songs => this.append(songs))
    }

    append(songs) {
        let html = songs.map(song => {
            let artist = song.singer.map(s => s.name).join('')
            return `<a class="song-item"
               href="#player?artist=${artist}&songid=${song.songid}&songname=${song.songname}&albummid=${song.albummid}&duration=${song.interval}">
              <i class="icon icon-music"></i>
              <div class="song-name">${song.songname}</div>
              <div class="song-artist">${artist}</div>
            </a>`
        }).join('')
        console.log(html)
        this.songs.insertAdjacentHTML('beforeend', html)
    }
}