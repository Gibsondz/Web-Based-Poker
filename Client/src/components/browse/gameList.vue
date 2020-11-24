<template>
<span>
<v-card class="card">
<h3>Current games</h3>
<span  v-for="game in games" v-bind:key="game.host">
    <div class="list">
    {{ game.host }}
    <v-btn primary small inline @click="joinGame(game)">Join</v-btn>
    </div>
</span>
    </v-card>

</span>
</template>
<script>
import NavBar from './navBar'
export default {
    components: {
        NavBar
    },
    data() {
        return {
            user: null,
            games: [],
        }
    },
    async created() {
        if(!this.$ws.connected) await this.$ws.connect()
        this.$ws.on('newGame', this.addGame)
        this.$ws.on('endGame', this.endGame)
        let res  = await this.$axios.post('/game/fetchGames')
        this.games = res.data
        
    },    
    methods:{
        joinGame(game){
            this.$emit("join-game", {
                id: game.id,
                host: game.host
                })
        },
        addGame({method, value}){
            
            this.games.push(value.game)
        },
        endGame({method, value}){
            for(let i = 0; i < this.games.length; i++){
                if(this.games[i].id === value.id){
                    this.games.splice(i, 1)
                }
                    
            }

        }

    }
}
</script>
<style scoped>

title {
    margin-top: 100px;
}
.list{
    padding-top: 20px;
}
.card{
    width: 20%;
    height: 100px;
    overflow-y: auto;
    float:right;
}
</style>