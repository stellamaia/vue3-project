<template>
  <div class="favorites-container">
    <div class="app container" ref="scrollArea" >
      <NavBar />
      <div class="title-container">
        <h1 class="favorite-card-title">
          Favorite Cards
        </h1>
      </div>
      <div>
        <CardComponent v-if="favoriteItems.length" :items="favoriteItems" @removeFavorite="removeFavorite" />

      </div>
      <div class="no-card">
        <p v-if="!favoriteItems.length">
          <span class="material-symbols-outlined">
            no_photography
          </span>
        </p>

      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

import NavBar from "../components/NavBar.vue";
import CardComponent from "../components/CardComponent.vue";

export default {
  components: {
    NavBar,
    CardComponent
  },
  setup() {
    onMounted(() => {
      getFavoriteItems();
    });

    const favoriteItems = ref([]);
    const getFavoriteItems = () => {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const uniqueFavorites = favorites.reduce((acc, curr) => {
        if (!acc.some(item => item.title === curr.title)) {
          acc.push(curr);
        }
        return acc;
      }, []);
      favoriteItems.value = uniqueFavorites;
    };

    const removeFavorite = (item) =>{ 
    
      favoriteItems.value = favoriteItems.value.filter(i => i.title !== item.title)
      
    }
    return { favoriteItems, removeFavorite };
  },
};
</script>

<style>
.favorites-container{
  z-index: 1;  
  position:inherit;
}
.title-container {
  z-index: -1;
  position: static;
  padding-top: 50px;
}

.no-card {
  text-align: center;
  font-size: 50px;
  color: white;
  top: 300px;
  position: absolute;
  width: 100%;
}

.material-symbols-outlined {
  color: #7e7878;
  font-size: 60px !important;

}

.favorite-card-title {
  color: white;
  font-weight: bold;
  text-align: center;
  padding-top: 50px;
}
</style>