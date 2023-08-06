<template>
  <Signup />
</template>

<script>
import { defineComponent } from "vue";

// Components
import Signup from "../components/Signup.vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "SignupView",

  components: {
    Signup,
  },
});
</script>
