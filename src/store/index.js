import { createStore } from 'vuex'

export default createStore({
  state: {
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  },
  getters: {
    favorites: state => state.favorites,
    isFavorite: state => item => state.favorites.some(fav => fav.date === item.date),
  },
  mutations: {
    toggleFavorite(state, item) {
      const index = state.favorites.findIndex(fav => fav.date === item.date);
      if (index === -1) {
        state.favorites.push(item);
      } else {
        state.favorites.splice(index, 1);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
  actions: {
  },
  modules: {
  }
})
