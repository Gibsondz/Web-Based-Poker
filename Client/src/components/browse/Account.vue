<template>
    <div class="navbar-offset">
      <h1>You won {{wins}} games!</h1>
      <br>
      <br>
        <span>
            Display name
            <v-text-field v-model="username" class="txtFeilds" ></v-text-field>
        </span>
        <span>
            Email address
            <v-text-field v-model="email" class="txtFeilds" ></v-text-field>
        </span>
        <v-divider class="divider"></v-divider>
        <h1>Change password</h1>
        <br>
        <span>
            Old password
            <v-text-field v-model="password" class="txtFeilds" ></v-text-field>
        </span>
        <span>
            New password
            <v-text-field v-model="newPassword" class="txtFeilds" ></v-text-field>
        </span>
        <span>
            Confirm new password
            <v-text-field v-model="confirmNewPassword" class="txtFeilds" ></v-text-field>
        </span>
        <v-btn @click="saveData" class="btn">Save changes</v-btn>
        <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      :top="true"
    >
      Update succsessful!

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
        
    </div>
</template>
<script>
export default {
    components: {
    },
    data() {
        return {
          snackbar: false,
            id: '',
            username: '',
            email: '',
            password: '',
            newPassword: '',
            confirmNewPassword: '',
            wins: 0
        }
    },
    async created() {
      try{
        let allCookies = document.cookie
        let place = allCookies.split('; ').find(row => row.startsWith('place')).split('=')[1]
        let id = allCookies.split('; ').find(row => row.startsWith('name')).split('=')[1]
        this.id = id
        console.log(id)
        let res  = await this.$axios.post('/users/getUser', {
          id: id,
        })
        this.username = res.data.user.username
        this.email = res.data.user.email
        this.wins = res.data.user.wins
        
        if(this.wins === null)
        {
          this.wins = 0;
        }

      

      }catch(err){

      }
        
    },    
    methods:{
      async saveData(){
        let res  = await this.$axios.post('/users/updateUser', {
        id: this.id,
        username: this.username,
        password: this.password,
        email: this.email,
        newPassword: this.newPassword,
        confirmNewPassword: this.confirmNewPassword
      })
      console.log(res)
      this.username = res.data.user.username
      this.email = res.data.user.email
      this.snackbar = true

      }

    }
}
</script>
<style scoped>
.navbar-offset {
    padding-top: 70px;
    
}
.divider {
    margin-top: 80px;
    
}
.txtFeilds {
   width: 20%;
    
}
.btn {
   position: absolute;
   bottom: 0;
   right: 0;
   width: 40%
    
}
</style>