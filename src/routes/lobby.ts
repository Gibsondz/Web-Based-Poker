import Component from 'vue-class-component'

const Lobby = () => import('@/components/browse/Lobby.vue')
export default {
    path: '/lobby',
    component: Lobby,

    
}
