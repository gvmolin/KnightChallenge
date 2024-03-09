<template>
    <div>
        <div class="layout-container">
            <header-component></header-component>
            <div :class="`layout-slot-container  ${isMenuActive ? 'menu-opened' : 'menu-closed'}`">
                <slot></slot>
            </div>

        </div>

    </div>

</template>

<script setup lang="ts">
import { onMounted, watch,ref } from 'vue';
import HeaderComponent from '../HeaderComponent.vue';
import { useMenuStore } from '@/store/menu-store';

const menuStore = useMenuStore();
const isMenuActive = ref<boolean>(true);

onMounted(()=>{
    isMenuActive.value = menuStore.isActive;
    
})

menuStore.$onAction(({name, store, args})=> {
    isMenuActive.value = args[0];
}, true);

</script>

<style scoped>
    .layout-container{
        background-color: var(--color2);
        width: 100%;
        min-height: 100vh;
        height: fit-content;
    }

    .layout-slot-container{
        padding: var(--default-padding);
        width: 100%;
        min-height: 100vh;
        height: fit-content;
    }

    .menu-opened{
        padding-left: 16vw;
        transition: 1s;
        
        /* transition-delay: 0.25s; */
    }

    .menu-closed {
        padding-left: 6vw;
        transition: 1s;
        transition-delay: 0.5s;
    }
</style>