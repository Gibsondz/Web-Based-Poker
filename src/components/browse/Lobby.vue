<template>
<div>
<h1 >Lobby</h1>
<game-list @join-game="display"></game-list>
</div>
</template>
<script>
import NavBar from './navBar'
import GameList from './gameList'
export default {
    components: {
        NavBar,
        GameList
    },
    data() {
        return {
            user: null,
        }
    },
    async created() {

        
    },    
    methods:{
        display(event){
            this.$emit('join-game', event)

        }

    }
}
</script>
<style scoped>

title {
    margin-top: 100px;
}
</style>