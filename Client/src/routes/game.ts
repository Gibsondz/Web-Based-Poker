import Component from 'vue-class-component'

const Game = () => import('@/components/browse/Game.vue')
export default {
    path: '/game',
    component: Game,

    
}
