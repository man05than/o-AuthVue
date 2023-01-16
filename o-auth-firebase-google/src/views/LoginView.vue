<template>
    <div class="Login">
    <h1>Login for the App</h1>
    <div class="row">
      <strong for="email">Enter your email:</strong>   
    <input id="email" type="email"  v-model="email"/>
    </div>
    <div class="row">
      <strong for="password">Enter your password:</strong>   
    <input id="password" type="password" v-model="password" />
    </div>
    <button @click="onLoginClick()">Login</button>
    <div>
        <span v-if="errorMsg != ''">{{ errorMsg }}</span>
  <button @click="onSignInWithGoogleClick()">Login with Google Account</button>
  </div>
    </div>
    
  </template>
  <script lang="ts">
  import { defineComponent } from 'vue'
  import {getAuth, signInWithEmailAndPassword
,GoogleAuthProvider,signInWithPopup} from 'firebase/auth';
import {useRouter} from 'vue-router';
  export default defineComponent({
    data() {
    return{
      email:'',
      password :  '',
      errorMsg :'',
        router :useRouter(),
    };
  }
  ,
    methods :{
      onLoginClick(){
        this.router.push('/home');
      },
      onSignInWithGoogleClick(){
        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.email,this.password)
      .then((data : any) =>{
        console.log("sucessfully Sign In!");
        console.log(auth.currentUser);
        this.router.push('/feed');
      })
      .catch((error : any) => {
        console.log(error.code);
        switch(error.code){
            case "auth/invalid-email":
                this.errorMsg = "Invalid Email";
                break;
                case "auth/user-not-found":
                    this.errorMsg = "No account with that email was found";
                    break;
                    case "auth/wrong-password":
                        this.errorMsg = "incorrect password";
                        break;
                        case  "auth/user-disabled":
                            this.errorMsg = "The user account has been disabled by an administrator.";
                            break;
                            default:
                                this.errorMsg = "Email or Password is invalid";
        }
        alert(error.message);
      });
    }
}
});
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

.Login{
  border: 1em;
  border-color: black;
  border-radius: 20%;
  background-color: blanchedalmond;
  padding: 10px;
}
  </style>
  