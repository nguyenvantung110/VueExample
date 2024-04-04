<template lang="">
    <div class="home">
        <spinner v-if="loading"/>
        <!-- <div class="function">
          <button class="btn btn-success" @click="callAPI()">Call API</button>
        </div>
        <div class="list-data">

          <input list="provinces" class="form-control" v-model="selectedProvince" @change="getDistricts(selectedProvince)" type="text"/>
          <datalist id="provinces">
              <option v-for="item in data " name="pro.province_id" >{{item.province_name}}</option>
            </datalist>

          <input list="districts" class="form-control" v-model="selectedDistrict" @change="getWards(selectedDistrict)" type="text"/>
          <datalist id="districts">
              <option v-for="item in districtList " name="pro.province_id" >{{item.district_name}}</option>
            </datalist>

          <input list="wards" class="form-control" v-model="selectedWard" @change="showAddress" type="text"/>
          <datalist id="wards">
              <option v-for="item in wardList " name="pro.province_id" >{{item.ward_name}}</option>
            </datalist>
          <br/>
          <code><pre>{{address}}</pre></code>
        </div> -->
        <div class="btn-group">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
            Default dropdown
          </button>
          <ul class="dropdown-menu">
            <li v-for="item in fullColumnList">
              <input type="checkbox"/>
              <span>{{item?.name}}</span>
            </li>
          </ul>
        </div>
        <table class="table table-striped">
            <thead>
                <th v-for="items in columns">{{items.name}}</th>
            </thead>
            <tbody>
              <tr v-for="items in rows">
                <td :title="item" v-for="item in items">{{item}}</td>
              </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import axios from 'axios';
import spinner from './common-modules/spinner.vue'

const PROVINCE_API_URL = 'https://vapi.vnappmob.com/api/province';
const DISTRICT_API_URL = 'https://vapi.vnappmob.com/api/province/district/';
const WARD_API_URL = 'https://vapi.vnappmob.com/api/province/ward/';

const data = ref(null)
const districtList = ref(null)
const wardList = ref(null)
const address = ref('')

const loading = ref(false)
const error = ref(null)
const selectedProvince = ref(null)
const selectedDistrict = ref(null)
const selectedWard = ref(null)
const fullColumnList = ref(null)

const columns = ref(null)
const rows = ref(null)

async function callAPI(){
  loading.value = true
  axios.get(PROVINCE_API_URL)
  .then((response) => {
    data.value = response?.data?.results
    loading.value = false
  })
  .catch((error) => {
    // Xử lý lỗi
    console.log('Error ' + error)
  }).finally(() => {
    loading.value = false
  });
}

async function getDistricts(val){
  loading.value = true
  const province_id = data.value.find(x => x.province_name === val).province_id

  axios.get(DISTRICT_API_URL + province_id)
  .then((response) => {
    districtList.value = response?.data?.results
    loading.value = false
  })
  .catch((error) => {
    // Xử lý lỗi
    console.log('Error ' + error)
  }).finally(() => {
    loading.value = false
  });
}

async function getWards(val){
  loading.value = true
  const district_id = districtList.value.find(x => x.district_name === val).district_id

  axios.get(WARD_API_URL + district_id)
  .then((response) => {
    wardList.value = response?.data?.results
    loading.value = false
  })
  .catch((error) => {
    // Xử lý lỗi
    console.log('Error ' + error)
  }).finally(() => {
    loading.value = false
  });
}

function showAddress(){
  loading.value = true
  address.value = selectedWard.value !== null ? selectedProvince.value + ', ' + selectedDistrict.value + ', ' + selectedWard.value : ''
  console.log(address.value)
  loading.value = false
}

function getLogAzureAI(){
  loading.value = true
  const apiKey = 'x8ggg4wmaneg8jye5i2r528lysiv0uxul22uop1y';
  const appId = 'e1a4be3a-6b07-4177-8106-7a1bda783991';

  const apiUrl = 'https://api.applicationinsights.io/v1/apps/' + appId + '/query'
const query = encodeURIComponent('traces| where timestamp > datetime(2023-04-01 07:55)| take 10')

axios.get(apiUrl + '?query=' + query, {
  headers: {
    'x-api-key': apiKey
  }
})
.then((response) => {
  let titleArr = []
  let valueArr = []
  fullColumnList.value = response?.data?.tables[0]?.columns

  fullColumnList.value.forEach(element => {
    console.log(element?.name)
  });

  for(let i = 0 ; i < response?.data?.tables[0]?.rows.length; i++)
  {
    let valueItem = []
    for(let j = 0; j < response?.data?.tables[0]?.rows[i]?.length; j++)
    {
      if(j <=4 || j >=23)
      {
        valueItem.push(response?.data?.tables[0]?.rows[i][j])
        if(i < 1){
          titleArr.push(response?.data?.tables[0]?.columns[j])
        }
      }
    }

    valueArr.push(valueItem)
  }
  columns.value = titleArr
  rows.value = valueArr

  loading.value = false
})
  .catch((error) => {
    // Xử lý lỗi
    console.log('Error ' + error)
  }).finally(() => {
    loading.value = false
  });
}

onMounted(getLogAzureAI)
// onBeforeMount(()=>{
//   const res = callAPI()
//   console.log(res)
// })

</script>

<style scoped>
.home {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap : 2rem;
}

code,pre {
  text-align: left;
}

.function {
  flex-basis: 50%;
}

.list-data {
  height: 50vh;
  overflow: auto;
  flex-basis: 30%;
}

table {
  width: 99%;
  table-layout: fixed;
  border: 1px solid grey;
}

table tbody tr td{
  overflow: hidden;
  text-wrap: nowrap;
  border-right: 1px solid grey;
  text-overflow: ellipsis;
  font-size: 0.8rem;
}

table thead {
  border-bottom: 1px solid grey;
}

table thead th {
  border-right: 1px solid grey;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-menu.show{
  overflow: auto;
  max-height: 30rem;
}

.dropdown-menu li {
  display: flex;
  gap : 1rem;
  cursor: pointer;
  padding-left: 1rem;
}

.dropdown-menu li:hover {
  background: #32ba86;
}
</style>
