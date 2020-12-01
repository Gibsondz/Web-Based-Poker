<template>
    <v-container class="container">
        <h1>Manage Users</h1>

        <div class="user" v-for="(user, i) in users" v-bind:key="user.username">
            <div>
                <b-button v-b-toggle="'collapse-' + i" variant="primary">{{ user.username }}</b-button>
                <p> {{ user.userType }} </p>
            </div>
            <b-collapse :id="'collapse-' + i" class="mt-2">
                <b-card>
                    <div>
                        <p> Change Password </p>
                        <v-text-field v-model="pwChanges[i]" label="Username"></v-text-field>
                        <v-btn primary small block @click="changePassword(user.username, i)">Change Password</v-btn>
                        <v-btn primary small block @click="makeAdmin(user.username)">Admin</v-btn>
                        <v-btn primary small block @click="makeStandard(user.username)">Standard</v-btn>
                        <v-btn primary large block @click="removeUser(user.username)">Remove User</v-btn>
                    </div>
                </b-card>
            </b-collapse>
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

            users: [
                {username: "bobby", userType:"admin"},
                {username: "robby", userType:"standard"},
                {username: "bob", userType:"admin"},
                {username: "coolguy", userType:"standard"},
                {username: "eaeeee", userType:"standard"}
            ],

            pwChanges: {},
        }
    },
    async created() {
    },    
    methods:{
        async changePassword(username, i) {
            console.log(username);
            console.log(this.pwChanges[i]);
            if(confirm("Are you sure?")){

            }
        },
        async makeAdmin(username) {
            console.log(username);
        },
        async makeStandard(username) {
            console.log(username);
        },
        async removeUser(username) {
            console.log(username);
            if(confirm("Are you sure?")){

            }
        },
    }
}
</script>
<style scoped>

</style>