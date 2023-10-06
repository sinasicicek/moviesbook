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



    <div id="card_goster" class="d-flex flex-column">
        
    </div>
    <div
      id="tablo"
      v-if="tablostate"
      class="container d-flex justify-content-center align-items-center flex-wrap Home-container"
    >
      <card
        @click="card_datay(index, $event)"
        :class="movies.detay.boyut"
        class="m-2"
        v-for="(item, index) in movies.backdrop_path"
        :imgsrc="item"
        :key="index"
        :id="index"
        :originaltitle="movies.original_title[index]"
        :releasedate="movies.release_date[index]"
        :voteaverage="movies.vote_average[index]"
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
      card_wiev: true,
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
      this.secilen_tur_global = gelen_tür;
      this.movies.backdrop_path = [];
      this.movies.vote_average = [];
      this.movies.original_title = [];
      this.movies.release_date = [];
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
                  } else {
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
   
   
   
  },
};
</script>

<style scoped>
.s{
    width: 120px !important;
}
.btn-op{
    border: #fed32f;
}
.dflex{
    display: flex;
    justify-content: space-evenly;
}
.btnG{
    width: 100px;

}
.wbtn {
  width: 100%;
  border:0px ;
  color: #fed32f;
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
}
.Home-container {
  height: 100%;
}
</style>
