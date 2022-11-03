<script>
 export default {
   data() {
     return {
       tokenRegistryUrl: "https://github.com/cardano-foundation/cardano-token-registry",
       githubUrl: "https://github.com/danebulat",
       blockFrostUrl: "https://blockfrost.io/",
       blockFrostDocsUrl: "https://blockfrost.dev/"
     }
   }
 }
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    :ellipsis="false"
    :collapse-transition="false"
  >
    <span class="logo">
      <router-link :to="{ name: 'Home' }">LOGO</router-link>
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
</template>

<style>
 .flex-grow {
   flex-grow: 2;
 }
 .logo {
   display: block;
   padding: 20px;
   font-weight: bold;
 }
.el-menu-item {
 font-family: Avenir, Helvetica, Arial, sans-serif !important
}
</style>
