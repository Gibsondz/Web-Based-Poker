<template>
    <v-container>
        <h1 class="center">
            Create a new Account!
        </h1>
        <img :src="require('@/assets/pokerchip.jpg')">
        <div>
            <v-layout row class="text-xs-center">
                    <v-container  class="text-xs-center">
                        <v-card class="login" flat>
                            <v-card-title primary-title>
                                <h4>New account</h4>
                            </v-card-title>
                            <v-form>
                                <v-text-field v-model="username" prepend-icon="person" label="Enter Username"></v-text-field>
                                <v-text-field v-model="password"  prepend-icon="lock"  label="Enter Password" type="password"></v-text-field>
                                <v-text-field v-model="email"  prepend-icon="lock"  label="Enter Email" ></v-text-field>
                                <v-card-actions>
                                    <v-btn primary large block @click="signUp">Create Account</v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card>
                    </v-container>
            </v-layout>
        </div>
        <v-snackbar
            v-model="snackbar"
            :timeout="3000"
            :top="true"
            >
            That username or email already exsists

            <template v-slot:action="{ attrs }">
                <v-btn
                color="pink"
                text
                v-bind="attrs"
                @click="snackbar = false"
                >
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
        return {
            user: null,
            username: '',
            password: '',
            email: '',
            snackbar: false
        }
    },
    async created() {

        
    },    
    methods:{
        async signUp(){
            let res  = await this.$axios.post('/users/newUser', {
                username: this.username,
                password: this.password,
                email: this.email
            })
            console.log(res)
            if(res.data.message){
                this.snackbar = true
            }else{
                document.cookie = 'place=pokergame'
                document.cookie = `name=${res.data.id}`
                this.$emit('success')   
            }
        }

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