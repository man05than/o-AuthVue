<template>
  <div class="Register">
  <h1>Register for the App</h1>
  <div class="row">
    <strong for="email">Enter your email:</strong>   
  <input id="email" type="email" v-model="email"/>
  </div>
  <div class="row">
    <strong for="password">Enter your password:</strong>   
  <input id="password" type="password" v-model="password"/>
  </div>
  <button @click="onRegisterClick()">Register</button>
  <div>
  <button @click="onGoogleRegisterClick()">Register with Google Account</button>
  </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, Ref } from 'vue'
import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {useRouter} from 'vue-router';
import { thisTypeAnnotation } from '@babel/types';

export default defineComponent({
  data() {
    return{
      email:'',
      password :  '',
       router : useRouter(),
    };
  }
  ,
  methods :{
    onRegisterClick(){
       const provider = new GoogleAuthProvider();
       signInWithPopup(getAuth(),provider)
       .then((result) =>{
        console.log(result.user);
        this.router.push('/feed');
       })
       .catch((error) =>{
        console.log(error);
       });
    },
    onGoogleRegisterClick(){
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email,this.password)
      .then((data) =>{
        console.log("sucessfully Registered!");
        console.log(auth.currentUser);
        this.router.push('/feed');
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
      });
    }
  }
})
</script>

<style scoped>

.row{
  display: inline-block;
  line-height: 20px;
  width : 30%;
  border : 0.5em;
  border-radius: 1em;
  padding: 10px;
  margin: 10px;
}

.Register{
  border: 1em;
  border-color: black;
  border-radius: 20%;
  background-color: blanchedalmond;
  padding: 10px;
}
</style>
