<script>
 import TheNavigation from './components/TheNagivation.vue'

 export default {
   components: { TheNavigation }
 }
</script>

<template>
  <!-- main container -->
  <el-container class="full-height">
    <el-header>
      <TheNavigation />
    </el-header>

    <!-- side container -->
    <el-container>

      <!-- main container -->
      <el-container>
        <el-main>
          <div class="container">
            <!-- render content of the active page -->
            <router-view />
          </div>
        </el-main>
        <!-- footer -->
        <el-footer>
          <div>
            <p><a href="https://github.com/danebulat" target="_blank">github.com/danebulat</a></p>
          </div>
        </el-footer>
      </el-container>
      
    </el-container>
  </el-container>
</template>

<style lang="css">
 .el-header {
   padding-left: 0;
   padding-right: 0;
 }
 .el-aside {
   width: 200px;
 }
 .el-footer {
   background-color: #fff;
   border-top: 1px solid #dcdfe6;   
   bottom: 0;
   height: 60px;
   left: 0;
   position: fixed;
   width:100%;
   /* margin-left: 200px; */
 }
  .el-footer > div {
   margin: 0 auto;
   max-width: 960px;
 }
 .el-footer > div > p {
   text-align: center;
   font-size: 0.9em;
   margin-top: 20px;
 }
 .el-footer > div > p > a {
   font-weight: bold;
 }
 body {
   height: 100vh;
   width: 100vw;
 }
 /* cut off bottom of main container for footer */
 .el-container {
   margin-bottom: 40px;
 }
 #app {
   height: 100%;
 }
 .full-height {
   height: 100%;
 }
</style>
