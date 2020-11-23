<template>
<v-container>
<nav-bar></nav-bar>
<div class="contentLayout">
    <ul class="lobbyList"> 
        <li  v-for="lobby in lobbies" :key="lobby.id">
            <div class="lobby">
                {{lobby.name}}
                <img v-if=lobby.lock src="https://banner2.cleanpng.com/20180602/vea/kisspng-computer-icons-padlock-web-typography-clip-art-schloss-5b1221d4693526.5435415715279149644309.jpg">
                <img v-else src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlTZo8cPavYzOaxexHlMckyxBIfAtie05SlQ&usqp=CAU'>
                Players: {{lobby.players}}
                <button> Join </button>
            </div>
        </li>
    </ul>
    <form class="createLobby">
        <h1 style="text-align:Center">Create a new Lobby </h1>
        <br>
        <label for='lobbyname'> Lobby Name: </label>
        <input type="text" id='lobbyname' name='lobbyname'><br>
        <br>
        <label for='lobbypass'> Lobby Password: </label>
        <input type="text" id='lobbypass' name='lobbypass'><br>
        <br>
        <label for='blindstime'> Blinds Timer: </label>
        <input type="text" id='blindstime' name='blindstime'> Minutes <br>
        <br>
        <button style="width:30%;"> Create </button>
    </form>
</div>
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
            user: null,

            lobbies:[
                {id:'1',name:'test',lock:false,players:'4'},
                {id:'2',name:'test',lock:true,players:'5'},
                {id:'3',name:'test',lock:false,players:'6'},
                {id:'4',name:'test',lock:false,players:'7'},
                {id:'5',name:'test',lock:false,players:'8'}
            ]
        }
    },
    async created() {
    
    },    
    methods:{
        
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