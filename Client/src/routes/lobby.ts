import Component from 'vue-class-component'

const Lobby = () => import('@/components/browse/lobbyPage.vue')
export default {
    path: '/lobby',
    component: Lobby,

    
}
