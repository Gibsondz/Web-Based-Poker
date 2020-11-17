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
    data() {
        // TODO remove sample data
        return {
            user: null,
            username: 'me',
            password: '',
            email: '',
            isHost:true,
            
            host:'bob',

            gameData:{
                startingStack:3000,
                blindTimer:'15 minutes',
                startingBlinds:'15/30',
            },

            players: [{
                username: "robby"
            },
            {
                username: "dilbert"
            },
            {
                username: "bobby"
            }],
        }
    },
    async created() {
    },    
    methods:{
        async leave(){
            // TODO
        },
        async end(){
            // TODO
        },
        async start(){
            // TODO
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