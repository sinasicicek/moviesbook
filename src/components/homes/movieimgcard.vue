<template>
  <div class="d-flex card-frame">
      <div class="cardx card-inf">

    <img class="card-img" :src="imgsrcdeafult" alt="" />

    <div class="d-flex justify-content-center meksi10">
     <h4 class="meksi10-h4">{{ originaltitle }}</h4>
    </div>
    <div class="imdb-conta">
        <h5 class="meksi10-h5">{{ releasedate }}</h5>
        <div  class="imdb-vatore circle-border d-flex justify-content-center align-items-center">{{ this.voteaverage.toString().substring(0,3)}}</div>
    </div>
  </div>
 </div>
 
</template>

<script>
export default {
  data() {
    return {
      show: false,
      cardvue: "cardhidden",
      yayim_tarih:"",
      imgsrcdeafult: "https://image.tmdb.org/t/p/w500"+this.imgsrc,
      imdi:"imdb"+this.imdid
  
    };
  },
  props:["imgsrc","originaltitle","releasedate","voteaverage","imd","imdid"],
  created() {
  },
  methods: {
    btnvisible() {
      this.cardvue = "cardshow";
    
    },
    btnhidden() {
      {
        this.cardvue = "cardhidden";
      }
    },
  
  },
};
</script>

<style scoped>
.card-frame{
  max-height: 337px;
}
.imdb{display: none;}
.imdb-conta{position: relative;z-index: 160;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.imdb-vatore{
    position: sticky;
    z-index: 145;
    bottom: 50px;
    
    font-weight: 500;
    text-align: center;
    width: 32.44px;
    height: 32px;
}
.circle-border {
    background-color: #fed32f;
    border-radius: 50%;
    padding: 5px;
    font-size: 12px;
}
 .cardx > .info {
    position: absolute;
    z-index: 20;
}
.cardx {
  position: relative;
  padding: 10px;
  display: flex;
    flex-direction: column;
    word-wrap: break-word;
    background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
  
    


}
.card-inf:hover {cursor: pointer; transform: scale(1.06);}
.info {
  z-index: 12;

  color: #fed32f;
}
.info > h6 {
  background-color: #333333;
  padding: 5px;
}
.meksi10 {
  margin-left: 5px;
  margin-top: 5px;
  z-index: 13;
  flex-direction: column;
  align-items: flex-start;
}
.meksi10-h4{
    margin: 0px;
    inline-size: 250px;
    overflow-wrap: break-word;
 
}
.meksi10-h5{
       font-size: 12px;
       margin-left: 5px;
       color: #2e294e;
       font-weight: 900;
}
.card-img {
  width: 380px;
  height: 250px;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
}

.card-img-play-btn {
  width: 70px;
  height: 70px;
  background-color: white;
  border: #1b1b1b 14px solid;
  border-radius: 50%;
}
.card-img-play-btn-img {
  width: 27px;
  height: 27px;
  border-radius: 50%;
  transform: rotate(90deg);
  padding-bottom: 6px;
}
.cardshow {
  opacity: 1;
  transition: 1s;
  cursor: pointer;
}
.cardhidden {
  opacity: 0;
}
.card-img-play-btn-img:active {
  transform: scale(0.8);
}
@media (min-width: 320px) and (max-width: 375px) {
  .card-img {
    width: 100%;
  }
  .card{
    min-width: 10 !important;
  }
  .card-container > .cardx > .card-img { display: none;}

}

@media (min-width: 375px) and (max-width: 425px) {
  .card-img {
    width: 100%;
  }
  .card{
    min-width: 10 !important;
  }
  .card-container > .cardx > .card-img { display: none;}
}
@media (min-width: 630px) and (max-width:768px) 
{
  .card-container > .cardx > .card-img { display: none;}

}
</style>