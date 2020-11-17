<template>
<div>
<nav-bar></nav-bar>
<div style = "position:relative; top:80px;">
<h1 >Lobby</h1>
</div>
</div>
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
            user: null,
        }
    },
    async created() {

        
    },    
    methods:{

    }
}
</script>
<style scoped>

title {
    margin-top: 100px;
}
</style>