<template>
  <div>
    <nav>
    <router-link to="/register">Register</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/home">Home</router-link> |
    <router-link to="/feed">Feeds</router-link> &nbsp;&nbsp;&nbsp;
  <button v-if="isLoggedIn" class="btn pull-rignt"  @click="onLogout()" > LogOut </button>
  </nav>
  <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {getAuth,onAuthStateChanged , signOut } from 'firebase/auth'
import { useRouter,routerKey, RouterLink, RouterView } from 'vue-router';

export default defineComponent({
  data(){
    return {
      isLoggedIn: false,
      router : useRouter(),
    };
  },
   mounted(){
    let auth = getAuth();
    onAuthStateChanged(auth, (user) =>{
      if(user){
        this.isLoggedIn = true;
         console.log('9');
      }
      else{
        this.isLoggedIn = false;
        console.log('4');

      }
    });


  },
  methods : {
    onLogout(){
      let auth = getAuth();
      signOut(auth).then(() => {
       this.router.push("/login");
      });
    }
    
  }
})
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
