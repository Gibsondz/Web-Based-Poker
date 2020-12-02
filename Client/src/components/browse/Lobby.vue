<template>
    <v-container>
        <div class="contentLayout">
            <ul class="lobbyList"> 
                <li  v-for="lobby in lobbies" :key="lobby.id">
                    <div class="lobby">
                        {{lobby.name}}
                        <img v-if=lobby.lock src="https://banner2.cleanpng.com/20180602/vea/kisspng-computer-icons-padlock-web-typography-clip-art-schloss-5b1221d4693526.5435415715279149644309.jpg">
                        <img v-else src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlTZo8cPavYzOaxexHlMckyxBIfAtie05SlQ&usqp=CAU'>
                        Players: {{lobby.players}}
                        <button @click="tryJoin(lobby)"> Join </button>
                    </div>
                </li>
            </ul>
            <form class="createLobby">
                <h1 style="text-align:Center">Create a new Lobby </h1>
                <br>
                <label for='lobbyname'> Lobby Name: </label>
                <input v-model="name" type="text" id='lobbyname' name='lobbyname'><br>
                <br>
                <label for='lobbypass'> Lobby Password: </label>
                <input v-model="password" type="text" id='lobbypass' name='lobbypass'><br>
                <br>
                <label for='blindstime'> Blinds Timer: </label>
                <input v-model="blindTimer" type="text" id='blindstime' name='blindstime'> Minutes <br>
                <br>
                <button style="width:30%;" @click="newGame"> Create </button>
            </form>
        </div>
         <v-dialog v-model="dialog" max-width="290">
        <v-card>
            <v-card-title class="headline">
            This game has a password
            </v-card-title>
            <v-card-text>Please provide the password set by the host</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                 <v-text-field v-model="passwordToJoin"  prepend-icon="lock"  label="Password" type="password"></v-text-field>
                 <v-btn @click="joinGame" class="pa-5">Submit</v-btn>
            </v-card-actions>
      </v-card>
         </v-dialog>
         <v-btn v-if="isAdmin" class="adminButton" @click="adminPage">Admin page</v-btn>
    </v-container>
</template>
<script>
import navBar from './navBar'
import NavBar from './navBar.vue'
export default {
    components: {
        NavBar
    },
    data() {
        return {
            name: '',
            password: '',
            blindTimer: '',
            user: null,
            games: [],
            lobbies:[],
            dialog: false,
            passwordToJoin: '',
            tryingToJoinId: '',
            isAdmin: false
        }
    },
    async created() {
        if(!this.$ws.connected) await this.$ws.connect()
        this.$ws.on('newGame', this.addGame)
        this.$ws.on('endGame', this.endGame)
        let allCookies = document.cookie
        let place = allCookies.split('; ').find(row => row.startsWith('place')).split('=')[1]
        let id = allCookies.split('; ').find(row => row.startsWith('name')).split('=')[1]
        this.id = id
        let res  = await this.$axios.post('/users/getUser', {
          id: id,
        })
        this.user = res.data.user
        this.isAdmin = this.user.isAdmin

        res  = await this.$axios.post('/game/fetchGames')
        this.games = res.data
        let lock = Boolean
        for(let i = 0; i < this.games.length; i++){
            if(this.games[i]. password === ''){
                lock = false
            }else{
                lock = true
            }
            this.lobbies.push({
                    id: this.games[i].id,
                    host: this.games[i].host,
                    name: this.games[i].name,
                    lock: lock,
                    players: this.games[i].totalPlayers,
                    password: this.games[i].password,
                    blindTimer: this.games[i].blindTimer
            })
            this.$ws.on(`${this.games[i].id}/pokerLobby`, this.newPlayer)
            this.$ws.on(`${this.games[i].id}/pokerLobbyLeave`, this.kickPlayer)
        }
    
    },    
    methods:{
            joinGame(){
                let lobby = null
                for(let i = 0; i < this.lobbies.length; i++){
                    if(this.lobbies[i].id === this.tryingToJoinId){
                        lobby = this.lobbies[i]
                    }
                }
                if(lobby.password === this.passwordToJoin){
                    this.dialog = false
                    this.$emit("join-game", {
                        id: lobby.id,
                        host: lobby.host,
                        blindTimer: lobby.blindTimer

                        })
                }else{

                }
            },
            adminPage(){
                window.location.href = "/adminPage"

            },
            async addGame({method, value}){
                let lock = Boolean
                if(value.game.password === ''){
                    lock = false
                }else{
                    lock = true
                }
                this.lobbies.push({
                    id: value.game.id,
                    host: value.game.host,
                    name: value.game.name,
                    lock: lock,
                    players: value.game.totalPlayers,
                    password: value.game.password,
                    blindTimer: value.game.blindTimer
            })
            if(!this.$ws.connected) await this.$ws.connect()
            this.$ws.on(`${value.game.id}/pokerLobby`, this.newPlayer)
            this.$ws.on(`${value.game.id}/pokerLobbyLeave`, this.kickPlayer)

            },
            endGame({method, value}){
                for(let i = 0; i < this.lobbies.length; i++){
                    if(this.lobbies[i].id === value.id){
                        this.lobbies.splice(i, 1)
                    }
                        
                }

            },
            newGame(){
                this.$emit('new-game', {
                    name: this.name,
                    password: this.password,
                    blindTimer: this.blindTimer
                })
            },
            newPlayer({method, value}){
                for(let i = 0; i < this.lobbies.length; i++){
                    if(this.lobbies[i].id === value.id ){
                        this.lobbies[i].players++
                    }
                }
            },
            kickPlayer({method, value}){
                for(let i = 0; i < this.lobbies.length; i++){
                    if(this.lobbies[i].id === value.id ){
                        this.lobbies[i].players--
                    }
                }

            },
            tryJoin(lobby){
                if(lobby.password !== ''){
                    this.tryingToJoinId = lobby.id
                    this.dialog = true
                }else{
                    this.$emit("join-game", {
                        id: lobby.id,
                        host: lobby.host,
                        blindTimer: lobby.blindTimer
                    })
                }


            }

        }
    
}
    
</script>
<style scoped>
.contentLayout{
    position:relative;
    top:80px;
    width: 98vw;
    height: 90vh;
    display: flex;
    flex-direction: row;
    background-color: lightgray;
}
.lobbyList{
    width: 50%;
    font-size: 20px;
    display: grid;
    grid-template-columns: 100%;
    grid-auto-rows: 30px;
    grid-row-gap: 5px;
    border-style: solid;
    border-color: black;
    background-color: darkgray;
    list-style-type: none
}
.createLobby{
    width: 50%;
    padding: 2%;
    font-size: 40px;
}

.lobby{
    width: 100%;
    display: grid;
    grid-template-columns: 40% 20% 20% 20%;
    
}
.adminButton{
    position: absolute;
    top: 0;
    right: 0;
}
button {
    border: black;
    background-color: rgb(147, 148, 147);
    border-style: solid;
    border-width: 1px;
}

li {
    padding: 2px;;
}
input{
    background-color: white;
    width: 30%;
}

label{
    padding: 2%;
}
img{
    width: 35px;
    height: 28px;
}

title {
    margin-top: 100px;
}

</style>