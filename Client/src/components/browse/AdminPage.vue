<template>
    <v-container class="container">
        <h1 class="title">Manage Users</h1>
        <div class="userOptions" v-for="(user, i) in users" v-bind:key="user.username">
            <div>
                <b-btn class="userCollapseButton" v-b-toggle="'collapse-' + i" variant="primary">
                    <img class="closedIcon" src="@/assets/Resources/icons/arrow_forward-24px.svg" alt="">
                    <img class="openIcon" src="@/assets/Resources/icons/arrow_downward-24px.svg" alt="">
                    <span class="userNameLabel"> {{ user.username }}  </span>
                    <span v-if="user.isAdmin" class="userType"> Admin </span>
                    <span v-if="!user.isAdmin" class="userType"> Standard </span>
                </b-btn>
            </div>
            <b-collapse :id="'collapse-' + i" class="mt-2">
                <b-card>
                    <div class="userInputs">
                        <span>Change Password: &nbsp;&nbsp;</span>
                        <v-text-field class="passwordField" v-model="pwChanges[i]" label="Password" type="password"></v-text-field>
                        <div></div>
                        <span class="passwordLabel">Confirm Password: </span>
                        <v-text-field class="passwordField" v-model="confirmPwChanges[i]" label="Password" type="password"></v-text-field>
                        <v-btn class="changePasswordButton" primary medium inline @click="changePassword(user.username, user.userId, i)">Change Password</v-btn>
                        <div class="userTypeInputs">
                            <span class="changeUserTypeLabel">Change User Type: </span>
                            <v-btn class="userTypeButton" primary medium inline @click="makeAdmin(user.username, i)">Make Admin</v-btn>
                            <v-btn class="userTypeButton" primary medium inline @click="makeStandard(user.username, i)">Make Standard</v-btn>
                        </div>
                        <div class="deactivateUser">
                            <v-btn class="deactivateUserButton" large inline @click="deactivateUser(user.username, i)">Deactivate User</v-btn>
                        </div>
                    </div>
                </b-card>
            </b-collapse>
        </div>
        <v-snackbar v-model="snackbar" :timeout="3000" :top="true">
            {{snackbarMessage}}
            <template v-slot:action="{ attrs }">
                <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>        
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
            snackbar: false,
            snackbarMessage: '',
            users: [],

            pwChanges: {},
            confirmPwChanges: {},
        }
    },
    async created() {
        let allCookies = document.cookie
        let place = allCookies.split('; ').find(row => row.startsWith('place')).split('=')[1]
        let id = allCookies.split('; ').find(row => row.startsWith('name')).split('=')[1]
        this.id = id
        let res  = await this.$axios.post('/users/getUser', {
          id: id,
        })
        this.user = res.data.user
        if(!this.user.isAdmin){
            window.location.href = "/lobby"

        }
        res  = await this.$axios.post('/users/getAllUser')
        let currentUsers = res.data.users
        for(let i = 0; i < currentUsers.length; i++){
            this.users.push({username:currentUsers[i].username, isAdmin: currentUsers[i].isAdmin, userId: currentUsers[i].id})
        }

    },    
    methods:{
        async changePassword(username, userId, i) {
            let res  = await this.$axios.post('/users/updateUser', {
                id: userId,
                username: username,
                newPassword: this.pwChanges[i],
                confirmNewPassword: this.confirmPwChanges[i]
            })
            if(res.data.message){
                this.snackbarMessage = 'Update Successful'
                this.snackbar=true
                this.pwChanges[i] = ''
                this.confirmPwChanges[i] = ''
            }else if(res.data === 'passwords do not match'){
                this.snackbarMessage = 'Password do not match'
                this.snackbar=true
                this.pwChanges[i] = ''
                this.confirmPwChanges[i] = ''
            }
        },
        async makeAdmin(username, i) {
             let res  = await this.$axios.post('/users/makeAdmin', {
                 username: username 
            })
            if(res.data.success){
                this.users[i].isAdmin = true
            }
            
        },
        async makeStandard(username, i) {
            let res  = await this.$axios.post('/users/makeStandard', {
                 username: username 
            })
            if(res.data.success){
                this.users[i].isAdmin = false
            }
        },
        async deactivateUser(username, i) {
            console.log(username);
            if(confirm("Are you sure?")){
                let res  = await this.$axios.post('/users/deleteUser', {
                 username: username 
                })

            if(res.data.success){
                this.users.splice(i, 1)
            }
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
.userCollapseButton{
    width: 100%;
}
.userCollapseButton img{
    float: left;
    margin-top: 8px;
}
.userNameLabel{
    float: left;
    padding-left: 10px;
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

.collapsed > .openIcon,
:not(.collapsed) > .closedIcon {
  display: none;
}
</style>