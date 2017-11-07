import { SEARCH_URL } from './content';

export class Search {
    constructor() {
        this.input = document.querySelector('#search')
        this.input.addEventListener('keyup',this.onEnter.bind(this))
        this.songs = document.querySelector('.song-list')
        this.songsObject = {}//存放歌曲
        this.keyword = '' //输入搜索的值
        this.page = 1//默认页数为1
        this.isLoad = true //能否继续加载数据
        this.fetching = false //正在 fetch
        window.addEventListener('scroll',this.onScroll.bind(this))
    }

    /**
     * @description enter 事件
     * @param {any} event 
     * @returns 
     * @memberof Search
     */
    onEnter(event) {
        //获取输入的值,并且去除两边的空格
        let keyword = event.target.value.trim()
        //如果为空，去除显示的歌
        if (!keyword) return this.reset()
        //如果不是 enter 直接返回
        if (event.keyCode !== 13) return
        this.search(keyword)
    }

    /**
     * @description 重置
     * @memberof Search
     */
    reset() {
        this.page = 1
        this.keyword = ''
        this.isLoad = true
        this.songsObject = {}
        this.songs.innerHTML = ''
        document.querySelector('.loading-icon').style.display = 'block'
        document.querySelector('.loading-text').style.display = 'block'
        document.querySelector('.loading-done').style.display = 'none'
        document.querySelector('.search-loading').classList.remove('show')
    }

    /**
     * @description 滚动事件
     * @param {any} e 
     * @returns 
     * @memberof Search
     */
    onScroll(e) {
        if (this.isLoad) {
            if (document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight - 100) {
                this.search(this.keyword,this.page + 1)
            }
        } else {
            return window.removeEventListener('scroll', this.onScroll.bind(this))
        }
    }

    /**
     * @description  处理搜索的 url
     * @param {any} keyword 用户输入的数据
     * @param {number} [page=1]  页数默认为1
     * @returns url
     * @memberof Search
     */
    handleSearchUrl(keyword,page = 1) {
        return `${SEARCH_URL}?keyword=${keyword}&page=${page}`
    }

    /**
     * @description 搜索
     * @param {any} keyword 用户输入的数据
     * @param {any} page 页数
     * @memberof Search
     */
    search(keyword, page) {
        //刚进来时 keyword为 undefined ，因为没有 enter
        if (keyword === undefined) keyword = ''
        if (keyword === '') return
        //如果已经搜索过，并且没有改动 keyword 那么直接返回
        if (this.keyword === keyword && this.songsObject[page || this.page]) return
        if (this.keyword !== keyword) this.reset()
        if (this.fetching || !this.isLoad) return
        this.keyword = keyword 
        this.loading()
        fetch(this.handleSearchUrl(this.keyword,page || this.page))
            .then(res => res.json())
            .then(json => {
                this.page = json.data.song.curpage
                this.songsObject[this.page] = json.data.song.list
                this.isLoad = (json.message !== 'no results')
                return json.data.song.list
            })
            .then(songs => this.append(songs))
            .then(() => this.accomplish())
            .catch(() => console.log('error'))
    }

    /**
     * @description 添加歌曲的html到页面
     * @param {any} songs 
     * @memberof Search
     */
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

    /**
    * @description 函数加载
    * @memberof Search
    */
    loading(){
        this.fetching = true
        document.querySelector('.search-loading').classList.add('show')
    }

    /**
     * @description 函数加载完成
     * @memberof Search
     */
    accomplish() {
        this.fetching = false
        if (!this.isLoad) { //如果不能加载了，就显示已加载全部
            document.querySelector('.loading-icon').style.display = 'none'
            document.querySelector('.loading-text').style.display = 'none'
            document.querySelector('.loading-done').style.display = 'block'
        } else { 
            document.querySelector('.search-loading').classList.remove('show')
        }
    }
}