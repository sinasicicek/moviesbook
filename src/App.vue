<template class="temp">
  <router-view/>
</template>

<script>
export default {

  data() {
    return {
      
    }
  },

  
  
}
</script>

<style>
@import './assets/bootstrap.css' 
;
.temp{
  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);

}
.respo{
  width: 50%;
}
@media (min-width: 320px) and (max-width:375px) 
{

  .respo{
    width: 100% !important;
  }
  #pop{
    width: 320px;
  }
 
}
@media (min-width: 375px) and (max-width:425px) 
{

  .respo{
    width: 100% !important;
    padding: 20px;
  }
  #pop{
    width: 320px;
  }
 
}
@media (min-width: 425px) and (max-width:768px) 
{

  .respo{
    width: 100% !important;
    padding: 20px;
  }
  #pop{
    width: 650px;
  }
 
}
@media (min-width: 768px) and (max-width:1024px) 
{

  .respo{
    width: 100% !important;
    padding: 20px;
  }
  #pop{
    width: 650px;
  }
 
}
</style>
