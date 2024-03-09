<template>
  <div class="app container" ref="scrollArea" @scroll="checkScroll">
    <div>
      <v-row style="justify-content: space-evenly">
        <v-col class="col" xs="12" sm="5" md="4" lg="3" xl="3" xxl="3"
          v-for="(item, index) in items"
          :key="item.date">

          <v-card class="card">
  
            <v-img height="250px" width="100%" :src="item.url" :alt="item.title"
              cover >
            </v-img>

            <v-card-title class="title-content">
              Título: {{ item.title }}
            </v-card-title>

            <div class="btn-container">
              <v-card-subtitle>Data: {{ item.date }}</v-card-subtitle>
              <v-btn class="btn"
                :icon="item.isFavorite ? 'mdi-star' : 'mdi-star-outline'"
                @click="toggleFavorite(item)"
              ></v-btn>
            </div>

            <v-card-actions>
              <v-btn color="orange-lighten-2" variant="text">Explore</v-btn>

              <v-spacer></v-spacer>

              <v-btn
                :icon="expanded[index] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="toggleExpanded(index)"
              ></v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="expanded[index]">
                <v-divider></v-divider>
                <v-card-text>{{ item.explanation }}</v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const items = ref([]);
    const expanded = ref([]);
    let isFetching = false;

    const toggleExpanded = (index) => {
      expanded.value[index] = !expanded.value[index];
    };
    const toggleFavorite = (item) => {
      item.isFavorite = !item.isFavorite;
      localStorage.setItem('favorites', JSON.stringify(items.value.filter(i => i.isFavorite)));

    };

    const fetchData = () => {
      if (isFetching) return;
      isFetching = true;
      axios
        .get(
" https://api.nasa.gov/planetary/apod?api_key=4naEqAoTJRwkNt7zcQg3iudJTfjsRcW9FcUQ9XS4&count=12"        )
        .then((response) => {
          items.value = [...items.value, ...response.data];
          expanded.value = [...expanded.value, ...Array(response.data.length).fill(false)];
          isFetching = false;
        })
        .catch((error) => {
          console.error("Erro ao obter itens da NASA:", error);
          isFetching = false;
        });
    };

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;
      if (scrollTop + clientHeight >= scrollHeight - 12 && !isFetching) {
        fetchData();
      }
    };

    onMounted(() => {
      fetchData();
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return { items, expanded, toggleExpanded, toggleFavorite };
  },
};
</script>

<style>
.app {
  /* height: 100vh;
  overflow-y: scroll; Adiciona scroll vertical */
}
.title-content{
  padding: 0 16px;
}
.card {
  width: 100%;
  margin-bottom: 70px;
  margin-top: 70px;
  z-index: 1;
  background: #00000054;
  color: white;
}
.v-responsive__sizer {
  padding-bottom: 100%;
}
.col{
  padding: 0 20px;
}
@media screen and (max-width: 600px) {
  .col {
    padding: 0 20% !important;
  }
}
.btn-container{
  display: flex;
}
.btn{
  background: transparent;
}
.v-btn--elevated{
 box-shadow: none!important;
}
.v-btn--elevated:focus {
    box-shadow: none!important; 
}
.start-outline{
color: white !important;;
}
</style>