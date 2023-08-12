<template>
  <div>
    <div class="search-addBook-wrapper">
      <div class="search-wrapper">
        <div class="search">
          <label for="search">
            <input
              v-model="keyword"
              @input="debouncedHandleSearch"
              autocomplete="off"
              placeholder="search your books"
              id="search"
              type="text"
            />
            <div class="icon">
              <svg
                stroke-width="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="swap-on"
              >
                <path
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                ></path>
              </svg>
              <svg
                stroke-width="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="swap-off"
              >
                <path
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                ></path>
              </svg>
            </div>
            <button type="reset" class="close-btn" @click="handleClearSearch">
              <svg
                viewBox="0 0 20 20"
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </button>
            <template v-if="isSearchLoading">
              <v-progress-circular
                indeterminate
                size="24"
                color="white"
              ></v-progress-circular>
            </template>
          </label>
        </div>
      </div>
      <div class="add-btn">
        <v-btn color="#15a986" @click="dialogAdd = true">
        <!-- <v-btn color="#15a986" @click="handleClearSearch"> -->
          <v-icon color="#fff">mdi-plus</v-icon>
        </v-btn>
      </div>
    </div>
    <v-divider class="mx-4"></v-divider>

    <main class="cards-wrapper" ref="masonryContainer">
      <div v-if="isLoading" class="overlay">
        <v-progress-circular indeterminate color="teal"></v-progress-circular>
      </div>
      <NoData v-if="!isLoading && $store.state.books.length === 0" />
      <BookCard v-for="book in $store.state.books" :key="book.id" :book="book"/>
      <v-snackbar v-model="errorSnackbar" color="error">
        {{ errorMessage }}
      </v-snackbar>
    </main>
    <AddBookDialog
      v-if="dialogAdd"
      @confirm="addBook"
      @cancel="dialogAdd = false"
    />
  </div>
</template>

<script>
import BookCard from "./BookCard.vue";
import AddBookDialog from "./AddBookDialog.vue";
import NoData from "./NoData.vue";
import { Books } from "@/Api";
export default {
  name: "UserProfile",
  data() {
    return {
      isLoading: true,
      errorSnackbar: false,
      errorMessage: "",
      dialogAdd: false,
      keyword: "",
      debounceTimeout: null,
      isSearchLoading: false,
    };
  },
  components: {
    BookCard,
    NoData,
    AddBookDialog,
  },
  methods: {
    async getBooks() {
        const userId = this.$store.state.user?.id;
        try {
          const data = await Books.get(userId);
          this.$store.commit("setAllBooks", data.data.data)
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
    },
    debouncedHandleSearch() {
      this.isSearchLoading = true;
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.handleSearch();
      }, 1000);
    },
    async handleSearch() {
      if (!this.keyword) {
        this.getBooks();
        this.isSearchLoading = false;
        return;
      }

      try {
        const userId = this.$store.state.user?.id;
        const data = await Books.search(userId, this.keyword);

        this.$store.commit("setAllBooks", data.data.data)

      } catch (error) {
        console.log(error)
        this.errorMessage = "Error while searching.";
        this.errorSnackbar = true;
      } finally {
        this.isSearchLoading = false;
      }
    },
    async handleClearSearch() {
      this.keyword = '';
        this.getBooks();
        this.isSearchLoading = false;
        return;
      
    },
  },
  mounted() {
    this.getBooks();
  },
};
</script>

<style>
@import "@/styles/Profile.css";
</style>
