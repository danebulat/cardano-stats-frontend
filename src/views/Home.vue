<script>
 //import sourceData from '../data.json'

 export default {
   data() {
     return {
       apiForm: {
         apiKey: "",
         apiRequest: "",
       },
     }
   },
   methods: {
     onSubmit() {
       console.log("Submit clicked");
     },
     onClear() {
       this.apiForm.apiKey = "";
       this.apiForm.apiRequest = "";
     }
   }
 }
</script>

<template>
  <el-form class="api-form" :model="form" label-width="120px">
    <el-row :gutter="20">
      <el-col :span="24"><h1>Cardano Stats</h1></el-col>
    </el-row>
  
    <el-row>
      <el-col :span="24">
        <el-form-item label="API key">
          <el-input size="large" v-model="apiForm.apiKey" placeholder="BlockFrost API Key" />
        </el-form-item>
      </el-col>
    </el-row>
  
    <el-row>
      <el-col :span="24">
        <el-form-item label="Request">
          <el-input
            v-model="apiForm.apiRequest"
            size="large"
            type="textarea"
            placeholder="API request" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Submit</el-button>
          <el-button @click="onClear">Clear</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style>
 h1 {
   font-size: 1.4em;
 }
 .api-form label {
   margin: 12px 0 10px 0;
   display: block;
   font-weight: bold;
   font-size: 1.0em;
 }
 .home-container img {
   max-width: 230px;
 }
</style>

