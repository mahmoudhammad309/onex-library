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
          <button class="btn delete-btn" @click="dialogDelete = true" dark>
            <v-icon color="red" >mdi-delete</v-icon>
          </button>
          <button class="btn edit-btn" text @click="reveal = true">
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
  </v-card>
</template>

<script>
import DeleteConfirmationDialog from "./DeleteConfirmationDialog.vue";

export default {
  data: () => ({
    loading: false,
    selection: 1,
    reveal: false,
    dialogDelete: false,
  }),
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteBook() {
      // Perform the actual delete operation here
      // You can emit an event to inform the parent component to delete the book, or call an API to delete the book, etc.
      // For example, if you want to emit an event to the parent component:
      this.$emit("delete-book", this.book.id);
      this.dialogDelete = false;
    },
  },
  components: {
    DeleteConfirmationDialog,
  },
};
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
.description-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.v-card-actions {
  display: block;
}
.actions-wrapper {
  display: flex;
  justify-content: space-between;
}

.delete-edit-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.delete-edit-wrapper .btn {
  padding: 0;
  border-radius: 50%;
  padding: 5px;
}

.delete-btn:hover {
  background-color: rgb(247, 219, 219);
}
.edit-btn:hover {
  background-color: rgb(245, 231, 204);
}
</style>
