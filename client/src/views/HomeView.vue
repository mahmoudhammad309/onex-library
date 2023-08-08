<template>
  <div>
    <Navbar />
    <Home />
  </div>
</template>

<script>
import { defineComponent } from "vue";

// Components
import Home from "../components/Home.vue";
import Navbar from "@/components/Navbar.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    Home,
    Navbar,
  },
});
</script>
