<template>
    <v-container class="container">
        <div>
            <div class='center'>
                {{this.gameRendering}}
            </div>
            <div class='gameButtons' v-if="isActivePlayer">
                <v-btn class="gameButton" primary large inline @click="fold">Fold</v-btn>
                <v-btn class="gameButton" primary large inline @click="check">Check</v-btn>
                <v-btn class="gameButton" primary large inline @click="raise">Raise</v-btn>
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
            isActivePlayer: false
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
            console.log(res);
            console.log(res.data.activePlayer.name);
            if(res.data.activePlayer.name === this.user.username)
            {
                this.isActivePlayer = true;
            } 
            else
            {
                console.log("We here");
                this.isActivePlayer = false;
            }
        },
        async fold(){
        },
        async check(){
        },
        async raise(){
        },
        async call(){
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