<template>
  <div>
    <div class="knights-container">
      <weapon-card v-for="weapon in weapons" :weapon="weapon" @onDelete="handleDelete" @onEdit="handleEdit"></weapon-card>
      <controls-card :pagination="pagination" @onCreate="handleCreate" @onPaginationChange="handleChangePagination" />



    </div>
    <modal-component :isVisible="isModalVisible" :title="currentOp + ' Weapon'" @onClose="handleClose" @onSubmit="handleSubmit">
      <div style="height: 100%;">
        <div class="modal-field">
          <h3>Name</h3>
          <input type="text" v-model="form.name" />
        </div>

        <div class="modal-field">
            <h3>Attribute</h3>
            <select v-model="form.keyAttribute">
              <option v-for="attr in getAttributesArray().sort()" :value="attr"> {{ capitalizeFirstLetter(attr) }}</option>
            </select>
        </div>

        <div class="modal-field">
          <h3>Mod</h3>
          <input type="text" v-model="form.mod" />
        </div>


      </div>
    </modal-component>

  </div>

</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { axiosInstance } from '@/utils/axios';
import ControlsCard from '@/components/ControlsCard.vue';
import { INITIAL_PAGINATION, IPagination } from '@/utils/types/pagination';
import ModalComponent from '@/components/ModalComponent.vue';
import { getAttributesArray } from '@/utils/types/attributes';
import { IWeapon } from '@/utils/types/weapons';
import { useLoading } from 'vue-loading-overlay';
import WeaponCard from '@/components/WeaponCard.vue';

const INITIAL_FORM:IWeapon = {
    _id:"",
    name:"",
    mod: 0,
    keyAttribute: "",


}

const pagination = ref<IPagination>(INITIAL_PAGINATION);
const isModalVisible = ref<boolean>(false);
const currentOp = ref<"Create"|"Edit">("Create");
const weapons = ref<IWeapon[]>([]);
const form = ref<IWeapon>({...INITIAL_FORM});
const loader = useLoading();



onMounted(async()=>{
    await getWeapons();
})

watch(()=> isModalVisible.value, ()=> {
  const body = document.querySelector("body");
  if(isModalVisible.value){
    if(body) body.style.overflowY = "hidden";
    window.scrollTo(0,0)
  } else {
    if(body) body.style.overflowY = "auto";
  }
  
  
})


async function getWeapons(){
  await axiosInstance.get(`/weapons/get?limit=${pagination.value.limit}&page=${pagination.value.page}`)
    .then(res => {      
      weapons.value = res.data.data.result;
      
    });  
}

function handleCreate(){
  isModalVisible.value = true;
}

function handleClose(){
  isModalVisible.value = false;
  form.value = {...INITIAL_FORM};
}

function handleEdit(body: IWeapon){
  form.value = {...body};
  currentOp.value = "Edit";
  isModalVisible.value = true;
  
}

function capitalizeFirstLetter(str:string) {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function handleSubmit(){
  const showing = loader.show();
  const dto = createUpdateDto();
  if(currentOp.value === "Create"){
    await axiosInstance.post("/weapons/create", dto)
    .then(async (res) => {
      alert(res.data.messages[0].message)

      if(res.data.messages[0].success){
        await getWeapons();
        handleClose();
        showing.hide();
      }
      
    })
    .catch(err => {
      alert(err.message);
      console.log(err);
      showing.hide();
      
    });  

  } else if (currentOp.value === "Edit" && form.value._id) {    
    await axiosInstance.patch("/weapons/update/"+ form.value._id, dto)
    .then(async (res) => {
      if(res.data.messages){
        alert(res.data.messages[0].message)

        if(res.data.messages[0].success){
          await getWeapons();
          handleClose();
          showing.hide();
        }
      }
    })
    .catch(err => {
      alert(err.message);
      console.log(err);
      showing.hide();
      
    });  
    
  }
}


function createUpdateDto():IWeapon{

  return {
    name:form.value.name,
    keyAttribute: form.value.keyAttribute,
    mod: form.value.mod

  }
}


async function handleChangePagination(pag:IPagination){
  pagination.value = pag;
  await getWeapons();
  
}

async function handleDelete(id:string){
  const showing = loader.show();
  await axiosInstance.delete("/weapons/delete/"+ id)
    .then(async (res) => {
      if(res.data.messages){
        alert(res.data.messages[0].message)

        if(res.data.messages[0].success){
          await getWeapons();
          showing.hide();
        }
      }
    })
}

</script>

<style scoped>
  .knights-container {
    width: 100%;
    height: fit-content;
    min-height: 99vh;
    /* height: 99vh; */
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    row-gap: 1vh;
    column-gap: 1vh;
  }
  
  .modal-field{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 2vh;
    
  }

  .modal-field input,select{
    width: 100%;
    border: none;
    height: 2vw;
    border-radius: var(--default-radius);
    margin-top: 1vh;   
    padding: 0 1vh;
    font-size: 1.5vh;
  }

  .modal-space-between {
    width: 100%;
    display: flex; 
    flex-direction: row; 
    justify-content: space-between;

    
  }

  .modal-field .minus-button {
    background-color: var(--color-danger);
  }

  .weapons-table-item{
    width: 25%; display: flex; justify-content: flex-start;
  }

  .weapon-container{
    display: flex; 
    justify-content: space-between;
    width: 100%; 
    margin-top: 1vh;
  }
</style>
