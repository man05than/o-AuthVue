import {getAuth , onAuthStateChanged} from 'firebase/auth';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue'),
    meta:{
      requiredAuth : false,
  }
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
    meta:{
      requiredAuth : false,
  }
  },
  {
    path: '/feed',
    name: 'feed',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "feed" */ '../views/FeedView.vue'),
    meta:{
      requiredAuth : true,
  }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const getCurrentUser = () => {
  return new Promise((resolve , reject) =>{
   const removeLister = onAuthStateChanged(getAuth()
   ,(user)=>{
    removeLister();
    resolve(user);
   },
   reject
   );
  });
}

router.beforeEach(async (to,from,next) => {
  if(to.matched.some((record) => record.meta.requiredAuth)){
    if(await getCurrentUser()){
      return next();
    }
    else{
      alert("you don't have access!");
       return next("/login");
    }
  }
  next();
});
export default router

