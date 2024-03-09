<template>
  <default-layout>
    <router-view/>
  </default-layout>
</template>

<script setup lang="ts">
  import DefaultLayout from './components/templates/DefaultLayout.vue';
</script>

<style>
@import url("./utils/style.css");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* font-family: "Open Sans", sans-serif; */
  /* font-family: "Ojuju", sans-serif; */
  font-family: "Montserrat", sans-serif;
}

#app {
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--color0);
}
</style>
