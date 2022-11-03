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
    <el-container class="full-height">
      <el-aside>
        <TheAside />
      </el-aside>

      <!-- main container -->
      <el-container>
        <el-main>
          <div class="container full-height">
            <!-- render content of the active page -->
            <router-view />
          </div>
        </el-main>
        <!-- footer -->
        <el-footer></el-footer>
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
   height: 60px;
   width:100%;
   margin-left: 200px;
   position: fixed;
   bottom: 0;
   left: 0;
 }
 body {
   height: 100vh;
   width: 100vw;
 }
 #app {
   height: 100%;
 }
 .full-height {
   height: 100%;
 }
</style>
