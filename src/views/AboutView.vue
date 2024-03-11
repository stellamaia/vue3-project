<template>
  <div style="  z-index: 1;  position: relative;"> 
    <div class="app container" ref="scrollArea" @scroll="checkScroll">
      <NavBar />
            <div class="title-container">
                <h1  style=" color: white;  font-weight: bold;  text-align: center; padding-top: 50px;">
                  Favorite images
                  </h1>
            </div>
      <div >
        <CardComponent :items="favoriteItems"/>
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

    
    return { favoriteItems };
  },
};
</script>
  
  <style>

.title-container {
  z-index: -1;
  position: static;  padding-top: 50px;
}

</style>