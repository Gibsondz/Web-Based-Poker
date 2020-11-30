<template>
    <v-container class="container">
        <h1>Hello</h1>
        <el-collapse >
        </el-collapse>
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

            users: [
                {username: "bobby", userType:"admin"},
                {username: "robby", userType:"standard"},
                {username: "bob", userType:"admin"},
                {username: "coolguy", userType:"standard"},
                {username: "eaeeee", userType:"standard"}
            ],
            // isHost:true,
            
        //     host:'bob',
        //     gameData:{
        //         startingStack:3000,
        //         blindTimer:'15 minutes',
        //         startingBlinds:'15/30',
        //     },
        //     players: [{
        //         username: "robby"
        //     },
        //     {
        //         username: "dilbert"
        //     },
        //     {
        //         username: "bobby"
        //     }],
        }
    },
    async created() {
    },    
    methods:{
    }
}
</script>
<style scoped>

</style>