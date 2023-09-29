<template>
    <div class="container tamortasi home">
    <div class="tamortasicolumn home-box">
      <img src="../../assets/icon/login.png" class="home-box-img" alt="">
      <input class="home-box-input form-control " type="text" v-model="vmodelname" placeholder="Email"> <br>
      <input class="home-box-input form-control " type="password" v-model="vmodelpassw" placeholder="password">
      <br>  
      <button class="btn btn-outline-dark w-25" @click="inputcontrol(vmodelname,vmodelpassw)" >Signin</button>
    </div>
   
  </div>
</template>

<script> 
import {login} from './login'
import{ auth } from "../../components/firebaseconf.js"
import {  onAuthStateChanged} from "firebase/auth";


export default {
  data(){
    return {
      vmodelname:"",
      vmodelpassw:""
    }
  },
 
  methods:{
    loginBtn(name,passw){
      login(name,passw)
         .then((sonuc)=>{
          if(sonuc){
            this.$router.push("/home");
          }
         })
         .catch((hata)=>{
            this.bildirimGoster(hata.code+" mesaj")
         })
    },
    
    bildirimGoster(msj){alert(msj)},
    inputcontrol(name,passw){
      if(name !== "" && passw !==""){this.loginBtn(name,passw)}
      else{this.bildirimGoster("Tüm alanları doldurunuz")}
    },

   },
}
</script>

<style>
.home{
  height: 100vh;
}
.home-box{
  background-color: white;
  width: 40%;
  height: 40%;
  border-radius: 10px;
}
.home-box-img:hover{
  cursor: pointer;
  border-radius: 0px;
  transition: 1s;
}
.home-box-img{
  width: 150px;
  height: 150px;
  margin:.8rem;
 
}
.home-box-input{
  width: 80%;
  padding: 5px;
  border: 2px solid;
  border-radius: 5px;
}
.tamortasi{
  display: flex;
  align-items: center;
  justify-content: center;
}
.tamortasicolumn{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@media (min-width: 325px) and (max-width:1025px)
{
  .home-box{
    width: 80%;
    height: 50%;
  }
}
</style>