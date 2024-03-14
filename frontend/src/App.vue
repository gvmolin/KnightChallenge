<template>
  <default-layout v-if="route.name !== 'Login'">
    <router-view/>
  </default-layout>

  <router-view v-else></router-view>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import DefaultLayout from './components/templates/DefaultLayout.vue';
  const route = useRoute();
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

button:hover{
  cursor: pointer;

}

        /* width */
::-webkit-scrollbar {
  width: var(--scrollbar-width);
}

/* Track */
::-webkit-scrollbar-track {
  background: var(--color5);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--color3);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

#app {
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--color0);
}
</style>
