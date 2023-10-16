<template>
  <navbar />
  <div class="Home p-5">
    <div class="container liste-tür">
      <ul class="liste-ul">
        <li
          class="liste-li"
          v-for="(item, index) in slect.url"
          :key="index"
          id="index"
          @click="türSecimi_Getir_BTN(item, slect.tex[index])"
        >
          {{ slect.tex[index] }}
        </li>
      </ul>
      <br />

      <h3 class="h3 color-white">{{ secilen_tür__name }}</h3>
    </div>
    <br />


    <div
      id="tablo"
      v-if="tablostate"
      class="container d-flex justify-content-center align-items-center flex-wrap Home-container">
<!-- detay info alanı-->
<div  class="d-flex flex-column card-info-click" :class="pop_up">
  <div class="card-info-click-btns">
    <button class="btn-close" @click="pop_up='gizle'"></button>
    <button class="btn-add-hover">+</button>
  </div>
  <div id="pop">
    
  </div>
  <div v-if="pop_up_info">{{ info_txt }}</div>
</div>

      <card
        @click="card_datay(index, $event,movies.overv[index])"
        class="m-2"
        v-for="(item, index) in movies.backdrop_path"
        :imgsrc="item"
        :key="index"
        :id="index"
        :originaltitle="movies.original_title[index]"
        :releasedate="movies.release_date[index]"
        :voteaverage="movies.vote_average[index]"
        :imd="movies.overv[index]"
        :imdid="index"
       
      
      ></card>
    </div>
    <button class="btn btn-danger w-100" @click="movie_sayfa_getir_BTN()">
      Daha Fazla Göster
    </button>
  </div>
</template>

<script>
import card from "../homes/movieimgcard.vue";
import navbar from "../../components/navbar/navbarliste.vue";
import { auth } from "../../components/firebaseconf.js";
import { onAuthStateChanged } from "firebase/auth";
import { options, moviegetir } from "../test.js";

export default {
  data() {
    return {
      pop_up:"gizle",
      pop_up_info:false,
      info_txt:null,
      tablostate: true,
      checkbox_gelen_konu_id: "",
      durumKapatBtn: "gizle",
      secilen_id: null,
      movies: {
        secilen_tur_global: "movie/popular",
        page_number: 1,
        backdrop_path: [],
        original_title: [],
        release_date: [],
        vote_average: [],
        cıkıstarih: [],
        overv:[],
        movietur: "",
        konular: {
          id: [],
          isim: [],
        },
        card_datay_view: true,
        detay: {
          boyut: "",
        },
      },
      secilen_tür__name: "",
      slect: {
        url: ["movie/popular", "trending/movie/day", "discover/tv"],
        tex: ["Populer Filmler", "Keşfet", "TV Populer"],
      },
    };
  },
  emits: ["secilenTur"],
  created() {
    this.popular_movie_getir();
    this.movie_konu_iceriklieri_get();
  },
  beforeCreate() {
    onAuthStateChanged(auth, (user) => {
      if (user === null) {
        this.$router.push("/");
      }
    });
  },
  components: { card, navbar },
  methods: {
    secilenTür(glen) {
      this.movies.movietur = glen;
    },
    konu_secimi(gelen_konu) {
      this.checkbox_gelen_konu_id = gelen_konu;
    },
    popular_movie_getir(
      kac_aadet_gelsin = 100,
      page_no = 1,
      movietur = "movie/popular"
    ) {
      /* EN TEMEL HALİYLE SAYFA CREATED OLSUGUNDA ÇALIŞIYOR FİLMLERİ GETİRİYOR */
      const option = options;
      //fetch("https://api.themoviedb.org/3/movie/popular?page="+page_no+"&language=tr-tr", option)
      this.secilen_tür__name = "Populer Filmler";
      moviegetir(movietur, page_no, "tr")
        .then((response) => response.json())

        .then(
          /*gelen image adresini https://image.tmdb.org/t/p/w500/gelenadres.jpg*/

          (gelenObje) => {
            /*
            key olarak page,results,total_pages,total_results anahtarları geliyor
            page  : sayfa 
            results : MOVİELERİN BİLGİLERİNİ TUTAN OBJE BULUNUYOR
            total_results: kaç adet movie var
            total_pages: kaç sayfa var

*/

            for (const key in gelenObje) {
              if (Object.hasOwnProperty.call(gelenObje, key)) {
                const element = gelenObje[key];

                //tüm bilgiler burada elemen içinde
                if (key === "results") {
                  for (let index = 0; index < kac_aadet_gelsin; index++) {
                  console.log(gelenObje["results"][index]["overview"]);
                    this.movies.overv.push(gelenObje["results"][index]["overview"])
                    this.movies.backdrop_path.push(
                      gelenObje["results"][index].backdrop_path
                    );
                    this.movies.original_title.push(
                      gelenObje["results"][index].original_title
                    );
                    this.movies.release_date.push(
                      gelenObje["results"][index].release_date
                    );
                    this.movies.vote_average.push(
                      gelenObje["results"][index].vote_average
                    );
                  }
                } else {
                }

                let stoplam = gelenObje["total_results"];

                /*for (const sayi of gelenObje["total_results"]) {
                    console.log(gelenObje["results"][sayi].backdrop_path);
                    }*/
              }
            }
          }
        )
        .catch((err) => console.error(err));
      this.card_wiev = true;
    },
    movie_sayfa_getir_BTN() {
      /*DAHA FAZLA GÖSTE BUTONU*/
      this.movies.page_number = this.movies.page_number + 1;
      console.log(this.movies.page_number);
      this.popular_movie_getir(
        20,
        this.movies.page_number,
        this.secilen_tur_global
      );
    },
    türSecimi_Getir_BTN(gelen_tür, tur_name = null) {
      /*Filmler Populer,Keşfet,TV populer olarak ayırlış durumda seçim yapılıyor */
      this.secilen_tür_listesi_name = tur_name;
      this.secilen_tür__name=tur_name
      this.secilen_tur_global = gelen_tür;
      this.movies.backdrop_path = [];
      this.movies.vote_average = [];
      this.movies.original_title = [];
      this.movies.release_date = [];
      this.movies.overv=[];
      this.movietürgetir(20, this.movies.page_number, gelen_tür, "tr");
    },
    movietürgetir(
      /*Filmler Populer,Keşfet,TV populer HERHANGİ BİRİ SEÇİLDİGİNDE ÇALIŞIR */

      kac_aadet_gelsin = 100,
      page_no = 1,
      movietur = "movie/popular",
      dil
    ) {
      const option = options;
      moviegetir(movietur, page_no, dil)
        .then((response) => response.json())

        .then((gelenObje) => {
          for (const key in gelenObje) {
            if (Object.hasOwnProperty.call(gelenObje, key)) {
              const element = gelenObje[key];

              console.log(element);
              if (key === "results") {
                for (let index = 0; index < kac_aadet_gelsin; index++) {

                  this.movies.overv.push(gelenObje["results"][index]["overview"])
                  this.movies.backdrop_path.push(
                    gelenObje["results"][index].backdrop_path
                  );
                  if (movietur === "discover/tv") {
                    this.movies.original_title.push(
                      gelenObje["results"][index].name
                    );
                    this.movies.release_date.push(
                      gelenObje["results"][index].first_air_date
                    );
                  } 
                  else {
                    this.movies.original_title.push(
                      gelenObje["results"][index].original_title
                    );
                    this.movies.release_date.push(
                      gelenObje["results"][index].release_date
                    );
                  }

                  this.movies.vote_average.push(
                    gelenObje["results"][index].vote_average
                  );
                }
              } else {
              }

              let stoplam = gelenObje["total_results"];
            }
          }
        })
        .catch((err) => console.error(err));
      this.card_wiev = true;
    },
    movie_konu_iceriklieri_get() {
      /*Filmlerim  konularının isimlerini id getirior kullanmak için kullanmalısın
       */
      moviegetir("genre/movie/list", this.movies.page_number, "en")
        .then((response) => response.json())

        .then((gelenObje) => {
          for (const key in gelenObje) {
            if (Object.hasOwnProperty.call(gelenObje, key)) {
              const element = gelenObje[key];

              element.forEach((elaman) => {
                this.movies.konular.id.push(elaman.id);
                this.movies.konular.isim.push(elaman.name);
              });
            }
          }
        })
        .catch((err) => console.error(err));
    },
   card_datay(idnumber,nesne,aciklama)
   {
    
    this.pop_up="goster"
    const tablo=document.getElementById("pop") //ekleme yapılacak alan
    tablo.innerHTML=""
    

    const copy=document.getElementById(idnumber)
    let kopyala=copy.cloneNode(true)
    kopyala.style.height="none"
    kopyala.classList.remove("card-inf")
    kopyala.classList.add("card-container")
    if(aciklama === ""){ 
        aciklama="Bilgi Bulunamadı"
      }

   const overvie=document.createElement("div")
    overvie.classList.add("respo")
    /*verilen respo class App.vue içinden deger ataması degiştirem yapılıcak */

    overvie.innerHTML=aciklama
    tablo.appendChild(kopyala)
    tablo.appendChild(overvie)




   },

   
  },
};
</script>

<style scoped>
#pop{
  display: flex;
  align-items: center;
  background-color: white;
  border: #fed32f 2px solid;
  border-radius: 5px;
  
}
.acikla{
  display: block;
}
.card-info-click{
  position:fixed;
  top: 0%;
  z-index: 1840;
  width: 40%;
  height: 100%;
}
.card-info-click-btns{
  display: flex;
  justify-content: flex-end;

}
.btn-close {
  margin: 0px 5px;
  border: 2px solid #fed32f;
    position: relative;
    top: 40px;
    z-index: 1680;
  
}
.btn-close:hover{background-color: #fed32f;}
.btn-close:focus{ transform: scale(.9); }
.card-info-click-btns > button:nth-child(2) {
  position: absolute;

    top: 29px;
    z-index: 1950;
    right: -13px;
    margin-right: 15px;
    /* height: 120px; */
    width: 35px;
    border: 0px;
    background-color: #fed32f;
    color: #1b1b1b;
    font-size: 24px;
}
.btn-add-hover:hover{
  cursor: move;
  background-color: #1b1b1b !important;
  color: #fed32f !important;
}
.btn-add-hover:focus{
  transform: scale(.9);
}
.dflex{
    display: flex;
    justify-content: space-evenly;
}


.gizle {
  visibility: hidden;
}
.goster {
  visibility: visible;
}
#tablo {
  position: relative;
}
.card-datay-click {
  position: fixed;
  top: 5%;
  left: 25%;
  z-index: 1653;
  width: 50%;
}
.card-datay-click:hover {
}
.color-white {
  color: white;
}
.liste-tür {
  /* 
    position: sticky;
    top: 0px;
    z-index: 1453;*/
}
ul {
  margin: 0px;
  padding: 0px;
  display: flex;
  justify-content: center;
}
li {
  list-style-type: none;
  color: aliceblue;
  font-size: 24px;
  margin: 0px 1rem;
  padding: 10px;
}
.liste-li:hover {
  background-color: #fed32f;
  color: #1b1b1b;
  border-radius: 5px;
  transform: scale(0.7);
}

li:hover {
  border: none;
  transition: 1s;
  cursor: pointer;
}
.liste-hr {
  height: 5px;
  background-color: #fed32f;
}
.Home {
  width: 100%;
  min-height: 100%;
  background-color: #1b1b1b;
  padding-top: 0px !important;
}
.Home-container {
  height: 100%;
}
.respo{
  width: 50%;
}


@media (min-width: 320px) and (max-width:375px) 
{
  .liste-li { font-size: 12px;}
  #pop{
    flex-direction: column !important;
  }  

 .goster{
   width: 100%;
  }
  .card-info-click-btns{
    width: 320px;
    top: 10%;
  height: max-content;
  }
  .btn-add-hover{
    right: 0px !important;
    left:0px;
  }
  .btn-close{
    position: relative;
    top: 40px;
    z-index: 1680;
  }

}
@media (min-width: 375px) and (max-width:425px) 
{
  #pop{
    flex-direction: column !important;
    width: 350px;
  }  

 .goster{

  left:5%;
  }
  .card-info-click-btns{
    width: 320px;
    top: 10%;
  height: max-content;
  }
  .btn-add-hover{
    right: 0px !important;
    left:0px;
  }
  .btn-close{
    position: relative;
    top: 40px;
    z-index: 1680;
  }
 
}
@media (min-width: 425px) and (max-width:630px) 
{
  .card-img{display: none;}
  #pop{
    flex-direction: column !important;
   
    max-width: 400px;
  } 
 .goster{

  left:10%;
  width: 400px;
  }
  .card-info-click-btns{
    top: 10%;
   
    
  }
  .btn-add-hover{
    right: 0px !important;
    left:0px;
  }
  .btn-close{
    position: relative;
    top: 40px;
    z-index: 1680;
  }
 
 
}
@media (min-width: 630px) and (max-width:768px) 
{
  .card-img{display: none;}
  #pop{
    flex-direction: column !important;
   
    max-width: 400px;
  } 
 .goster{

  left:20%;
  width: 400px;
  }
  .card-info-click-btns{
    top: 10%;
   
    
  }
  .btn-add-hover{
    right: 0px !important;
    left:0px;
  }
  .btn-close{
    position: relative;
    top: 40px;
    z-index: 1680;
  }
 
 
}
@media (min-width: 768px) and (max-width:1024px) 
{
 .goster{

  left:25%;
  }
  .card-info-click-btns{
    width:100%;
    top: 10%;
    flex-direction: row;
    
  }
  .card-info-click {
    width: 63%;
  }
  .btn-add-hover{
    right: 0px !important;
    left:0px;
  }
}
@media (min-width: 1024px) and (max-width:1444px) 
{
 .goster{

  left:25%;
  }
  .card-info-click-btns{
    width:100%;
    top: 10%;
    flex-direction: row;
    
  }
  .card-info-click {
    width: 63%;
  }
  .btn-add-hover{
    right: 0px !important;
    left:0px;
  }
}
@media (min-width: 1444px) and (max-width:1920px) 
{
 .goster{

  left:25%;
  }
  .card-info-click-btns{
    width:100%;
    top: 10%;
    flex-direction: row;
    
  }
  .card-info-click {
    width: 63%;
  }
  .btn-add-hover{
    right: 0px !important;
    left:0px;
  }
}
/**
.card-info-click-btns{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

}

*/

</style>
