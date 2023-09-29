<template>
  <div class="card">

    <img class="card-img" :src="imgsrcdeafult" alt="" />

    <div class="d-flex justify-content-center meksi10">
     <h4 class="meksi10-h4">{{ originaltitle }}</h4>
    </div>
    <div class="imdb-conta">
        <h5 class="meksi10-h5">{{ releasedate }}</h5>
        <div class="imdb-vatore circle-border">{{ this.voteaverage.toString().substring(0,3)}}</div>
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
      imgsrcdeafult: "https://image.tmdb.org/t/p/w500"+this.imgsrc
  
    };
  },
  props:["imgsrc","originaltitle","releasedate","voteaverage"],
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
}
.circle-border {
    background-color: #fed32f;
    border-radius: 50%;
    padding: 5px;
}
 .card > .info {
    position: absolute;
    z-index: 20;
}
.card {
  position: relative;
  padding: 10px;
  height: 350px;
}
.card:hover {cursor: pointer; transform: scale(1.06);}
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
}
.card-img {
  width: 250px;
  height: 250px;
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

@media (min-width: 375px) and (max-width: 425px) {
  .card-img {
    width: 100%;
  }
}
</style>