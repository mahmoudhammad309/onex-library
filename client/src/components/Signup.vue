<template>
  <v-container class="form-container">
    <v-form
      @submit.prevent="signupAction"
      v-model="valid"
      align="center"
      justify="center"
      ref="form"
    >
      <v-container class="inputs-wrapper">
        <v-col class="form-wrapper" align="center" justify="center">
          <div class="img-wrapper">
            <img :src="logo" alt="logo" />
          </div>
          <v-card-title class="title">Signup</v-card-title>
          <v-card-text class="message">
            signup now and get full access to our app.
          </v-card-text>

          <v-text-field
            v-model="firstName"
            :rules="firstNameRules"
            label="First Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="lastName"
            :rules="lastNameRules"
            label="Last Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="showPassword1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            class="custom-password-field"
            @click:append="showPassword1 = !showPassword1"
          ></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="confirmPasswordRules"
            :type="showPassword2 ? 'text' : 'password'"
            name="input-10-1"
            label="Confirm Password"
            class="custom-password-field"
            @click:append="showPassword2 = !showPassword2"
          ></v-text-field>
          <v-btn
            :disabled="
              !firstName || !lastName || !email || !password || !confirmPassword
            "
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
            <template v-else> Signup </template>
          </v-btn>
          <v-col cols="14" md="14">
            <p class="have-account">
              Already have an account ?
              <router-link to="/login">Login</router-link>
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      valid: false,
      showPassword1: false,
      showPassword2: false,
      firstNameRules: [(v) => !!v || "First Name is required"],
      lastNameRules: [(v) => !!v || "Last Name is required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 8 || "Password must be at least 8 characters long",
      ],
      confirmPasswordRules: [
        (v) => !!v || "Confirm Password is required",
        (v) => v === this.password || "Passwords do not match",
      ],
      errorSnackbar: false,
      errorMessage: "",
      loading: false,
    };
  },
  methods: {
    async signupAction() {
      try {
        if (this.$refs.form.validate()) {
          this.loading = true;

          await userAuth.signup({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword,
          });

          this.$router.push({ path: "/profile" });
        }
      } catch (error) {
        this.errorMessage = error.response?.data.msg;
        this.errorSnackbar = true;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
@import "@/styles/login.css";
</style>
