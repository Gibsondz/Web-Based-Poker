const Home = () => import('@/components/browse/Home.vue')
const Lobby = () => import('@/components/browse/Lobby.vue')
const WaitingRoom = () => import('@/components/browse/WaitingRoom.vue')
const AdminPage = () => import('@/components/browse/AdminPage.vue')
export default {
    path: '/',
    component: Home,

}