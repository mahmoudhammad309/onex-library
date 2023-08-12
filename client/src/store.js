import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      user: null,
      books: [],
    };
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
    },
    signOut(state) {
      state.user = null;
    },
    setAllBooks(state, data) {
      state.books = data;
    },
    addBook(state, data) {
      state.books = [...state.books, data];
    },
    updateBook(state, data) {
      state.books = [
        ...state.books.filter((book) => book.id !== data.id),
        data,
      ];
    },
    deleteBook(state, id) {
      state.books = state.books.filter((book) => book.id !== id);
    },
  },
});

export default store;
