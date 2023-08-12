<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-text>Are you sure to delete a book?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="cancelDialog">
          Disagree
        </v-btn>
        <v-btn color="red darken-1" text @click="confirmDialog">
          <template v-if="isLoading">
            <v-progress-circular
              indeterminate
              size="24"
              color="red"
            ></v-progress-circular>
          </template>
          <template v-else>Agree</template>
        </v-btn>
      </v-card-actions>
    </v-card>
    <!-- Snackbar to show the error message -->
    <v-snackbar v-model="errorSnackbar" color="error">
      {{ errorMessage }}
    </v-snackbar>
  </v-dialog>
</template>

<script>
import { Books } from "@/Api";

export default {
  props: {
    bookId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      dialog: true,
      errorSnackbar: false,
      errorMessage: "",
      isLoading: false,
    };
  },
  methods: {
    cancelDialog() {
      this.dialog = false;
      this.$emit("cancel");
    },
    async confirmDialog() {
      const userId = this.$store.state.user?.id;
      if (!userId) {
        this.$router.push({ path: "/" });
      } else {
        try {
          this.isLoading = true;
          await Books.delete(userId, this.bookId);
          this.$emit("confirm");
          this.dialog = false;
          this.$store.commit("deleteBook", this.bookId);
        } catch (error) {
          this.dialog = true;
          this.errorMessage = error.response.data.msg;
          this.errorSnackbar = true;
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
};
</script>
