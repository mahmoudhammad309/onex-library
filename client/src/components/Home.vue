<template>
  <div class="home-wrapper">
    <div class="description-wrapper">
      <div class="description">
        <h1>Welcome to <span><span>‘</span> Bookfolio</span><span> ’</span> library digital ecosystem</h1>
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
.home-wrapper {
  min-height: calc(100vh - 64px);
  display: flex;
}
.home-wrapper > div {
  min-height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
}

.description h1 span {
  color: #4169e1;
}
.description p {
  margin-top: 1rem;
  font-size: 18px;
  font-weight: 400;
  line-height: 25px;
  color: rgba(0, 0, 0, 0.8);
}

.image-wrapper img {
  width: 100%;
}

.btn-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
}
.btn-wrapper button{
  color: #fff;
  background-color: #4169e1;
}

@media screen and (max-width: 768px) {
  .home-wrapper {
    flex-direction: column;
  }
  .home-wrapper > div {
    padding: 4rem 2rem;
  }
}
</style>
