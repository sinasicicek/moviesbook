
import { createRouter,createWebHistory } from "vue-router";
import home from '../homes/Home.vue'
import listem from '../listem/listes.vue'
import logintemp from "../../view/login/logintemplate.vue";
import{ auth } from "../../components/firebaseconf.js"
import {  onAuthStateChanged} from "firebase/auth";



const route=[
  {path: '',component :logintemp},
  {path: '/home',component :home},
  {path: '/listem',component :listem}
]
 const router=createRouter({
   
    history:createWebHistory(),
    routes:route
    
})

export { router}