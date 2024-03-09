<template>
    <div 
        :class="`header-container ${isOpen ? 'header-opened' : 'header-closed'}`"
    >
        
        <div class="logo-container">
            <p class="logo-icon"><ChessKnightIcon/></p>
            <h2 
                :class="`logo ${isOpen ? 'logo-open' : 'logo-close'}`"
            >
                KnightsChallenge
            </h2>
        </div>

        <nav>
            <button> 
                <ChessKnightIcon/> 
                <p :class="(isOpen && delayedTrigger) ? 'p-open' : 'p-closed'">
                    Knights
                </p> 
            </button>

            <button> 
                <SwordIcon/> 
                <p :class="(isOpen && delayedTrigger) ? 'p-open' : 'p-closed'">
                    Weapons
                </p> 
            </button>

            <button> 
                <PlusNetworkIcon/> 
                <p :class="(isOpen && delayedTrigger) ? 'p-open' : 'p-closed'">
                    Account
                </p> 
            </button>

            <button> 
                <AccountCogIcon/> 
                <p :class="(isOpen && delayedTrigger) ? 'p-open' : 'p-closed'">
                    Session
                </p> 
            </button>
            <button> 
                <LogoutIcon/> 
                <p :class="(isOpen && delayedTrigger) ? 'p-open' : 'p-closed'">
                    Logout
                </p> 
            </button>
        </nav>

        <button @click="handleSwitchButton" class="header-switch-button">
            <MenuIcon v-if="!isOpen"/>
            <CloseIcon v-else />
        </button>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import ChessKnightIcon from 'vue-material-design-icons/ChessKnight.vue';
import CloseIcon from 'vue-material-design-icons/Close.vue';
import LogoutIcon from 'vue-material-design-icons/Logout.vue';
import AccountCogIcon from 'vue-material-design-icons/AccountCog.vue';
import SwordIcon from 'vue-material-design-icons/Sword.vue';
import PlusNetworkIcon from 'vue-material-design-icons/PlusNetwork.vue'
import { useMenuStore } from "@/store/menu-store";

const isOpen = ref<boolean>();
const delayedTrigger = ref<boolean>();
const menuStore = useMenuStore();

onMounted(()=>{
    isOpen.value = menuStore.isActive;
    console.log(isOpen.value);
    
})

menuStore.$onAction(({name, store, args})=> {
    isOpen.value = args[0];
    setTimeout(()=> {
        delayedTrigger.value = isOpen.value;
    }, 1000)
    
    
}, true);

function handleSwitchButton(){
    menuStore.setActive(!menuStore.isActive);
}

</script>

<style scoped>
    .header-container {
        height: 100vh;
        background-color: var(--color3);
        padding: var(--default-padding);

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        position: fixed;
        top: 0;
        left: 0;
        
        transition: 1s;

        border-top-right-radius: 1vh;
        border-bottom-right-radius: 1vh ;

        -webkit-box-shadow: 4px 4px 13px -3px rgba(0,0,0,0.75);
        -moz-box-shadow: 4px 4px 13px -3px rgba(0,0,0,0.75);
        box-shadow: 4px 4px 13px -3px rgba(0,0,0,0.75);

    }

    .header-opened {
        width: 15vw;
        transition-duration: 1s;
    }

    .header-closed{
        width: 5vw;
        transition-duration: 1s;
        transition-delay: 0.5s;
    }

    .logo-container{
        /* color: var(--color1); */
        margin-top: 2vh;
        font-size: 2vh;
        
    }

    .logo-close {
        /* opacity: 0; */
        opacity: 0;

        transition: 0.5s;
        transition-delay: 0s;
        
    }

    .logo-open{
        opacity: 1;
        transition: 0.5s linear;
        transition-delay: 0.5s;


        /* color: var(--color0); */
        

    }

    .logo-icon {
        transform: scale(2);
    }

    .header-switch-button {
        width: 100%;
        height: 5vh;
        border: none;
        background-color: var(--color1);
        color: var(--color5);
        border-radius: 1vh;
    }
    .header-switch-button:hover{
        cursor:pointer;
        transform: scale(1.02);
        transition: 0.3s;
    }

    nav{
        height: 50vh;
        width: 100%;

    }

    nav button {
        width: 100%;
        height: 5vh;
        border: none;
        background-color: transparent;
        color: var(--color0);
        border-radius: 1vh;
        margin-bottom: 3vh;
        
        font-size: 2vh;
    }

    nav button:hover{
        cursor: pointer;
        transform: scale(1.04);
        transition: 0.3s;
    }

    .p-open{
        opacity: 1;
        transition: 0.25s linear;
        /* transition-delay: 0.25s; */
    }

    .p-closed{
        opacity: 0;
        transition: 0.5s;
    }

</style>