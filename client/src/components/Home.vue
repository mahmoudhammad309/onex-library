<template>
  <div class="home-wrapper">
    <div class="description-wrapper">
      <div class="description">
        <h1>
          Welcome to <span><span>‘</span> Bookfolio</span
          ><span> ’</span> library digital ecosystem
        </h1>
        <p>
          The ultimate web app for managing your personal book collection.
          <strong>Bookfolio</strong> offers a seamless way to organize and
          explore your books with ease. With advanced search and filtering
          options, you can quickly find the books you're looking for. Start
          managing your collection today and elevate your reading journey with
          <strong>Bookfolio</strong>.
        </p>
        <div class="btn-wrapper">
          <v-btn @click="signUp">Signup Now</v-btn>
        </div>
      </div>
    </div>
    <div class="image-wrapper">
      <img :src="backgroundImage" alt="logo" />
    </div>
  </div>
</template>
<script>
import backgroundImage from "../assets/man-reading.svg";
export default {
  name: "HomePage",

  data() {
    return {
      backgroundImage,
    };
  },
  methods: {
    signUp: function () {
      this.$router.push({ name: "signup" });
    },
  },
};
</script>

<style scoped>
@import "@/styles/Home.css";
</style>
