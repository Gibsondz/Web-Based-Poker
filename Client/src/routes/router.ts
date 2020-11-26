import Vue from 'vue'
import Router from 'vue-router'
import Browse from './browse'
import Lobby from './lobby'
import WaitingRoom from './waitingRoom'
import Game from './game'
Vue.use(Router)
const router = new Router({
    mode: 'history',
    routes: [
        Browse,
        Lobby,
        WaitingRoom,
        Game,
        {
            path: '*',
            redirect: ({ path, query }) => {
                const to = path.substr(path.lastIndexOf('/') + 1, path.length)
                return { path: `app/${to}`, query }
            }
        }
    ]
})
export default router