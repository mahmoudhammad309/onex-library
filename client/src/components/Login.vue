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
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>

          <v-col cols="14" md="14">
            <v-btn
              :disabled="!email || !password"
              class="login-btn"
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

        await userAuth.login({
          email: this.email,
          password: this.password,
        });

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

<style scoped>
.form-container {
  height: 100vh;
  margin: 0 !important;
  min-width: 100vw;
  background-color: #e8e8e8;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-wrapper {
  background-color: #fff;
  padding-bottom: 2rem !important;
  border-radius: 20px;
  box-shadow: 0px 8px 4px #aaaaaa;
}
.form-container form {
  display: flex;
  height: 100%;
}

.img-wrapper img {
  width: 80px;
}
.form-container form .inputs-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 450px;
}
.form-container form .inputs-wrapper .login-btn {
  width: 100%;
  background-color: #4169e1;
  color: #fff;
  border-radius: 10px;
}
.title {
  font-size: 28px;
  color: royalblue;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
}

.title::before,
.title::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 5px;
  background-color: royalblue;
}

.title::before {
  width: 18px;
  height: 18px;
  background-color: royalblue;
}

.title::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}

.message,
.have-account {
  color: rgba(88, 87, 87, 0.822);
  font-size: 14px;
}

.have-account {
  padding: 1rem 0;
}
.have-account a {
  color: royalblue;
}
.have-account a:hover {
  text-decoration: underline royalblue;
}

@media screen and (max-width: 768px) {
  .form-container form .inputs-wrapper {
    max-width: 400px;
  }
}

@keyframes pulse {
  from {
    transform: scale(0.9);
    opacity: 1;
  }

  to {
    transform: scale(1.8);
    opacity: 0;
  }
}
</style>
