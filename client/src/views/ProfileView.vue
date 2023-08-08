<template>
  <div>
    <Navbar />
    <Profile />
  </div>
</template>

<script>
import { defineComponent } from "vue";

// Components
import Profile from "../components/Profile.vue";
import Navbar from "@/components/Navbar.vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "ProfileView",

  components: {
    Profile,
    Navbar,
  },
});
</script>
