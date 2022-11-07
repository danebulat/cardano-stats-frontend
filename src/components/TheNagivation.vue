<script>
 export default {
   data() {
     return {
       tokenRegistryUrl:  "https://github.com/cardano-foundation/cardano-token-registry",
       githubUrl:         "https://github.com/danebulat/cardano-stats-frontend",
       blockFrostUrl:     "https://blockfrost.io/",
       blockFrostDocsUrl: "https://blockfrost.dev/"
     }
   }
 }
</script>

<template>
  <div class="outer-menu-wrapper">
    <div class="inner-menu-wrapper">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        :collapse-transition="false"
      >
        <span class="logo">
          <router-link :to="{ name: 'Home' }">Cardano Frontend App</router-link>
        </span>
        <div class="flex-grow" />
        <el-sub-menu index="1">
          <template #title><b>BlockFrost</b></template>
          <el-menu-item index="1-1">
            <AppLink :to="blockFrostUrl">Website</AppLink>
          </el-menu-item>
          <el-menu-item index="1-2">
            <AppLink :to="blockFrostDocsUrl">Docs</AppLink>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2">
          <AppLink :to="tokenRegistryUrl">
            Token Registry
          </AppLink>
        </el-menu-item>
        <el-menu-item index="3">
          <AppLink :to=githubUrl>GitHub</AppLink>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<style>
 .flex-grow {
   flex-grow: 2;
 }
 .logo {
   display: block;
   padding: 20px 10px;
   font-weight: bold;
 }
 .el-menu-item {
   font-family: Avenir, Helvetica, Arial, sans-serif !important
 }
 .outer-menu-wrapper {
   background: white;
   border-bottom: 1px solid #dcdfe6;
 }
 .inner-menu-wrapper {
   max-width: 960px;
   margin: auto auto;
 }
 /* remove border */
 .el-menu--horizontal {
   border: none;
 }
</style>
