<template>
    <div class="knight-card-container" >
        <div class="knight-card-controls">
            <button class="view-button" @click="isDetailed = true">
                <EyeIcon />
            </button>
            <button v-if="!props.disableDelete" class="delete-button" @click="emits('onDelete', props.knight._id)">
                <TrashCanIcon />
            </button>
        </div>
        <hr>
        <div class="knight-info" :style="isDetailed ? 'filter: blur(6px)' : ''">
            <div class="knight-img">
                <img src="../../public/images/knight-icon.png" alt="">
            </div>
            <div class="knight-card-info"><h2>Name: &nbsp;</h2> <h2>{{ props.knight.name }}</h2></div>
            <div class="knight-card-info"><h2>Nickname: &nbsp;</h2> <h2>{{ props.knight.nickname }}</h2></div>
            <!-- <div class="knight-card-info"><h2>Nickname:</h2> <h2>{{ props.knight.attributes }}</h2></div> -->
        </div>

        <div :class="`info-section ${!!isDetailed && 'info-on'}`">
            <div class="knight-card-controls">
                <button class="view-button" @click="isDetailed = false">
                    <EyeClosedIcon />
                </button>

                <button v-if="!props.disableEdit" class="edit-button" @click="emits('onEdit', knight)">
                    <PenIcon />
                </button>


            </div>
            <hr>
            <div class="knight-info scrollable">
                <div class="knight-card-info"><h2>Basics</h2></div>
                <div class="knight-card-info"><h3>Name: &nbsp;</h3> <h3>{{ props.knight.name }}</h3></div>
                <div class="knight-card-info"><h3>Nickname: &nbsp;</h3> <h3>{{ props.knight.nickname }}</h3></div>
                <div class="knight-card-info"><h3>Birthday: &nbsp;</h3> <h3>{{ formatDateYYYYmmdd(props.knight.birthday) }}</h3></div>
                <hr>
                <div class="knight-card-info"><h2>Attributes</h2></div>
                <div class="knight-card-info" v-for="[key, value] in Object.entries(props.knight.attributes)"><h3>{{key}}: &nbsp;</h3> <h3>{{ value }}</h3></div>
                <hr>

                <div class="knight-card-info"><h2>Status</h2></div>
                <div class="knight-card-info"><h3>Experience: &nbsp;</h3> <h3>{{ props.knight.experience }}</h3></div>
                <div class="knight-card-info"><h3>Attack: &nbsp;</h3> <h3>{{ props.knight.attack }}</h3></div>

                <hr>

                <div class="knight-card-info"><h2>Equipped Weapon</h2></div>
                <div v-if="props.knight.equipped && props.knight.equipped.length" class="knight-info" style="width: 100%;">
                    <div class="knight-card-info"><h3>Name: &nbsp;</h3> <h3>{{ props.knight.equipped[0].name }}</h3></div>
                    <div class="knight-card-info"><h3>Key Attribute: &nbsp;</h3> <h3>{{ props.knight.equipped[0].keyAttribute }}</h3></div>
                    <div class="knight-card-info"><h3>Mod: &nbsp;</h3> <h3>{{ props.knight.equipped[0].mod }}</h3></div>
                </div>
                <div class="knight-card-info" style="width: 100%;" v-else>
                    <div class="knight-card-info"><h3>None &nbsp;</h3></div>
                </div>

                <hr>
                <div class="knight-card-info"><h2>All Weapons</h2></div>
                <div v-if="props.knight.weapons && props.knight.weapons.length" v-for="weapon, index in props.knight.weapons" style="width: 100%; display: flex; align-items: flex-start; flex-direction: column;">
                    <div class="knight-card-info"><h3>Name: &nbsp;</h3> <h3>{{ weapon.name }}</h3></div>
                    <div class="knight-card-info"><h3>Key Attribute: &nbsp;</h3> <h3>{{ weapon.keyAttribute }}</h3></div>
                    <div class="knight-card-info"><h3>Mod: &nbsp;</h3> <h3>{{ weapon.mod }}</h3></div>
                    <hr v-if="index !== props.knight.weapons.length - 1" style="width: 10%;" >
                </div>
                <div class="knight-card-info" style="width: 100%;" v-else>
                    <div class="knight-card-info"><h3>None &nbsp;</h3></div>
                </div>
                

                <!-- <div class="knight-card-info"><h2>Birthday: &nbsp;</h2> <h2>{{ props.knight.}}</h2></div> -->
            </div>
            <hr>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IKnight } from '@/utils/types/knights';
import { ref } from 'vue';
import PenIcon from 'vue-material-design-icons/Pen.vue';
import TrashCanIcon from 'vue-material-design-icons/TrashCan.vue';
import EyeIcon from 'vue-material-design-icons/Eye.vue';
import EyeClosedIcon from 'vue-material-design-icons/EyeClosed.vue';

const props = defineProps<{
    knight: IKnight,
    disableEdit?: boolean,
    disableDelete?:boolean
}>();

const emits = defineEmits(["onEdit", "onDelete"])
const isDetailed = ref<boolean>(false);

function formatDateYYYYmmdd(input: string|Date) {
    const date = new Date(input);    
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate() + 1}`
}


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