<script>
 import { RouterLink } from 'vue-router'
 
 export default {
   props: {
     // Allow component to take all the same props that the RouterLinks takes
     ...RouterLink.props
   },
   computed: {
     isExternal() {
       // string means an external link and starts with http
       return typeof this.to === 'string' && this.to.startsWith('http');
     }
   }
 }
</script>

<template>
  <a v-if="isExternal"
    target="blank"
    rel="noopener"
    class="external-link"
    :href="to"><slot /></a>
  <router-link v-else v-bind="$props" class="internal-link"><slot /></router-link>
</template>
