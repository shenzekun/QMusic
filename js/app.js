
import {Recommend} from './recommend.js'
import tab from './tab'
import {TopList} from './toplist.js'
import {Search} from './search'
import {MusicPlayer,Progress,LyricsPlayer} from './player';
import {HotKey} from './hotkey';

let recommend = new Recommend(document.querySelector('.rec-view')).start()

let hotkey = new HotKey(document.querySelector('.result-tags')).start()

let search = new Search().search();

let toplist = new TopList(document.querySelector('.rec-view')).start()

let player = new MusicPlayer(document.querySelector('#player'));

document.querySelector('#show_player').addEventListener('click',() => {
    player.show();
})

onHashChange();

addEventListener('hashchange',onHashChange);

function onHashChange() {
    let hash = location.hash
    if (/#player\?.+/.test(hash)) {
        let matches = hash.slice(hash.indexOf('?') + 1).match(/(\w+)=([^&]+)/g)
        let options = matches && matches.reduce((res, cur) => {
            let arr = cur.split('=')
            res[arr[0]] = decodeURIComponent(arr[1])
            return res
        },{})
        // console.log(options);
        player.play(options);
    } else {
        player.hide();
    }
}
