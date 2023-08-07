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
              @click:append="showPassword1 = !showPassword1"
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="confirmPasswordRules"
              :type="showPassword2 ? 'text' : 'password'"
              name="input-10-1"
              label="Confirm Password"
              @click:append="showPassword2 = !showPassword2"
            ></v-text-field>
            <v-btn
              :disabled="!firstName || !lastName|| !email || !password || !confirmPassword"
              class="signup-btn"
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
export default {
  name: "LoginPage",
  data() {
    return {
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
        console.log(error)
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
.form-container form .inputs-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 400px;
}
.form-container form .inputs-wrapper .signup-btn {
  width: 100%;
  background-color: royalblue;
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
