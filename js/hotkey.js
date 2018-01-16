import { HOTKEYS_URL } from './content';

export class HotKey {
    constructor(el) {
        this.el = el;
    }
    start() {
        fetch(HOTKEYS_URL)
            .then(res => res.json())
            .then(json => this.render(json.data));
    }
    /**
     * @description 渲染数据
     * @param {any} data
     * @memberof HotKey
     */
    render(data) {
        let keys = data.hotkey;
        let hotKeys = this.shuffle(keys, 6).map(
            hotkey => `
            <a href="#" class="tag tag-keyword">${hotkey.k}</a>
        `
        );
        // console.log(hotkeys);
        this.el.innerHTML =
            `<a href="${data.special_url}" class="tag tag-hot">${data.special_key}</a>` + hotKeys;
    }
    /**
     * @description 洗牌
     * @param {any} array
     * @param {any} count
     * @returns array
     * @memberof HotKey
     */
    shuffle(array, count) {
        let arr = [];
        let len = Math.min(count, array.length);
        for (let i = 0; i < len; i++) {
            let temp = array;
            let random = Math.floor(Math.random() * temp.length);
            arr[i] = temp[random];
            array.splice(random, 1);
        }
        return arr;
    }
}
