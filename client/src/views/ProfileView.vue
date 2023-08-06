<template>
  <Profile />
</template>

<script>
import { defineComponent } from "vue";

// Components
import Profile from "../components/Profile.vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "ProfileView",

  components: {
    Profile,
  },
});
</script>
