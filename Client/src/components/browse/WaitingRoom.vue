<template>
    <v-container class="container">
        <h1 class="center">
            {{ host }}'s Lobby
        </h1>
        <div class="playerList">
            <div class="hostPlayer">
                <h3> {{ host }} (host) </h3>
            </div>
            <div class="player" v-for="player in players" v-bind:key="player.username">
                <h3> {{ player.username }} </h3>
                <v-btn class="kickButton" primary small inline @click="kickPlayer(player.username)">Kick</v-btn>
            </div>
        </div>
        <div>
            <div class='gameData'>
                <p>Starting Stack: {{gameData.startingStack}}</p>
                <p>Blind Timer: {{gameData.blindTimer}}</p>
                <p>Starting Blinds: {{gameData.startingBlinds}}</p>
            </div>
            <div class='gameButtons' v-if="!isHost">
                <v-btn class="leaveButton" primary large inline @click="leave">Leave</v-btn>
            </div>
            <div class='gameButtons' v-if="isHost">
                <v-btn class="endButton" primary large inline @click="end">End</v-btn>
                <v-btn class="startButton" primary large inline @click="start">Start</v-btn>
            </div>
        </div>
    </v-container>
</template>
<script>
export default {
    components: {
    },
    props: {
        isHost: Boolean,
        pokerGameId: String,
        pokerGameHost: String,
        blindTimer: Number,
        name: String,
        password: String,
    },
    data() {
        // TODO remove sample data
        return {
            user: null, 
            gameId: '',
            host:'',

            gameData:{
                startingStack:3000,
                blindTimer: this.blindTimer,
                startingBlinds:'15/30',
            },

            players: [],
        }
    },
    async created() {
        let allCookies = document.cookie
        let place = allCookies.split('; ').find(row => row.startsWith('place')).split('=')[1]
        let id = allCookies.split('; ').find(row => row.startsWith('name')).split('=')[1]
        this.id = id
        let res  = await this.$axios.post('/users/getUser', {
        id: id,
        })
        
        this.user = res.data.user
        console.log(this.isHost)
        if(this.isHost){
            res  = await this.$axios.post('/game/openLobby', {
                    stackSize: this.gameData.startingStack,
                    blindTimer: this.blindTimer,
                    username: this.user.username,
                    password: this.password || '',
                    name: this.name || ''
                })
                this.host = this.user.username
                this.gameId = res.data.gameId
                document.cookie = `gameId=${this.gameId}`
                if(res.data.message){
                    let res  = await this.$axios.post('/game/fetchPlayers', {
                        gameId: this.gameId
                    })
                    let allCookies = document.cookie
                    let timer = allCookies.split('; ').find(row => row.startsWith('timer')).split('=')[1]
                    this.gameData.blindTimer = Number(timer)

                    let players = res.data
                    for(let i = 0; i < players.length; i++){
                        if(players[i].name !== this.host){
                            this.players.push({username: players[i].name})
                        }
                    }
                }

        }else{
                this.gameId = this.pokerGameId
                this.host = this.pokerGameHost
                 let res  = await this.$axios.post('/game/fetchPlayers', {
                        gameId: this.gameId
                    })
                let players = res.data
            if(!players.find(me => me.name === this.user.username)){
                let res  = await this.$axios.post('/game/newPlayer', {
                        username: this.user.username,
                        gameId: this.gameId
                    })
                this.players.push({username: this.user.username})
                    
            }
             let timer = allCookies.split('; ').find(row => row.startsWith('timer')).split('=')[1]
            this.gameData.blindTimer = Number(timer)
            for(let i = 0; i < players.length; i++){
                    if(players[i].name !== this.host){
                        this.players.push({username: players[i].name})
                    }
                }

        }
        if(!this.$ws.connected) await this.$ws.connect()
        this.$ws.on(`${this.gameId}/pokerLobby`, this.addPlayer)
        this.$ws.on(`${this.gameId}/pokerLobbyLeave`, this.leave)
        this.$ws.on(`${this.gameId}/pokerLobbyStart`, this.start)


    }, 
    async destroyed() {
        if(this.isHost){
            await this.$axios.post('/game/closeLobby', {
                gameId: this.gameId
            })
        }else{
             await this.$axios.post('/game/kickPlayer', {
                gameId: this.gameId,
                username: this.user.username
            })

        }

    }, 
      
    methods:{
        async addPlayer({method, value}){
            console.log(value)
            this.players.push(value)
        },
        async leave({method, value}){
            for(let i = 0; i < this.players.length; i++){
                if(this.players[i].username === value.username){
                    this.players.splice(i, 1)
                }
                
            }
        },
        async someMethod(e){
        if(this.isHost){
            await this.$axios.post('/game/closeLobby', {
                gameId: this.gameId
            })
        }else{
             await this.$axios.post('/game/kickPlayer', {
                gameId: this.gameId,
                username: this.user.username
            })

        }
        return
        

        },
        async end(){
            //TODO
        },
        async start(){
            if(this.isHost)
            {
                await this.$axios.post('/game/start', {
                    gameId: this.gameId,
                }) 
            }
            if(this.players.length+1 >= 2 && this.players.length+1 <= 9)
            {
               window.location.href = "/game"; 
            }
        },
        async kickPlayer(username){
            // TODO
        }
    }
}
</script>
<style scoped>
.container{
    width: 700px;
}
.playerList{
    padding-top: 30px;
    padding-bottom: 30px;
}
.player{
    border-color: black;
    border-style: solid;
    border-radius: 10px;
    background: lightgray;
    width: 200px;
    display: inline-block;
    margin: 10px;
}
.player h3{
    padding: 20px;
    display: inline-block;
}
.player .kickButton{
    /* display: inline-block; */
    float: right;
}
.hostPlayer{
    border-color: black;
    border-style: solid;
    border-radius: 10px;
    background: lightblue;
    width: 200px;
    display: inline-block;
    margin: 10px;
}
.hostPlayer h3{
    padding: 20px;
    display: inline-block;
}

.gameData {
    display: inline-block;
}
.gameButtons{
    display: inline;
}

.leaveButton{
    float: right;
}
.endButton{
    float: right;
}
.startButton{
    float: right;
}
</style>