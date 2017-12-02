
import {Recommend} from './recommend.js'
import tab from './tab'
import {TopList} from './toplist.js'
import {Search} from './search'
import {MusicPlayer,Progress} from './player';
let x = new Recommend(document.querySelector('.rec-view')).start()

let y = new TopList(document.querySelector('.rank-view')).start()

let z = new Search().search();
let c = new MusicPlayer(document.querySelector('#player'))
