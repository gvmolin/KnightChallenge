<template>
  <div class="knights-container">
    <div style="background-color: antiquewhite; height: 100%; width: 100%;"></div>
    <div style="background-color: antiquewhite; height: 100%; width: 100%;"></div>
    <div style="background-color: antiquewhite; height: 100%; width: 100%;"></div>
    <div style="background-color: antiquewhite; height: 100%; width: 100%;"></div>
    <div style="background-color: antiquewhite; height: 100%; width: 100%;"></div>
    <div style="background-color: antiquewhite; height: 100%; width: 100%;"></div>
    <div style="background-color: antiquewhite; height: 100%; width: 100%;"></div>
    <div style="background-color: antiquewhite; height: 100%; width: 100%;"></div>
  </div>  
</template>

<script lang="ts" setup>
import KnightCard from '@/components/KnightCard.vue';
import { useFetch } from '@vueuse/core';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { axiosInstance } from '@/utils/axios';

const knights = ref<any>([]);

onMounted(async()=>{
    await getKnights()
})

async function getKnights(){
  console.log("here");
  

  await axiosInstance.get("/knights/get")
    .then(res => {
      console.log(res);
      
    })
    console.log("aa");
    

  // console.log(mountDefaultPath());
  // const url = mountDefaultPath() + "knights/get";
  // console.log(url);
  
  // await axios.get(url).then(res=> {
  //   console.log(res);
    
  // })
  

  //  const teste = await useFetch(url)
  //   .get()
    // .then(({ isFetching, error, data }) => {

    //   console.log(data);
    //   // knights.value = res.data;

      
    // })
    // console.log(teste.response);
    
}

</script>

<style>
  .knights-container {
    width: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    row-gap: 1vh;
    column-gap: 1vh;
  }
</style>@/utils/fetch@/utils/axios
