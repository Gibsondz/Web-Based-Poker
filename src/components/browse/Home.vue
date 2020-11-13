<template>
    <v-container>
        <div v-if="!newAccount">
            <h1 class="center">
                Welcome to 513 Poker!
            </h1>
            <img :src="require('@/assets/pokerchip.jpg')">
            <div>
                <v-layout row class="text-xs-center">
                        <v-container  class="text-xs-center">
                            <v-card class="login" flat>
                                <v-card-title primary-title>
                                    <h4>Login</h4>
                                </v-card-title>
                                <v-form>
                                    <v-text-field v-model="username" prepend-icon="person" label="Username"></v-text-field>
                                    <v-text-field v-model="password"  prepend-icon="lock"  label="Password" type="password"></v-text-field>
                                    <v-card-actions>
                                        <v-btn primary large block @click="Login">Login</v-btn>
                                    </v-card-actions>
                                </v-form>
                            </v-card>
                        </v-container>
                </v-layout>
            </div>
            <div class="center">
            <a href="#" @click="newAccount=true" class="center">
                    Don't have an account, sign up here!
            </a>
            </div>
        </div>
        <div v-else>
            <new-account @success="newAccount = false"></new-account>
        </div>
    </v-container>
</template>
<script>
import newAccount from './newAccount'
export default {
    components: {
        newAccount
    },
    data() {
        return {
            user: null,
            username: '',
            password: '',
            newAccount: false
        }
    },
    async created() {

        
    },    
    methods:{
        async Login(){
            let res  = await this.$axios.post('/users/Login', {
                username:this.username,
                password: this.password
            })
            console.log(res)
            if(res.data === 'found')
            {
                window.location.href = "/lobby"

            }
            
        },


    }
}
</script>
<style scoped>
.login {
  margin: auto;
  width: 50%;
  border: 3px solid black;
  padding: 10px;
}
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 20%;
}
.center {
  margin: auto;
  width: 50%;
  padding: 10px;
  text-align: center;
}
</style>