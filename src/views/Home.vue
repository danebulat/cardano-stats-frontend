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
       response:   "",
       recentReqs: null,
       tableData:  []
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
     
     async fetchRecent() {
       console.log('Fetch recent requests...');

       // headers
       const reqHeaders = new Headers();
       reqHeaders.append('Accept',       'application/json');
       reqHeaders.append('Content-Type', 'application/json');

       // request data
       const reqInit = {
         method: 'GET',
         headers: reqHeaders,
         mode:   'cors',
         cache:  'no-cache'
       };

       // make request
       const reqUrl = "http://localhost:8081/requests";
       const req = new Request(reqUrl, reqInit);
       const res = await fetch(req);

       // get json and sort on id
       this.recentReqs = await res.json();

       this.recentReqs.sort( (a, b) => {
         if (a.id < b.id)  return  1;
         if (a.id > b.id)  return -1;
         return 0;
       });
     },
     
     onClear() {
       this.form.endpointUrl = "";
       this.form.apiKey      = "";
       this.form.queryParams = "";
     },

     async deleteReq(reqId) {
       console.log('id to delete: ' + reqId);

       const reqInit = {
         method:  'DELETE',
         headers: {'Accept': 'application/json'},
         mode:    'cors',
         cache:   'no-cache'
       };

       const reqUrl = `http://localhost:8081/requests/${reqId}`;
       const req = new Request(reqUrl, reqInit);
       const res = await fetch(req);

       // remove deleted item from table
       this.tableData = this.tableData.filter(item => item.id != reqId);

       console.log('response:');
       console.log(res);
     }
   },
   computed: {
      responseNotEmpty() {
        return this.response != "";
      }
   },
   watch: {
     recentReqs(oldData, newData) {
       console.log('recentReqs changed!!');

       this.tableData = [];
       
       for (const property in this.recentReqs) {
         console.log(`${property}: ${this.recentReqs[property].reqUrl  }`);

         let cell = {
           id:     `${this.recentReqs[property].id}`,
           reqUrl: `${this.recentReqs[property].reqUrl}`
         };

         this.tableData.push(cell);
       }       
     }
   }
 }
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card class="box-card card-height">

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
      <el-card class="box-card card-height">

        <template #header>
          <div class="card-header">
            <h1>Recent Requests</h1>
            <el-button @click="fetchRecent" class="button" type="primary">Fetch</el-button>
          </div>
        </template>

        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id"     label="ID" width="50" />
          <el-table-column prop="reqUrl" label="URL" />

          <el-table-column fixed="right" label="Operations" width="120">
            <template #default="scope">
              <el-button
                link type="primary"
                size="small"
                @click.prevent="deleteReq(scope.row.id)">
                  Delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>

  <el-row :gutter="20" class="mt-20">
    <el-col :span="24" class="mb-20">
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
</template>

<style>
 h1 {
   font-size: 1.2em;
   margin-top: 2px;
   margin-bottom: 2px;
 }
 .box-card {
   height: 100%;
 }
 .card-height {
   max-height: 490px;
   overflow: auto;
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
 .mb-20 {
   margin-bottom: 20px;
 }
 .mt-20 {
   margin-top: 20px;
 }
</style>

