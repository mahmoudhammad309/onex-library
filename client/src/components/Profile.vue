<template>
  <main class="cards-wrapper" ref="masonryContainer">
    <div v-if="isLoading" class="overlay">
      <v-progress-circular indeterminate color="teal"></v-progress-circular>
    </div>
    <NoData v-if="!isLoading && books.length === 0" />
    <BookCard v-for="book in books" :key="book.id" :book="book" />
    <v-snackbar v-model="errorSnackbar" color="error">
      {{ errorMessage }}
    </v-snackbar>
  </main>
</template>

<script>
import BookCard from "./BookCard.vue";
import NoData from "./NoData.vue"
import { Books } from "@/Api";
import UserServices from "@/services/userServices";
export default {
  name: "UserProfile",
  data() {
    return {
      books: [],
      isLoading: true,
      errorSnackbar: false,
      errorMessage: "",
    };
  },
  components: {
    BookCard,
    NoData
  },
  methods: {
    async getBooks() {
      const userId = UserServices.getUser()?.id;
      if(!userId) {
        this.$router.push({ path: "/" });

      } else {
        try {
          const data = await Books.get(userId);
          this.books = [...data.data.data];
        } catch (error) {
          const isUnauthorized = error.response.data.msg;
  
          if (isUnauthorized === "invalid token") {
            this.$router.push({ path: "/login" });
          } else {
            this.errorMessage = error.response.data.msg;
            this.errorSnackbar = true;
          }
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
  mounted() {
    this.getBooks();
  },
};
</script>

<style scoped>
.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(6, 6, 6, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.overlay v-progress-circular {
  z-index: 1000;
}
</style>
