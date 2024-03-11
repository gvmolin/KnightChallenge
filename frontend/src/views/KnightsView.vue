<template>
  <div>
    <div class="knights-container">
      <knight-card v-for="knight in knights" :knight="knight" @onDelete="handleDelete" @onEdit="handleEdit"></knight-card>
      <controls-card :pagination="pagination" @onCreate="handleCreate" @onPaginationChange="handleChangePagination" />



    </div>
    <modal-component :isVisible="isModalVisible" :title="currentOp + ' Knight'" @onClose="handleClose" @onSubmit="handleSubmit">
      <div style="height: 100%;">
        <div class="modal-field">
          <h3>Name</h3>
          <input type="text" v-model="form.name" />
        </div>

        <div class="modal-field">
          <h3>Nickname</h3>
          <input type="text" v-model="form.nickname"/>
        </div>

        <div class="modal-field modal-space-between">
          <div style="width: 49%; display: flex; flex-direction: column; align-items: flex-start;">
            <h3>Birthday</h3>
            <input type="date" v-model="form.birthday" min="1900-06-01T08:30"/>
          </div>

          <div style="width: 49%; display: flex; flex-direction: column; align-items: flex-start;">
            <h3>Attribute</h3>
            <select v-model="form.keyAttribute">
              <option v-for="attr in getAttributesArray().sort()" :value="attr"> {{ capitalizeFirstLetter(attr) }}</option>
            </select>
          </div>
        </div>

        
        <div class="modal-field">
          <div class="modal-field modal-space-between">
            <div v-for="attr in getAttributesArray().sort()" style="width: 15%; display: flex; flex-direction: column; align-items: flex-start;">
              <h3> {{capitalizeFirstLetter(attr)}} </h3>
              <input type="text" v-model="form.attributes[attr]"/>
            </div>  
          </div>

        </div>

        <div class="modal-field">
          <h3>Weapons</h3>

          <div v-if="form.weapons.length" class="weapon-container">
            <h4 class="weapons-table-item">Name:</h4>
            <h4 class="weapons-table-item">Attribute:</h4>
            <h4 class="weapons-table-item">Mod:</h4>
            <h4 class="weapons-table-item"></h4>
          </div>
          <div v-for="weapon in form.weapons" style="width: 100%;">
            <div class="weapon-container">
              <h4 class="weapons-table-item">{{ weapon.name }}</h4>
              <h4 class="weapons-table-item">{{ weapon.keyAttribute }}</h4>
              <h4 class="weapons-table-item">{{ weapon.mod }}</h4>
              <div class="weapons-table-item" style="justify-content: flex-end;">
                <button
                  style="height: 2vw; width: 2vw;" class="minus-button"
                  @click="form.weapons = form.weapons.filter(obj => obj._id !== weapon._id)"
                >
                  <MinusIcon />
                </button>
              </div>
            </div>
          </div>

          <div style="display: flex; width: 100%; align-items: center; justify-content: space-between;">
            <select v-model="currentWeapon" style="width: 100%;">
              <option v-for="weapon in weapons" :value="weapon">{{ `${weapon.name} / ${weapon.keyAttribute} / ${weapon.mod}` }}</option>
            </select>

            <button style="height: 2vw; margin-left: 0; margin-left: 1vh; margin-top: 1vh;"
              @click="!!currentWeapon && form.weapons.push(currentWeapon)">
              <PlusIcon></PlusIcon>
            </button>
          </div>
        </div>
        
        <div class="modal-field">
          <h3>Equipped weapon</h3>
          <select v-model="form.equipped" style="width: 100%;">
              <option v-for="weapon in form.weapons" :value="weapon">{{ `${weapon.name} / ${weapon.keyAttribute} / ${weapon.mod}` }}</option>
          </select>
        </div>

      </div>
    </modal-component>

  </div>

</template>

<script lang="ts" setup>
import KnightCard from '@/components/KnightCard.vue';
import { onMounted, ref, watch } from 'vue';
import { axiosInstance } from '@/utils/axios';
import { IKnight } from '@/utils/types/knights';
import ControlsCard from '@/components/ControlsCard.vue';
import { INITIAL_PAGINATION, IPagination } from '@/utils/types/pagination';
import ModalComponent from '@/components/ModalComponent.vue';
import { getAttributesArray } from '@/utils/types/attributes';
import { IWeapon } from '@/utils/types/weapons';
import PlusIcon from 'vue-material-design-icons/Plus.vue';
import MinusIcon from 'vue-material-design-icons/Minus.vue';
import { useLoading } from 'vue-loading-overlay';

const INITIAL_FORM:IKnight = {
    _id:"",
    name:"",
    nickname:"",
    weapons: [],
    attributes: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0, 
    },
    birthday: "",
    equipped: {},
    keyAttribute: ""
}

const knights = ref<IKnight[]>([]);
const pagination = ref<IPagination>(INITIAL_PAGINATION);
const isModalVisible = ref<boolean>(false);
const currentOp = ref<"Create"|"Edit">("Create");
const weapons = ref<IWeapon[]>([]);
const currentWeapon = ref<IWeapon>();
const form = ref<IKnight>({...INITIAL_FORM});
const loader = useLoading();



onMounted(async()=>{
    await getKnights();
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

async function getKnights(){
  const showing = loader.show();
  await axiosInstance.get(`/knights/get?limit=${pagination.value.limit}&page=${pagination.value.page}`)
    .then(res => {
      knights.value = res.data.data.result;
      pagination.value = res.data.data.pagination;
      showing.hide();
    });  
}

async function getWeapons(){
  await axiosInstance.get("/weapons/get?limit=99999&page=1")
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

function handleEdit(body: IKnight){
  form.value = {...body};
  currentOp.value = "Edit";
  isModalVisible.value = true;
  form.value.birthday = formatDateYYYYmmdd(form.value.birthday);  
  setTimeout(()=> {
    form.value.equipped = {...body.equipped[0]};
      
  }, 100)
  
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
    await axiosInstance.post("/knights/create", dto)
    .then(async (res) => {
      alert(res.data.messages[0].message)

      if(res.data.messages[0].success){
        await getKnights();
        handleClose();
        showing.hide();
      }
      
    })
    .catch(err => {
      alert(err.message);
      console.log(err);
      
    });  

  } else if (currentOp.value === "Edit" && form.value._id) {    
    await axiosInstance.patch("/knights/update/"+ form.value._id, dto)
    .then(async (res) => {
      if(res.data.messages){
        alert(res.data.messages[0].message)

        if(res.data.messages[0].success){
          await getKnights();
          handleClose();
          showing.hide();
        }
      }
    })
    .catch(err => {
      alert(err.message);
      console.log(err);
      
    });  
    
  }
}


function createUpdateDto():IKnight{
  const date = new Date(form.value.birthday)

  return {
    name:form.value.name,
    nickname:form.value.nickname,
    weapons: form.value.weapons,
    attributes: form.value.attributes,
    birthday: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`,
    equipped: form.value.equipped,
    keyAttribute: form.value.keyAttribute

  }
}

function formatDateYYYYmmdd(input: string|Date) {
    const date = new Date(input);        
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`;
}


async function handleChangePagination(pag:IPagination){
  pagination.value = pag;
  await getKnights()
  
}

async function handleDelete(id:string){
  const showing = loader.show();
  await axiosInstance.delete("/knights/delete/"+ id)
    .then(async (res) => {
      if(res.data.messages){
        alert(res.data.messages[0].message)

        if(res.data.messages[0].success){
          await getKnights();
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
