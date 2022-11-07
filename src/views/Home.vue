<script>
 //import sourceData from '../data.json'

 import renderjson from 'renderjson'
 
 export default {
   data() {
     return {
       form: {
         endpointUrl: "https://cardano-preview.blockfrost.io/api/v0/blocks/latest",
         apiKey: "",
         queryParams: ""
       },
       response: "",
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
     constructRequestUrl() {
       if (this.form.queryParams.length == 0) {
         return this.form.endpointUrl;
       }
       
       let params = this.form.queryParams.split('\n');
       url += '?';
       params.forEach((param, i, arr) => {
         url += param;
         if (i < arr.length - 1) url += '&'
       });
       
       return url;
     },

     onSubmit() {
       let fullUrl = this.constructRequestUrl();
       this.makeRequest(fullUrl);
     },
     
     async makeRequest(reqUrl) {
       const reqHeaders = new Headers();
       reqHeaders.append('project_id', `${this.form.apiKey}`);

       const reqInit = {
         method:  'GET',
         headers:  reqHeaders,
         mode:    'cors',
         cache:   'default'
       };

       const req = new Request(reqUrl, reqInit);
       const response = await fetch(req);

       // wait for response from blockfrost
       this.response = await response.json();

       // save url in local redis database
       if (response.ok) {
         console.log('Making redis request...');

         // headers
         const reqHeadersRedis = new Headers();
         reqHeadersRedis.append('Accept',       'application/json');
         reqHeadersRedis.append('Content-Type', 'application/json');

         // JSON body
         const reqBody = `{ "getReqUrl": "${reqUrl}" }`;

         // request data
         const reqInitRedis = {
           method: 'POST',
           headers: reqHeadersRedis,
           body:    reqBody,
           mode:   'cors',
           cache:  'no-cache'
         };

         // make request
         const redisReqUrl = "http://localhost:8081/requests";
         const redisReq = new Request(redisReqUrl, reqInitRedis);

         const redisResponse = await fetch(redisReq);
         console.log('Server response:');
         console.log(redisResponse);
       }
     },
     
     onClear() {
       this.form.endpointUrl = "";
       this.form.apiKey      = "";
       this.form.queryParams = "";
     },
   },
   computed: {
      responseNotEmpty() {
        return this.response != "";
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
              <el-form-item label="API Key">
                <el-input v-model="form.apiKey" type="textarea" rows="1" placeholder="API key" resize="none" maxlength="50" class="code-input" />
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="24">
              <el-form-item label="Endpoint URL">
                <el-input v-model="form.endpointUrl" type="textarea" placeholder="url endpoint" rows="2" resize="none" class="code-input" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="Query params">
                <el-input v-model="form.queryParams" type="textarea" placeholder="url endpoint" rows="3" class="code-input" />
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

        <div v-if="responseNotEmpty" class="response-wrapper">
          <pre>{{ response }}</pre>
        </div>

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
 .response-wrapper {
   overflow: scroll;
 }
</style>

