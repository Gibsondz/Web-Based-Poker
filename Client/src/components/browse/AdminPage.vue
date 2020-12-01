<template>
    <v-container class="container">
        <h1 class="title">Manage Users</h1>
        <div class="userOptions" v-for="(user, i) in users" v-bind:key="user.username">
            <div>
                <b-btn v-b-toggle="'collapse-' + i" variant="primary">
                    <span class="when-closed">+ </span>
                    <span class="when-opened">- </span>
                    {{ user.username }}
                </b-btn>
                <span v-if="user.isAdmin" class="userType"> Admin </span>
                <span v-if="!user.isAdmin" class="userType"> Standard </span>
            </div>
            <b-collapse :id="'collapse-' + i" class="mt-2">
                <b-card>
                    <div class="userInputs">
                        <span>Change Password: &nbsp;&nbsp;</span>
                        <v-text-field class="passwordField" v-model="pwChanges[i]" label="Password" type="password"></v-text-field>
                        <div></div>
                        <span class="passwordLabel">Confirm Password: </span>
                        <v-text-field class="passwordField" v-model="confirmPwChanges[i]" label="Password" type="password"></v-text-field>
                        <v-btn class="changePasswordButton" primary medium inline @click="changePassword(user.username, i)">Change Password</v-btn>
                        <div class="userTypeInputs">
                            <span class="changeUserTypeLabel">Change User Type: </span>
                            <v-btn class="userTypeButton" primary medium inline @click="makeAdmin(user.username)">Make Admin</v-btn>
                            <v-btn class="userTypeButton" primary medium inline @click="makeStandard(user.username)">Make Standard</v-btn>
                        </div>
                        <div class="deactivateUser">
                            <v-btn class="deactivateUserButton" large inline @click="deactivateUser(user.username)">Deactivate User</v-btn>
                        </div>
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
                {username: "bobby", isAdmin:true},
                {username: "robby", isAdmin:false},
                {username: "bob", isAdmin:true},
                {username: "coolguy", isAdmin:false},
                {username: "eaeeee", isAdmin:false}
            ],

            pwChanges: {},
            confirmPwChanges: {},
        }
    },
    async created() {
    },    
    methods:{
        async changePassword(username, i) {
            console.log(username);
            console.log(this.pwChanges[i]);
            console.log(this.confirmPwChanges[i]);
        },
        async makeAdmin(username) {
            console.log(username);
        },
        async makeStandard(username) {
            console.log(username);
        },
        async deactivateUser(username) {
            console.log(username);
            if(confirm("Are you sure?")){

            }
        },
    }
}
</script>
<style scoped>
.title{
    padding-bottom: 20px;
}
.userOptions{
    font-size: 30px;
    padding: 5px;
    margin-top: 5px;
    margin-left: auto;
    margin-right: auto;
    width: 70%;
    border-color: black;
    border-style: solid;
    border-radius: 10px;
    background: lightgray;
    border-width: 2px;
}
.userType{
    float: right;
}

.userInputs span{
    font-size: 18px;
}

.passwordField{
    width: 50%;
    display: inline-block;
}
.passwordButton{
    display: inline-block;
    width: 50px;
}
.changePasswordButton{
    float: right;
    margin-top: 20px;
}
.removeUserButton{
    padding: 100px;
}
.userTypeInputs{
    padding-bottom: 20px;
}
.userTypeInputs button{
    float: right;
    margin-top: 10px;
}
.deactivateUser{
    display: flex;
    justify-content: center;
    align-content: center;
}
.deactivateUser button{
    margin-top: 20px;
}

.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>