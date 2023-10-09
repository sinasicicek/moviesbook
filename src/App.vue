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
}
</style>
