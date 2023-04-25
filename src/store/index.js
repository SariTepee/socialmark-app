import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

var ls = new SecureLS({ isCompression: false });

export default createStore({
  state: {
    user: null,
    saltKey: "booklike123!456?",
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    logoutUser(state) {
      state.user = null;
    },
    setLikes(state, likes) {
      state.user.likes = likes;
    },
    setBookmarks(state, bookmarks) {
      state.user.bookmarks = bookmarks;
    },
  },
  getters: {
    _isAuthenticated: (state) => state.user != null,
    getCurrentUser: (state) => {
      const user = state.user;
      delete user?.password;
      return user;
    },
    getUserLikes: (state) => state?.user?.likes || [],
    getUserBookmarks: (state) => state?.user?.bookmarks || [],
    getCurrentUserId: (state) => state?.user?.id,
    _saltKey: (state) => state.saltKey,
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
});
