<template>
    
    <div class="modal-container" :style="!props.isVisible ? 'display:none;':'display:flex;'">
        <div class="modal">
            <div class="modal-title-container">
                <h2>{{ props.title }}</h2>
                <div><button @click="emits('onClose')" style="background-color: transparent; min-width: none; display: flex; justify-content: flex-end;"><CloseIcon/></button></div>
            </div>
            
            <div class="modal-slot-container">
                <slot></slot>
            </div>

            <div class="modal-buttons-container">
                <button @click="emits('onClose')" >Cancel</button>
                <button @click="emits('onSubmit')" >Submit</button>
            </div>
            


        </div>

    </div>
</template>

<script setup lang="ts">
import CloseIcon from 'vue-material-design-icons/Close.vue';

const props = defineProps<{
    title:string;
    isVisible:boolean;
}>();

const emits = defineEmits(["onClose", "onSubmit"])


</script>

<style>
.modal-container{
    background-color: rgba(25, 25, 25, 0.976);
    width: 100vw;
    min-height: 100vh;
    height: max-content;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9;
    padding: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    
}

.modal {
    z-index: 10;
    min-height: 50vh;
    max-height: 90vh;
    min-width: 50%;
    background-color: var(--color6);
    padding: 1vh;
    border-radius: var(--default-radius);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.modal-slot-container{
    width: 100%;
    min-height: 40vh;
    padding: 1vh 0;
}

.modal-buttons-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.modal button {
    border: none;
    height: 3vw;
    border-radius: var(--default-radius);
    margin-left: 1vh;
    min-width: 7vw;
    font-size: 2vh;
    background-color: var(--color3);
}

.modal-title-container{
    display: flex;
    justify-content: space-between;

}



</style>