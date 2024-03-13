<template>
  <div>
    <v-row class="row-container">

      <v-col class="col" xs="12" sm="6" md="4" lg="3" xl="3" xxl="3" v-for="(item, index) in items" :key="item.date">
        <v-card class="card">
          <v-img v-if="item.media_type === 'image'" class="image-container" :src="item.url" :alt="item.title" cover>
          </v-img>

          <div v-else class="no-image">
            <vue-plyr>
              <iframe class="iframe" :src="item.url" allowfullscreen allowtransparency allow="autoplay"  >
              </iframe>
            </vue-plyr>
          </div>
          <v-card-title class="title-content">
            Title: {{ item.title }}
          </v-card-title>

          <div class="data-favorite-container">
            <v-card-subtitle class="data-container">Date: {{ item.date }}</v-card-subtitle>
            <v-btn class="btn" :icon="item.isFavorite ? 'mdi-star' : 'mdi-star-outline'"
              @click="toggleFavorite(item)"></v-btn>
          </div>

          <v-card-actions class="card-actions">
            <v-btn class="explore-btn" variant="text">Explore</v-btn>

            <v-spacer></v-spacer>

            <v-btn :icon="expanded[index] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="toggleExpanded(index)"></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="expanded[index]" class="expanded-content">
              <v-divider></v-divider>
              <v-card-text>{{ item.explanation }}</v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { ref } from "vue";
import VuePlyr from "vue-plyr";
import 'vue-plyr/dist/vue-plyr.css';

export default {
  name: 'CardComponent',
  props: {
    items: {
      type: Array
    }
  },
  components: {
    VuePlyr
  },
  setup( props, { emit }) {
    const expanded = ref([]);

    const toggleExpanded = (index) => {
      expanded.value[index] = !expanded.value[index];
    };
    const toggleFavorite = (item) => {
      item.isFavorite = !item.isFavorite;
      let favoriteItems = JSON.parse(localStorage.getItem('favorites')) || [];

      // Remove o item da lista de favoritos se já estiver lá
      const index = favoriteItems.findIndex(favItem => favItem.date === item.date);
      if (index !== -1) {
        favoriteItems.splice(index, 1);
      } else {
        // Adiciona o item à lista de favoritos se não estiver lá
        favoriteItems.push(item);
      }

      localStorage.setItem("favorites", JSON.stringify(favoriteItems));
      // Emite um evento 'removeFavorite' se estiver na página 'About' e o item for removido dos favoritos.
        if (window.location.pathname === '/favorites') {
        emit('removeFavorite', item);
      }
    };
    const playerOptions = ref({
      controls: ['play', 'progress', 'fullscreen'],
    });
    return { expanded, toggleExpanded, toggleFavorite, playerOptions  };
  },
};
</script>

<style>
.title-container {
  z-index: -1;
  position: static;
  padding-top: 50px;
  padding-bottom: 20px;
}

.card {
  width: 100%;
  margin-bottom: 20px;
  margin-top: 20px;
  padding: 20px;
  border-radius: 20px;
  z-index: 1;
  background: #171717;
  color: white;
}

.no-image {
  height: 250px;
}

.iframe {
  height: 100%;
  width: 100%;
  border-radius: 20px;
  border: none;
}

.image-container {
  border-radius: 20px;
  height: 250px;
  width: 100%;
}

.v-responsive__sizer {
  padding-bottom: 100%;
}

.row-container {
  z-index: -2;
  /* position: absolute; */
  justify-content: space-evenly;


}

.col {
  padding: 0 20px;
}

@media screen and (max-width: 600px) {
  .col {
    /* padding: 0 20% !important; */
  }
}

.title-content {
  padding: 20px 10px 0 10px;
  font-weight: bolder;
  font-size: 13px;
}

.data-favorite-container {
  display: flex;
  justify-content: space-between;
}

.data-container {
  padding: 0 10px 10px 10px;
  opacity: inherit;
  font-weight: lighter;
}

.card-actions {
  padding: 0;
}

.explore-btn {
  font-size: 10px;
  color: #ffffffcf;
  font-weight: 900;
}

.btn {
  background: transparent;
  position: relative;
  top: -14px;
}

.v-btn--elevated {
  box-shadow: none !important;
}

.v-btn--elevated:focus {
  box-shadow: none !important;
}

.start-outline {
  color: white !important;
}
</style>