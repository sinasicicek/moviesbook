<template>
    <div>
        <select for="" @change="konuGonder($event)"> 
            <option v-for="(item,index) in konularid" :key="index"  :value="item">{{ konularname[index] }}</option>
        </select>

    </div>
</template>
<script>
export default {
    data() {
        return {
            movie_tür_konu:"",

        }
    },
    props:["konularid","konularname"],

    methods: {
        konuGonder(secim){ this.$emit("secilenKonu",secim.target.value) }
    },
};
</script>

<style scoped></style>
