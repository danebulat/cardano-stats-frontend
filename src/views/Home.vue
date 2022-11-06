<script>
 //import sourceData from '../data.json'

 export default {
   data() {
     return {
       form: {
         request: "",
       },
       tableData: [
         {
           date: '2016-05-03',
           name: 'Tom',
           address: 'No. 189, Grove St, Los Angeles',
         },
         {
           date: '2016-05-02',
           name: 'Tom',
           address: 'No. 189, Grove St, Los Angeles',
         },
         {
           date: '2016-05-04',
           name: 'Tom',
           address: 'No. 189, Grove St, Los Angeles',
         },
         {
           date: '2016-05-01',
           name: 'Tom',
           address: 'No. 189, Grove St, Los Angeles',
         },
       ]
     }
   },
   methods: {
     onSubmit() {
       console.log("Submit clicked");
     },
     onClear() {
       this.form.request = "";
     }
   }
 }
 
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card class="box-card top-card">

        <template #header>
          <div class="card-header">
            <h1>Input</h1>
          </div>
        </template>
        
        <el-form :model="form" label-position="top">
          <el-row>
            <el-col :span="24">
              <el-form-item label="Curl Request">
                <el-input
                  v-model="form.request"
                  size="large"
                  type="textarea"
                  placeholder="curl request"
                  rows="4"
                  class="code-input" />
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
      </el-card>
    </el-col>

    <el-col :span="12">
      <el-card class="box-card">

        <template #header>
          <div class="card-header">
            <h1>Response</h1>
          </div>
        </template>

      </el-card>
    </el-col>
  </el-row>

  <el-row :gutter="20" style="margin-top:20px;">
    <el-col :span="24">
      <el-card class="box-card">

        <template #header>
          <div class="card-header">
            <h1>Recent Requests</h1>
          </div>
        </template>

        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
        
      </el-card>
    </el-col>
  </el-row>
</template>

<style>
 h1 {
   font-size: 1.2em;
   margin-top: 2px;
   margin-bottom: 2px;
 }
 .box-card {
   margin-top: 12px;
   height: 100%;
 }
 .top-card {
   height: 100%;
 }
 .el-form-item label {
   padding-bottom: 10px;
   display: block;
   font-weight: bold;
   font-size: 1.0em;
 }
 .home-container img {
   max-width: 230px;
 }
 .card-header {
   display: flex;
   justify-content: space-between;
   align-items: center;
 }
 .code-input {
   font-family: monospace;
 }
</style>

