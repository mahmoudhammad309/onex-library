<template>
  <v-app class="app lighten-4">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
// import { userAuth } from './Api';
// import store from './store';
export default {
  name: "App",
  data: () => ({
    //
  }),
  // async mounted() {
  //   try {
  //     const res = await userAuth.getUser();
  //     console.log('response from App.vue')
  //     this.$store.commit("setUser", res.data.data);
  //     console.log('response from App.vue')
  //   } catch (error) {
  //     console.log(error)
  //     this.$router.push("/login");
  //   }
  // },
};
</script>
