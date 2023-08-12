<template>
  <v-container class="form-container">
    <v-form
      @submit.prevent="loginAction"
      v-model="valid"
      align="center"
      justify="center"
    >
      <v-container class="inputs-wrapper">
        <v-col class="form-wrapper" align="center" justify="center">
          <v-col cols="12" md="12">
            <div class="img-wrapper">
              <img :src="logo" alt="logo" />
            </div>
            <v-card-title class="title">Login</v-card-title>
            <v-card-text class="message">
              login now and get full access to our app.
            </v-card-text>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :passwordRules="[passwordRules.required, passwordRules.min]"
              :type="showPassword ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              class="custom-password-field"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>

          <v-col cols="14" md="14">
            <v-btn
              :disabled="!email || !password"
              class="submit-btn"
              type="submit"
            >
              <template v-if="loading">
                <v-progress-circular
                  indeterminate
                  size="24"
                  color="white"
                ></v-progress-circular>
              </template>
              <template v-else> Login </template>
            </v-btn>
          </v-col>
          <v-col cols="14" md="14">
            <p class="have-account">
              don't have an account?
              <router-link to="/signup">Sign up</router-link>
            </p>
          </v-col>
          <v-snackbar v-model="errorSnackbar" color="error">
            {{ errorMessage }}
          </v-snackbar>
        </v-col>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import { userAuth } from "@/Api";
import logoImage from "../assets/booklogo.png";

export default {
  name: "LoginPage",
  data() {
    return {
      logo: logoImage,
      email: "",
      password: "",
      valid: false,
      showPassword: false,
      passwordRules: [(v) => !!v || "Password is required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      errorSnackbar: false,
      errorMessage: "",
      loading: false,
    };
  },
  methods: {
    async loginAction() {
      try {
        this.loading = true;
        const user = await userAuth.login({
          email: this.email,
          password: this.password,
        });
        this.$store.commit("setUser", user.data.data);
        this.$router.push({ path: "/profile" });
      } catch (error) {
        this.errorMessage = error.response.data.msg;
        this.errorSnackbar = true;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
@import "@/styles/login.css";
</style>
