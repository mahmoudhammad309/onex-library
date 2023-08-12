<template>
  <v-card :loading="loading" class="mx-auto my-12" min-width="320">
    <v-img height="250" :src="book.image"></v-img>
    <v-card-title>{{ book.title }}</v-card-title>

    <v-card-text>
      <div class="text-subtitle-1">• Author, {{ book?.author }}</div>
      <div class="text-subtitle-1">• Genre, {{ book?.genre }}</div>
      <div class="text-subtitle-1">
        • Publication year, {{ book?.publicationYear }}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
    <v-card-actions>
      <div class="actions-wrapper">
        <v-btn text color="teal accent-4" @click="reveal = true">
          Description
        </v-btn>
        <div class="delete-edit-wrapper">
          <button class="btn delete-btn" @click="dialogDelete = true">
            <v-icon color="red" >mdi-delete</v-icon>
          </button>
          <button class="btn edit-btn" text @click="dialogUpdate = true">
            <v-icon color="orange">mdi-pencil</v-icon>
          </button>

        </div>

      </div>
    </v-card-actions>

    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%"
      >
      <div class="description-card">
        <v-card-text class="pb-0">
          <p>{{ book?.description }}</p>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn text color="teal accent-4" @click="reveal = false">
            Close
          </v-btn>
        </v-card-actions>
      </div>
      </v-card>
    </v-expand-transition>
  <!-- The Delete Confirmation Dialog -->
  <DeleteConfirmationDialog
    v-if="dialogDelete"
    @confirm="deleteBook"
    @cancel="dialogDelete = false"
    :bookId="book.id"
  />
  <UpdateBookDialog
    v-if="dialogUpdate"
    @confirm="updateBook"
    @cancel="dialogUpdate = false"
    :book="book"
  />
  </v-card>
</template>

<script>
import DeleteConfirmationDialog from "./DeleteConfirmationDialog.vue";
import UpdateBookDialog from "./UpdateBookDialog.vue";

export default {
  data: () => ({
    loading: false,
    selection: 1,
    reveal: false,
    dialogDelete: false,
    dialogUpdate: false,
  }),
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteBook() {
      this.$emit("delete-book", this.book.id);
      this.dialogDelete = false;
    },

    updateBook() {
      this.$emit("update-book", this.book);
      this.dialogUpdate = false;
    },
 
  },
  components: {
    DeleteConfirmationDialog,
    UpdateBookDialog
  },
};
</script>

<style scoped>
@import "@/styles/bookCard.css";
</style>
