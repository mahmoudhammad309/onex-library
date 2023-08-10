<!-- eslint-disable vue/no-parsing-error -->
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
            <button type="reset" class="close-btn" @click="this.keyword = ''">
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
          <v-icon color="#fff">mdi-plus</v-icon>
        </v-btn>
      </div>
    </div>
    <v-divider class="mx-4"></v-divider>

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
import UserServices from "@/services/userServices";
export default {
  name: "UserProfile",
  data() {
    return {
      books: [],
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
      const userId = UserServices.getUser()?.id;
      if (!userId) {
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
    debouncedHandleSearch() {
      this.isSearchLoading = true;
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.handleSearch();
      }, 3000);
    },
    async handleSearch() {
      if (!this.keyword) {
        this.getBooks();
        return;
      }

      try {
        const userId = UserServices.getUser()?.id;
        if (!userId) {
          this.$router.push({ path: "/" });
          return;
        }

        const response = await Books.search(userId, this.keyword);
        console.log(response.data.data);
        this.books = response.data.data;
      } catch (error) {
        this.errorMessage = "Error while searching.";
        this.errorSnackbar = true;
      } finally {
        this.isSearchLoading = false;
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
.search-addBook-wrapper {
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  margin-top: 1rem;
  gap: 1rem;
}

.search-wrapper {
  flex: 1 2 450px;
}
.search {
  --input-bg: #fff;
  --padding: 1.5em;
  --rotate: 80deg;
  --gap: 2em;
  --icon-change-color: #15a986;
  --height: 40px;
  max-width: 400px;
  padding-inline-end: 1em;
  background: var(--input-bg);
  position: relative;
  border-radius: 4px;
  box-shadow: 0px 2px 4px #bfbebe;
}

.search label {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--height);
}

.search input {
  width: 100%;
  padding-inline-start: calc(var(--padding) + var(--gap));
  outline: none;
  background: none;
  border: 0;
}
.search svg {
  color: #111;
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  height: 15px;
}
/* search icon */
.icon {
  position: absolute;
  left: var(--padding);
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  justify-content: center;
  align-items: center;
}
/* arrow-icon*/
.swap-off {
  transform: rotate(-80deg);
  opacity: 0;
  visibility: hidden;
}
/* close button */
.close-btn {
  /* removing default bg of button */
  background: none;
  border: none;
  right: calc(var(--padding) - var(--gap));
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #111;
  padding: 0.1em;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transition: 0.3s;
  opacity: 0;
  transform: scale(0);
  visibility: hidden;
}

.search input:focus ~ .icon {
  transform: rotate(var(--rotate)) scale(1.3);
}

.search input:focus ~ .icon .swap-off {
  opacity: 1;
  transform: rotate(-80deg);
  visibility: visible;
  color: var(--icon-change-color);
}

.search input:focus ~ .icon .swap-on {
  opacity: 0;
  visibility: visible;
}

.search input:valid ~ .icon {
  transform: scale(1.3) rotate(var(--rotate));
}

.search input:valid ~ .icon .swap-off {
  opacity: 1;
  visibility: visible;
  color: var(--icon-change-color);
}

.search input:valid ~ .icon .swap-on {
  opacity: 0;
  visibility: visible;
}

.search input:valid ~ .close-btn {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
  transition: 0s;
}
</style>
