<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-card>
      <v-card-title>Edit Book</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="editedBook.title"
          label="Title"
          :rules="titleRules"
          required
        ></v-text-field>
        <v-text-field
          v-model="editedBook.author"
          label="Author"
          :rules="authorRules"
          required
        ></v-text-field>
        <v-text-field
          v-model="editedBook.genre"
          label="Genre"
          :rules="genreRules"
          required
        ></v-text-field>
        <v-text-field
          v-model="editedBook.publicationYear"
          label="Publication Year"
          :rules="publicationYearRules"
          required
        ></v-text-field>

        <v-img
          v-if="editedBook.image"
          :src="editedBook.image"
          alt="Book Cover"
          class="book-image"
          max-width="100px"
        ></v-img>

        <v-file-input
          ref="fileInput"
          label="Choose an image"
          accept="image/*"
          @change="handleImageChange"
        ></v-file-input>

        <v-textarea
          v-model="editedBook.description"
          label="Description"
          :rules="descriptionRules"
          required
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="cancelDialog">Cancel</v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="saveChanges"
          :disabled="isSaveDisabled || isLoading"
        >
          <template v-if="isLoading">
            <v-progress-circular
              indeterminate
              size="24"
              color="green"
            ></v-progress-circular>
          </template>
          <template v-else>Save</template>
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
import UserServices from "@/services/userServices";
import { Books } from "@/Api";

export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialog: true,
      errorSnackbar: false,
      errorMessage: "",
      isLoading: false,
      selectedImage: null,
      editedBook: { ...this.book },
      titleRules: [(v) => !!v || "Title is required"],
      authorRules: [(v) => !!v || "Author is required"],
      genreRules: [(v) => !!v || "Genre is required"],
      publicationYearRules: [
        (v) => !!v || "Publication Year is required",
        (v) => (v && /^\d+$/.test(v)) || "Publication Year must be a number",
      ],
      descriptionRules: [(v) => !!v || "Description is required"],
    };
  },
  computed: {
    isSaveDisabled() {
      return (
        !this.editedBook.title ||
        !this.editedBook.author ||
        !this.editedBook.genre ||
        !this.editedBook.publicationYear ||
        !this.editedBook.description
      );
    },
  },
  methods: {
    cancelDialog() {
      this.dialog = false;
      this.$emit("cancel");
    },
    handleImageChange(event) {
      this.selectedImage = event.target.files[0];

      if (this.selectedImage) {
        const reader = new FileReader();
        reader.onload = () => {
          this.editedBook.image = reader.result;
        };
        reader.readAsDataURL(this.selectedImage);
      }
    },

    async saveChanges() {
      const userId = UserServices.getUser()?.id;

      try {
        this.isLoading = true;

        const formData = new FormData();
        formData.append("title", this.editedBook.title);
        formData.append("author", this.editedBook.author);
        formData.append("genre", this.editedBook.genre);
        formData.append("publicationYear", this.editedBook.publicationYear);
        formData.append("description", this.editedBook.description);

        if (this.selectedImage) {
          formData.append("image", this.selectedImage);
        }

        await Books.update(userId, this.book.id, formData);
        this.$emit("confirm", this.editedBook);
        this.dialog = false;
        window.location.reload();
      } catch (error) {
        console.log(error);
        this.dialog = true;
        this.errorMessage = error.response.data.msg;
        this.errorSnackbar = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>