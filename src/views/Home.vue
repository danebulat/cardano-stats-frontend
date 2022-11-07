<script>
 export default {
   data() {
     return {
       form: {
         endpointUrl: "https://cardano-preview.blockfrost.io/api/v0/blocks/latest",
         apiKey:      "",
         queryParams: ""
       },
       response:   "",
       recentReqs: null,
       tableData:  []
     }
   },
   methods: {
     // Utility: Adds query params to base URL
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

     // Submit handler
     onSubmit() {
       let fullUrl = this.constructRequestUrl();
       this.makeRequest(fullUrl);
     },

     // Blockfrost API request
     async makeRequest(reqUrl) {
       const reqInit = {
         method:  'GET',
         headers:  {'project_id': `${this.form.apiKey}`},
         mode:    'cors',
         cache:   'no-cache'
       };

       const req     = new Request(reqUrl, reqInit);
       const res     = await fetch(req);
       this.response = await res.json();

       // Server request to save url in redis database
       if (res.ok) {
         this.postToServer(reqUrl)
       }
     },
     
     // Server request to store url in redis database
     async postToServer(reqUrl) {
       const reqInit = {
         method:  'POST',
         headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
         body:   `{ "getReqUrl": "${reqUrl}" }`,
         mode:    'cors',
         cache:   'no-cache'
       };
       
       const req = new Request("http://localhost:8081/requests", reqInit);
       const res = await fetch(req);
     },

     // Server request to fetch all urls in redis database
     async fetchRecent() {
       const reqInit = {
         method: 'GET',
         headers: {'Accept':'application/json', 'Content-Type':'application/json'},
         mode:   'cors',
         cache:  'no-cache'
       };

       const req = new Request("http://localhost:8081/requests", reqInit);
       const res = await fetch(req);
       
       this.recentReqs = await res.json();
       this.recentReqs.sort( (a, b) => {
         if (a.id < b.id)  return  1;
         if (a.id > b.id)  return -1;
         return 0;
       });
     },

     // Clear input form
     onClear() {
       this.form.endpointUrl = "";
       this.form.apiKey      = "";
       this.form.queryParams = "";
     },

     // Server delete request to remove a url from redis database
     async deleteReq(reqId) {
       const reqInit = {
         method:  'DELETE',
         headers: {'Accept':'application/json'},
         mode:    'cors',
         cache:   'no-cache'
       };

       const reqUrl = `http://localhost:8081/requests/${reqId}`;
       const req = new Request(reqUrl, reqInit);
       const res = await fetch(req);

       // Remove deleted item from table
       this.tableData = this.tableData.filter(item => item.id != reqId);
     }
   },
   watch: {
     // Update table data when urls re-fetched from server
     recentReqs(oldData, newData) {
       this.tableData = [];
       
       for (const property in this.recentReqs) {
         let cell = {
           id:     `${this.recentReqs[property].id}`,
           reqUrl: `${this.recentReqs[property].reqUrl}`
         };

         this.tableData.push(cell);
       }       
     }
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
      <el-card class="card-height">

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
              <el-form-item label="Query Params">
                <el-input v-model="form.queryParams" type="textarea" placeholder="separate with newline" rows="3" class="code-input" />
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
      <el-card class="card-height">

        <template #header>
          <div class="card-header">
            <h1>Cached Requests</h1>
            <el-button @click="fetchRecent" class="button" type="primary">Fetch</el-button>
          </div>
        </template>

        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id"     label="ID" width="50" />
          <el-table-column prop="reqUrl" label="URL" />

          <el-table-column fixed="right" label="Ops" width="120">
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

        <div class="response-wrapper">
          <pre v-if="responseNotEmpty">{{ response }}</pre>
          <p v-else>The response to a submitted request will appear here.</p>
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
 .card-height {
   max-height: 490px;
   height: 490px;
   overflow: auto;
 }
 .el-form-item label {
   padding-bottom: 10px;
   display: block;
   font-weight: bold;
   font-size: 1.0em;
   color: #303133;
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
   overflow: auto;
 }
 .mb-20 {
   margin-bottom: 20px;
 }
 .mt-20 {
   margin-top: 20px;
 }
</style>

