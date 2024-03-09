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
</style>
