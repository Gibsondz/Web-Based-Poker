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
            email: ''
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
            this.$emit('success')
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