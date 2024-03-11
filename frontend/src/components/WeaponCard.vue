<template>
    <div class="knight-card-container" >
        <div class="knight-card-controls">

            <button class="delete-button" @click="emits('onDelete', props.weapon._id)">
                <TrashCanIcon />
            </button>

            <button class="edit-button" @click="emits('onEdit', weapon)">
                <PenIcon />
            </button>
        </div>
        <hr>
        <div class="knight-info">
            <div class="knight-img">
                <div class="knight-img">
                    <img src="../../public/images/sword.png" alt="">
                </div>
            </div>
            <div class="knight-card-info"><h2>Name: &nbsp;</h2> <h2>{{ props.weapon.name }}</h2></div>
            <div class="knight-card-info"><h2>Attribute: &nbsp;</h2> <h2>{{ props.weapon.keyAttribute }}</h2></div>
            <div class="knight-card-info"><h2>Mod: &nbsp;</h2> <h2>{{ props.weapon.mod }}</h2></div>
        </div>

    </div>
</template>

<script setup lang="ts">
import PenIcon from 'vue-material-design-icons/Pen.vue';
import TrashCanIcon from 'vue-material-design-icons/TrashCan.vue';
import { IWeapon } from '@/utils/types/weapons';

const props = defineProps<{
    weapon: IWeapon
}>();

const emits = defineEmits(["onEdit", "onDelete"])

// const isDetailed = ref<boolean>(false);


</script>

<style scoped>
    .knight-card-container{
        background-color: var(--color6);
        height: 100%; 
        width: 100%;
        

        border-radius: var(--default-radius);
        padding: 1vh;
        display: flex;
        flex-direction: column;
        align-items: center;

        position: relative;
        box-shadow: var(--default-shadow);
    }

    .knight-card-container button{
        border: none;
        width: 3vw;
        height: 3vw;
        margin-left:1vh;
        border-radius: var(--default-radius);
        background-color: var(--color3);
        z-index: 7;
    }
    .knight-card-container button:hover{
        cursor: pointer;
    }

    .knight-card-container hr{
        width: 100%;
        margin: 1vh 0;
    }

    .knight-card-controls {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }

    .knight-card-container .delete-button {
        background-color: var(--color-danger);
    }

    .knight-card-info{
        display: flex;
        width: 100%;
    }   

    .knight-img{
        width: 30vh;
        height: 30vh;
        background-color: white;
        border-radius: var(--default-radius);
        margin-bottom: 1vh;
    }
    .knight-img img{
        width: 30vh;
        height: 30vh;
        transform: scale(0.5);
        opacity: 0.5;
    }

    .knight-info{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .info-section{
        width: 100%;
        height: 100%;
        background-color: rgba(39, 39, 39, 0.543);
        
        position: absolute;
        z-index: 8;
        top: 0;
        border-radius: var(--default-radius);
        padding: 1vh;
        /* padding-right: calc(1vh - var(--scrollbar-width)); */
        display: none;
        color: black;

        

        transition: 1s linear;

    }

    .scrollable{
        overflow-y: scroll;
    }

    .info-on{
        display: flex;
        flex-direction: column;
        transition: 1s linear;
    }
    
</style>