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
    font-size: 12px;

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
    padding-top: 0px;
    font-size: 14px;

  }
  #pop{
    width: 320px;
  }
 
}
@media (min-width: 425px) and (max-width:768px) 
{

  .respo{
    width: 100% !important;
    padding:0px 20px;
  }
  #pop{
    width: 650px;
  }
 
}
@media (min-width: 768px) and (max-width:1024px) 
{

  .respo{
    width: 100% !important;
    padding:0px 20px;
  }
  #pop{
    width: 650px;
  }
  .card-info-click{
    width: none;
  }
  .card-info-click-btns{
    flex-direction: column;
  }
  .btn-close{
    top: 32px;
    position: relative;
    z-index: 1940;
    background-color: red;
  }
 
}
@media (min-width: 1024px) and (max-width:1440px) 
{

  .respo{
    width: 100% !important;
    padding:0px 20px;
  }
  #pop{
    width: 650px;
  }
  .card-info-click{
    width: none;
  }
  .card-info-click-btns{
    flex-direction: column;
  }
  .btn-close{
    top: 32px;
    position: relative;
    z-index: 1940;
    background-color: red;
  }
 
}
</style>
