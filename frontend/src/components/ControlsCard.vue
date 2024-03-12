<template>
    <div class="card-container controls-card" >
        <div class="card-row" style="margin-top: 0;">
            <button v-if="!props.disableAdd" @click="emits('onCreate')">
                <PlusIcon />
            </button>
        </div>

        <div style="width: 100%;">

            <div class="card-row">
                <h3>Items per page:</h3>
                <select v-model="props.pagination.limit" @change="emits('onPaginationChange', {...props.pagination})">
                    <option value="9"> &nbsp; 9</option>
                    <option value="29">&nbsp; 29</option>
                    <option value="49">&nbsp; 49</option>
                    
                </select>
            </div>

            <div class="card-row">
                <button :disabled="`${props.pagination.page}` === `1`" @click="emits('onPaginationChange', {...props.pagination, page: Number.parseInt(`${props.pagination.page}`) -1})">
                    <ArrowLeftIcon />
                </button>

                <div class="paginator">
                    <p>{{ props.pagination.page }}</p>
                    <p>/</p>
                    <p>{{ props.pagination.totalPages }}</p>
                </div>

                <button :disabled="`${props.pagination.page}` === `${props.pagination.totalPages}`" @click="emits('onPaginationChange', {...props.pagination, page: Number.parseInt(`${props.pagination.page}`) + 1})">
                    <ArrowRightIcon />
                </button>
            </div>

        </div>


    </div>
</template>

<script setup lang="ts">
import PlusIcon from 'vue-material-design-icons/Plus.vue';
import ArrowLeftIcon from 'vue-material-design-icons/ArrowLeft.vue';
import ArrowRightIcon from 'vue-material-design-icons/ArrowRight.vue';

const props = defineProps<{
    pagination: {page:number, totalPages:number, limit:number},
    disableAdd?: boolean
}>();
const emits = defineEmits(["onCreate", "onPaginationChange"]);

</script>

<style>


.search-container{
    width: 100%;
    display: flex;
    padding-bottom: 1vh;
}


.controls-card{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
}

.controls-card button {
    width: 3vw;
    height: 3vw;
    border: none;
    background-color: var(--color3);
    border-radius: var(--default-radius);
}   
.controls-card button:hover {
    cursor: pointer;
}

.card-row{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 1vh;
    align-items: center;
}

.paginator{
    display: flex;
    align-items: center;
}

.controls-card select{
    width: 3vw;
    height: 3vw;
    border-radius: var(--default-radius);
    
    font-size: 0.8vw;
}
</style>