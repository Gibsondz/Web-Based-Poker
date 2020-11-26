<template>
<div>
<nav-bar @account="Account()" @lobby="Lobby()"  ></nav-bar>
    <div style = "position:relative; top:80px;">
        <lobby @new-game="newGame" @join-game="join" v-if="showLobby"></lobby>
        <account v-if="showAccount"></account>
        <waiting-room v-if="showNewGame" :blindTimer="blindTimer" :name="name" :password="password" :isHost="isHost" :pokerGameId="gameId" :pokerGameHost="host" @game-ended="Lobby"></waiting-room>
    </div>
</div>
</template>
<script>
import NavBar from './navBar'
import Lobby from './Lobby'
import Account from './Account'
import WaitingRoom from './WaitingRoom'
export default {
    components: {
        NavBar,
        Lobby,
        Account,
        WaitingRoom
    },
    data() {
        return {
            blindTimer: 0,
            name: '',
            password: '',
            user: null,
            showLobby: true,
            showAccount: false,
            showNewGame: false,
            isHost: true,
            gameId: '',
            host: ''
        }
    },
    async created() {
        try{
            let allCookies = document.cookie
            let tab = allCookies.split('; ').find(row => row.startsWith('tab')).split('=')[1]
            if(tab === 'lobby'){
                this.Lobby()
            }else if(tab === 'Account'){
                this.Account()
            }else if(tab === 'hostGame'){
                this.newGame()
            }else if(tab === 'inGame'){
                this.join()
            }

        }catch(err){
            console.log(err)
            document.cookie = 'tab=lobby'
        }
    },    
    methods:{
        Account(){
            this.showAccount = true
            this.showLobby = false
            this.showNewGame = false
            document.cookie = 'tab=Account'
        },
        Lobby(){
            this.showAccount = false
            this.showLobby = true
            this.showNewGame = false
            document.cookie = 'tab=lobby'
        },
        newGame(event){
            if(event){
                this.password = event.password
                this.name = event.name 
                this.blindTimer = Number(event.blindTimer) 
                document.cookie = `timer=${this.blindTimer}`
            }
            document.cookie = 'tab=hostGame'
            this.showAccount = false
            this.showLobby = false
            this.showNewGame = true
            this.isHost = true
            
        },
        join(event){
            document.cookie = 'tab=inGame'
            if(event){
                this.gameId = event.id
                this.host = event.host
                this.blindTimer = event.blindTimer
                document.cookie = `gameId=${event.id}`
                document.cookie = `host=${event.host}`
                document.cookie = `timer=${this.blindTimer}`
            }else{ 
            let allCookies = document.cookie
             this.gameId = allCookies.split('; ').find(row => row.startsWith('gameId')).split('=')[1]
             this.host = allCookies.split('; ').find(row => row.startsWith('host')).split('=')[1]

            }
            this.isHost = false
            this.showAccount = false
            this.showLobby = false
            this.showNewGame = true
            

        }

    }
}
</script>
<style scoped>

title {
    margin-top: 100px;
}
</style>