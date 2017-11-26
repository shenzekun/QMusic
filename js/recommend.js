import { RECOMMEND_URL } from './content.js';
import { Slider } from './slider.js';
import { lazyload } from './lazyload.js';
export class Recommend {
    constructor(el) {
        this.el = el;   
    }
    /**
     * @description 开始
     * @memberof Recommend
     */
    start() {
        if ('fetch' in window) {
            fetch(RECOMMEND_URL)
                .then(res => res.json())
                .then(json => (this.json = json))
                .then(() => this.render());
        } else {
            //如果不兼容 fetch
            let xhr;
            let _this = this;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else {
                //兼容 ie6
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }
            //连接
            xhr.open('GET', RECOMMEND_URL, true);
            //发送请求
            xhr.send();

            xhr.onreadystatechange = function() {
                //读取完成
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        _this.json = JSON.parse(xhr.responseText);
                        _this.render();
                    } else {
                        console.log('失败' + xhr.status);
                    }
                }
            };
        }
    }
    /**
     * @description 渲染数据
     * @memberof Recommend
     */
    render() {
        document.querySelector('.loading').classList.add('hide');
        this.renderSlider(this.json.data.slider);
        this.renderRadios(this.json.data.radioList);
        this.renderPlayList(this.json.data.songList);
        lazyload();
    }
    /**
     * @description 渲染轮播图
     * @param {any} slides 
     * @memberof Recommend
     */
    renderSlider(slides) {
        this.slider = new Slider({
            el: this.el.querySelector('#slider'),
            slides: slides.map(slide => ({
                link: slide.linkUrl,
                image: slide.picUrl
            }))
        });
    }

    /**
     * @description 渲染电台部分
     * @param {any} radios 
     * @memberof Recommend
     */
    renderRadios(radios) {
        document.querySelector('.radios .list').innerHTML = radios.map(radio => `<div class="list-item">
                <div class="list-media">
                    <img data-src="${radio.picUrl}" class="lazyload" src="../images/default_pic.jpg">
                    <span class="icon icon_play"></span>
                </div>
                <div class="list-info">${radio.Ftitle}</div>
            </div>`).join('');
    }

    /**
     * @description 渲染推荐页的热门歌单
     * @param {any} playlists 
     * @memberof Recommend
     */
    renderPlayList(playlists) {
        document.querySelector('.playlists .list').innerHTML = playlists.map(list => `<div class="list-item">
            <a href='https://y.qq.com/w/taoge.html?ADTAG=myqq&from=myqq&channel=10007100&id=${list.id}'>
            <div class="list-media">
                <img class="lazyload" data-src="${list.picUrl}" src="../images/default_pic.jpg">
                <span class="listen_count"><span class="icon icon_listen"></span>${(list.accessnum / 10000).toFixed(1) +
                    '万'}</span>
                <span class="icon icon_play"></span>
            </div>
            <div class="list-info">
                <div class="list_tit">${list.songListDesc}</div>
                <div class="list-text"></div>
            </div>
            </a>
        </div>`).join('');
    }
}
