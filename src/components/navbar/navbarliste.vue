<template>
  <nav class="pt-4">
    <div class="container d-flex justify-content-between">
        <ul class="w-25">
            <li class="user-li d-flex justify-content-center align-items-center">
                <div class="cube"></div>
                <div class="cube cubemarginleft"></div>
                
            </li>
          
            <li class="flowerBox-li"><router-link to="home">FlowerBox</router-link> </li>
        </ul>
        <ul class="navbarliste w-75 d-flex justify-content-center">
            <li><router-link to="home" class="container-a">Movies</router-link> </li>
            <li><router-link to="/listem" class="container-a">Music</router-link></li>
            <li><router-link to="home" class="container-a">Gaming</router-link> </li>
            <li><router-link to="/listem" class="container-a">Listem</router-link></li>
        </ul>
        <ul class="navbaruser w-25 d-flex justify-content-end">
            <button class="btn-close cube" @click="exit"></button>
        </ul>
    </div>

  </nav>
</template>

<script>
import { auth } from '../firebaseconf';

export default {
    methods:{
        exit(){
            auth.signOut()
                .then(() => {
                    alert("Çıkış başarılı")
                    this.$router('')
                }).catch((error) => {
                alert("çıkış başarısız")
                });
        }
    }
}
</script>

<style scoped>
.cubemarginleft{
    margin-left: 5px;
}
.line{ 
    width: 30px;
height: 3px;
background-color: #fed32f;
}
.user-img{
    width: 45px;
    height: 45px;
    color: aliceblue;
}
.user-li{
    width: 60px;
    height: 60px;
    border: #fed32f 5px solid;
    border-radius: 50%;
    
}
.user-li:hover{
    animation: cubeanime 1s forwards;
}
.user-li:hover  .cube{
    
    padding: 0px 3px;
}
.flowerBox-li >a {
    padding: 0px;
    font-size: 14px;
   
    
}

.cube{
    width: 10px;
    height: 10px;
    border:#fed32f 5px solid;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
   

}
@keyframes cubeanime 
{
 0%{transform: rotate(0deg);}
 100%{transform: rotate(360deg);}   
}
nav{
    
    /*background-color: #fbbd0d;*/
    background-color: #1b1b1b;
    border-bottom: #fed32f 5px solid;

}
.navbarliste{

}
ul{
    list-style-type: none;
    padding: 0px;
    margin: 0px;
}
a{
  text-decoration: none;  
  font-size: 24px;
  font-family: 'Times New Roman', Times, serif;
  color:white ; 
  padding: 5px;
}
li{
    display: inline-block;
    color:white ; 
   max-width: 200px;
    max-height: 40px;
}
.container-a {
    margin:0px 2rem;

    border-radius: 10px;
   color: white;
   padding: 0px 4rem;
}
li:hover .container-a{
    background-color: white;
    color: #1b1b1b;
   
}
@media (min-width: 320px) and (max-width:425px) 
{
    .navbarliste{
        flex-direction: column;
    }
    .container-a{ 
        margin: 0px; padding: 0px;}
   .navbarliste{
    align-items: center;
   }

}
@media (min-width:425px) and (max-width:768px) 
{
   
    .container-a{ 
        margin: 0px; padding: 20px;}
   .navbarliste{
    align-items: center;
   }

}
</style>