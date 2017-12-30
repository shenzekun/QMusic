import {searchUrl} from './helper';

export class Search {
    constructor() {
        this.input = document.querySelector('#search')
        this.songs = document.querySelector('.song-list')
        this.songsObject = {}//存放歌曲
        this.keyword = '' //输入搜索的值
        this.page = 1//默认页数为1
        this.isLoad = true //能否继续加载数据
        this.fetching = false //正在 fetch
        this.history = []
        this.delete = document.querySelector('.icon-delete')
        this.cancel = document.querySelector('.search-cancel')
        this.hotKeys = document.querySelector('#hot-keys')
        this.recordKeys = document.querySelector('.record-keys')
        this.input.addEventListener('keyup',this.onEnter.bind(this))

        window.addEventListener('scroll',this.onScroll.bind(this))
        window.addEventListener('click',this.onClick.bind(this))

        this.HISTORY_KEY = 'search_history'
        this.history = localStorage.getItem(this.HISTORY_KEY) ? localStorage.getItem(this.HISTORY_KEY).split(',') : []
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
        if (keyword) {
            this.delete.classList.remove('hide')
        } else {
            this.delete.classList.add('hide')
            return this.reset()
        }
        //如果不是 enter 直接返回
        if (event.keyCode !== 13) return
        this.recordKeys.classList.add('hide')
        this.addHistory(keyword)
        this.search(keyword)
    }

    /**
     * @description 点击事件
     * @param {any} e 
     * @memberof Search
     */
    onClick(e) {
        // console.log(e.target);
        //如果点击到了输入按钮
        if (e.target === this.input) {
            this.cancel.classList.remove('hide')
            this.hotKeys.classList.add('hide')
            this.recordKeys.classList.remove('hide')
            this.renderHistory()
            this.reset()
        }
        //如果点击到了取消按钮
        if (e.target === this.cancel) {
            this.cancel.classList.add('hide')
            this.delete.classList.add('hide')
            this.hotKeys.classList.remove('hide')
            this.recordKeys.classList.add('hide')
            this.input.value = ''
            this.reset()
        }
        //如果点击到了删除按钮
        if (e.target === this.delete) {
            this.input.value = ''
            this.delete.classList.add('hide')
            this.reset()
        }
        //如果匹配到了清除搜索记录
        if (e.target.matches('.record-delete')) {
            this.history = []
            localStorage.setItem(this.HISTORY_KEY,this.history)
            this.recordKeys.innerHTML = ''
        }
        //如果匹配到了单条记录的删除按钮
        if (e.target.matches('.icon-close')) {
            const index = this.history.indexOf(e.target.previousElementSibling.innerHTML)
            this.history.splice(index,1)
            localStorage.setItem(this.HISTORY_KEY,this.history)
            this.renderHistory()
        }
        if (e.target.matches('.tag-keyword') || e.target.matches('.record-con')) {
            console.log(e.target.innerHTML)
            this.input.value = e.target.innerHTML
            this.keyword = e.target.innerHTML
            this.delete.classList.remove('hide')
            this.cancel.classList.remove('hide')
            this.hotKeys.classList.add('hide')
            this.addHistory(this.keyword)
            this.search(this.keyword)
        }
    }

    /**
     * @description 添加历史
     * @param {any} keyword 
     * @memberof Search
     */
    addHistory(keyword) {
        // console.log('keyword： ' + keyword);
        let index = this.history.indexOf(keyword);
        if (index === -1) {
            this.history.unshift(keyword)
            localStorage.setItem(this.HISTORY_KEY,this.history)
        }
    }

    /**
     * @description 渲染历史
     * @memberof Search
     */
    renderHistory() {
        if (this.history.length > 0) {
            let historyHTML = this.history.map(item => `
                <li>
                    <a href="#" class="record-main">
                        <span class="icon icon-clock"></span>
                        <span class="record-con ellipsis">${item}</span>
                        <span class="icon icon-close"></span>
                    </a>
                </li>
            `).join('')
            historyHTML += `
                <p class="record-delete">清除搜索记录</p>
            `
            // console.log(historyHTML)
            // console.log(this.recordKeys)
            this.recordKeys.innerHTML = historyHTML
        } else if (this.history.length === 0) {
            this.recordKeys.innerHTML = ''
            this.history = []
        }
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
        fetch(searchUrl(this.keyword,page || this.page))
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