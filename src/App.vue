<template>
  <v-app class="grey lighten-4">
    <NavBar></NavBar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'
export default {
  name: 'App',
  components:{
    NavBar
  },

  data: () => ({
    //
  }),
};
</script>
