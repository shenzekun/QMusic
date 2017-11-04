
import {Recommend} from './recommend.js'
import tab from './tab'
import {TopList} from './toplist.js'

var x = new Recommend(document.querySelector('.rec-view')).start()

let y = new TopList(document.querySelector('.rank-view')).start()