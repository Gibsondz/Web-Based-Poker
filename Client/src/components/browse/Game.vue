<template>
    <v-container class="container">
        <div>
            <div class='center'>
                {{this.gameRendering}}
            </div>
            <div class='gameButtons' v-if="isActivePlayer && isBetOut">
                <v-text-field v-model="numberData" label="Enter Amount"></v-text-field>
                <v-btn class="gameButton" primary large inline @click="bet">Raise</v-btn>
                <v-btn class="gameButton" primary large inline @click="call">Call</v-btn>
                <v-btn class="gameButton" primary large inline @click="fold">Fold</v-btn>
            </div>
            <div class='gameButtons' v-if="isActivePlayer && !isBetOut">
                <v-text-field v-model="numberData" label="Enter Amount"></v-text-field>
                <v-btn class="gameButton" primary large inline @click="bet">Bet</v-btn>
                <v-btn class="gameButton" primary large inline @click="check">Check</v-btn>
                <v-btn class="gameButton" primary large inline @click="fold">Fold</v-btn>
            </div>
        </div>
    </v-container>
</template>
<script>
export default {
    components: {
    },
    props: {
    },
    data() {
        return {
            user: null, 
            gameId: '',
            gameRendering: null,
            isActivePlayer: false,
            isBetOut: false,
            numberData: 0,
        }
    },
    async created() {
        let allCookies = document.cookie
        this.gameId = allCookies.split('; ').find(row => row.startsWith('gameId')).split('=')[1]
        let id = allCookies.split('; ').find(row => row.startsWith('name')).split('=')[1]
        this.id = id
        let res  = await this.$axios.post('/users/getUser', {
        id: id,
        })
        
        this.user = res.data.user

        this.requestRendering();

        if(!this.$ws.connected) await this.$ws.connect()
        this.$ws.on(`${this.gameId}/renderGame`, this.requestRendering)
    }, 
    async destroyed() {

    }, 
      
    methods:{
        async requestRendering(){
            let res = await this.$axios.post('/game/getRendering', {
                gameId: this.gameId,
                username: this.user.username,
            })
            this.gameRendering = res;
            
            this.isActivePlayer = res.data.activePlayer.name === this.user.username;
            this.isBetOut = res.data.isBetOut;
        },
        async fold(){
            let res = await this.$axios.post('/game/fold', {
                gameId: this.gameId,
                username: this.user.username,
            })
        },
        async check(){
            let res = await this.$axios.post('/game/check', {
                gameId: this.gameId,
                username: this.user.username,
            })
        },
        async bet(){
            let res = await this.$axios.post('/game/bet', {
                gameId: this.gameId,
                username: this.user.username,
                amount: parseInt(this.numberData, 10)
            })
        },
        async call(){
            let res = await this.$axios.post('/game/call', {
                gameId: this.gameId,
                username: this.user.username,
            })
        },
    }
}
</script>
<style scoped>
.container{
    width: 700px;
}
.gameButtons{
    display: inline;
}
.gameButton{
    float: right;
}

</style>