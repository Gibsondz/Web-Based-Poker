import Vue from 'vue'
import Router from 'vue-router'
import Browse from './browse'
import Lobby from './lobby'
import WaitingRoom from './waitingRoom'
Vue.use(Router)
const router = new Router({
    mode: 'history',
    routes: [
        Browse,
        Lobby,
        WaitingRoom,
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