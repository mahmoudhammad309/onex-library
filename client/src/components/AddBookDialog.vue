<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-card>
      <v-card-title>Add Book</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="book.title"
          label="Title"
          :rules="titleRules"
          required
        ></v-text-field>
        <v-text-field
          v-model="book.author"
          label="Author"
          :rules="authorRules"
          required
        ></v-text-field>
        <v-text-field
          v-model="book.genre"
          label="Genre"
          :rules="genreRules"
          required
        ></v-text-field>
        <v-text-field
          v-model="book.publicationYear"
          label="Publication Year"
          :rules="publicationYearRules"
          required
        ></v-text-field>

        <v-img
          :src="imageURL"
          alt="Book Cover"
          class="book-image"
          max-width="100px"
        ></v-img>

        <v-file-input
          ref="fileInput"
          label="Choose an image"
          accept="image/*"
          @change="handleImageChange"
          :rules="[fileRules]"
        ></v-file-input>

        <v-textarea
          v-model="book.description"
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
  data() {
    return {
      dialog: true,
      errorSnackbar: false,
      errorMessage: "",
      isLoading: false,
      imageURL: null,
      selectedImage: null,
      book: {},
      titleRules: [(v) => !!v || "Title is required"],
      authorRules: [(v) => !!v || "Author is required"],
      genreRules: [(v) => !!v || "Genre is required"],
      publicationYearRules: [
        (v) => !!v || "Publication Year is required",
        (v) => (v && /^\d+$/.test(v)) || "Publication Year must be a number",
      ],
      fileRules: [(v) => !!v || 'Image is required'],
      descriptionRules: [(v) => !!v || "Description is required"],
    };
  },
  computed: {
    isSaveDisabled() {
      return (
        !this.book.title ||
        !this.book.author ||
        !this.book.genre ||
        !this.book.publicationYear ||
        !this.book.description
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
      this.imageURL = reader.result;
    };
    reader.readAsDataURL(this.selectedImage);
  }
},

    async saveChanges() {
      const userId = UserServices.getUser()?.id;

      try {
        this.isLoading = true;

        const formData = new FormData();
        formData.append("title", this.book.title);
        formData.append("author", this.book.author);
        formData.append("genre", this.book.genre);
        formData.append("publicationYear", this.book.publicationYear);
        formData.append("description", this.book.description);
        formData.append("image", this.selectedImage);

        await Books.add(userId, formData);
        this.$emit("confirm", this.book);
        this.dialog = false;
        window.location.reload();
      } catch (error) {
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
