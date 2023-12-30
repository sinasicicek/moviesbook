<template>
    <div class="container tamortasi home">
    <div class="tamortasicolumn home-box">
      <img src="../../assets/icon/login.png" class="home-box-img" alt="">
      <input class="home-box-input form-control " type="text" v-model="vmodelname" placeholder="Email"> <br>
      <input class="home-box-input form-control " type="password" v-model="vmodelpassw" placeholder="password">
      <br>  
      <button class="btn btn-outline-dark w-25 btn-cerceve" @click="inputcontrol(vmodelname,vmodelpassw)" >Signin</button>
      <br>
      <div :class="alert_class" v-if="alert_vif">{{ alert_mesaj }}</div>

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
      vmodelpassw:"",
      alert_vif:false,
      alert_mesaj:"",
      alert_class:""
    }
  },
  methods:{
    loginBtn(name,passw){
     
      login(name,passw)
         .then((sonuc)=>{
          if(sonuc){
            this.alert_class="alert-success"
            this.bildirimGoster("Giriş Yapılıyor")
            setTimeout(()=>{this.$router.push("/home");},2500)
          }
         })
         .catch((hata)=>{
      
          
         })
    },
    
    bildirimGoster(msj){this.alert_mesaj=msj},
    
    inputcontrol(name,passw){
      this.alert_vif=true
      if(name !== "" && passw !=="")
      {this.loginBtn(name,passw)}
      else{
        this.alert_class="alert-danger"
        this.bildirimGoster("Giriş Yapılamadi")
      }
    },

   },
}
</script>

<style>
.btn-cerceve{
  border: 2px solid #fed32f;
}
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
  border: 2px solid #fed32f;
  border-radius: 5px;
}
.tamortasi{
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.tamortasicolumn{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.alert-danger{
  width: 150px;
  height: 30px;
  border-radius: 5px;
  text-align: center;
  animation: alert-danger-animation .6s both;
}

@keyframes alert-danger-animation 
{
  0%{transform: scale(1);}
  100%{transform: scale(1.5);}  
}
@media (min-width: 320px) and (max-width:2560px) 
{
  .home-box{
    width: 80% !important;
    height: 100% !important;
  }
  
}

</style>