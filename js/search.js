import { SEARCH_URL } from './content';

export class Search {
    constructor() {
        this.input = document.querySelector('#search')
        this.input.addEventListener('keyup',this.onEnter.bind(this))
        this.songs = document.querySelector('.song-list')
        this.keyword = '' //输入搜索的值
        this.page = 1//默认页数为1
        this.isLoad = true
        this.fetching = false 
        window.addEventListener('scroll',this.onScroll.bind(this))
    }
    onEnter(event) {
        //获取输入的值,并且去除两边的空格
        this.keyword = event.target.value.trim()
        //如果为空，去除显示的歌
        if (!this.keyword) return this.reset()
        //如果不是 enter 直接返回
        if (event.keyCode !== 13) return
        this.search(this.keyword)
    }
    //重置
    reset() {
        this.page = 1
        this.keyword = ''
        this.isLoad = true
        this.songs.innerHTML = ''
    }
    onScroll(e) {
        if (this.isLoad) {
            if (document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight - 100) {
                this.search(this.keyword,this.page + 1)
            }
        } else {
            return window.removeEventListener('scroll', this.onScroll.bind(this))
        }
    }
    handleSearchUrl(keyword,page = 1) {
        return `${SEARCH_URL}?keyword=${keyword}&page=${page}`
    }
    search(keyword, page) {
        if (this.keyword === '') return
        if (this.fetching || !this.isLoad) return
        if (this.keyword !== keyword) {
            this.reset()
            this.keyword = keyword
        }
        this.keyword = keyword
        this.loading()
        fetch(this.handleSearchUrl(this.keyword,page || this.page))
            .then(res => res.json())
            .then(json => {
                this.page = json.data.song.curpage
                this.isLoad = (json.message !== 'no results')
                return json.data.song.list
            })
            .then(songs => this.append(songs))
            .then(() => this.accomplish())
            .catch(() => console.log('error'))
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
        this.songs.insertAdjacentHTML('beforeend', html)
    }
    loading(){
        this.fetching = true
        document.querySelector('.search-loading').classList.add('show')
    }
    accomplish() {
        this.fetching = false
        if (!this.isLoad) { 
            document.querySelector('.loading-icon').style.display = 'none'
            document.querySelector('.loading-text').style.display = 'none'
            document.querySelector('.loading-done').style.display = 'block'
        } else { 
            document.querySelector('.search-loading').classList.remove('show')
        }
    }
}