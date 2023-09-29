<template>
  <navbar/>
  <div>Listem</div>
</template>

<script>
import{ auth } from "../../components/firebaseconf.js"
import {  onAuthStateChanged} from "firebase/auth";
import navbar from "../../components/navbar/navbarliste.vue"
export default {
  components:{navbar},
  beforeCreate() { 
        onAuthStateChanged(auth,(user)=>{
if (user ===  null) {
  this.$router.push("/")
  } })
    },
}
</script>

<style>
</style>