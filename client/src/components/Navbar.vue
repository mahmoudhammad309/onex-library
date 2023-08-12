<template>
  <nav class="nav">
    <v-toolbar class="toolbar" elevation="4">
      <img :src="logo" alt="Logo" class="logo" />
      <v-toolbar-title> </v-toolbar-title>
      <!-- Conditionally render buttons based on user existence -->
      <template v-if="$store.state.user">
        <UserAvatar class="user-avatar" />
        <v-btn class="btn signOut-btn" @click="signOut">
          <span>Sign Out</span>
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <div class="btn-wrapper">
          <v-btn class="btn" @click="login">Login</v-btn>
          <v-btn class="btn" @click="signUp">Sign Up</v-btn>
        </div>
      </template>
      <v-snackbar v-model="errorSnackbar" color="error">
        {{ errorMessage }}
      </v-snackbar>
    </v-toolbar>
  </nav>
</template>
<script>
import logoImage from "../assets/bookfolio3.png";
import UserAvatar from "./UserAvatar.vue";
import TokenServices from "@/services/TokenServices"
import { userAuth } from "@/Api";
export default {
  name: "Navbar-component",
  components: {
    UserAvatar,
  },
  data() {
    return {
      logo: logoImage,
      dialog: false,
      user: this.$store.state.user,
      errorSnackbar: false,
      errorMessage: "",
    };
  },

  methods: {
    async signOut() {
      try {
        this.loading = true;
        await userAuth.signOut();
        this.$store.state.user = null;
        TokenServices.destroyToken();
        this.$router.push({ name: "home" });
      } catch (error) {
        this.errorMessage = error.response.data.msg;
        this.errorSnackbar = true;
      }
    },
    login: function () {
      this.$router.push({ name: "login" });
    },
    signUp: function () {
      this.$router.push({ name: "signup" });
    },
  },
};
</script>

<style scoped>
.toolbar {
  background-color: #fff;
  padding: 0 1rem;
}
.logo {
  max-width: 150px;
  height: auto;
  margin: 10px;
}
.toolbar .v-toolbar__content .btn-wrapper {
  display: flex;
  gap: 1rem;
  margin: 0;
}
.btn,
.signOut-btn {
  color: #fff !important;
  background-color: #4169e1;
}

.signOut-btn span {
  margin-right: 1rem;
}
@media screen and (max-width: 600px) {
  .signOut-btn span,
  .user-avatar {
    display: none;
  }
}
</style>
