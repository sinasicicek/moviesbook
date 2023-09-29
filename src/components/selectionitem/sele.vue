<template>
    <div>
        <select name="" @change="türGonder($event)">
            <option value="movie/popular" >Popular Filmler</option>
            <option value="trending/movie/day" >Günün trending Filmleri</option>
            <option value="discover/movie" >Keşfet</option>

        </select>
    </div>
</template>
<script>
export default {
    data() {
        return {
            secilentur:"movie"
        }
    },
    methods: {
        
        türGonder(secim){ this.secilentur=secim.target.value
            this.$emit("secilenTur",this.secilentur) 
        }
    },
};
</script>

<style scoped></style>
