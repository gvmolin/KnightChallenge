import { defineStore } from "pinia";
import { computed, ref } from "vue";


export const useMenuStore = defineStore('menuStore', () => {
    const isActive = ref<boolean>(false);

    function setActive(value:boolean){
        console.log("here");
        console.log(value);
        
        isActive.value = value;
    }
  
    return { isActive, setActive }
  })