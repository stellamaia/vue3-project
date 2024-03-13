<template>
  <div class="home-container">
    <div class="app container" ref="scrollArea">
      <NavBar />
      <div class="title-container">
        <h1 class="title">
          Explore our universe
        </h1>
      </div>

      <v-container  v-show="isLoading">
        <div class="text-center">
          <v-progress-circular class="progress-circular" color="white" indeterminate></v-progress-circular>
        </div>
      </v-container>

      <CardComponent :items="items" />
    </div>  
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import NavBar from "../components/NavBar.vue";
import CardComponent from "../components/CardComponent.vue";

export default {
  components: {
    NavBar,
    CardComponent
  },
  setup() {
    const items = ref([]);
    const isLoading = ref(false);

    const fetchData = () => {
      if (isLoading.value) return;
      isLoading.value = true;
      axios
        .get(
          " https://api.nasa.gov/planetary/apod?api_key=4naEqAoTJRwkNt7zcQg3iudJTfjsRcW9FcUQ9XS4&count=12"
        )
        .then((response) => {
          items.value = [...items.value, ...response.data];
          isLoading.value = false;
        })
        .catch((error) => {
          console.error("Erro ao obter itens da NASA:", error);
          isLoading.value = false;
        });
    };

    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight =
        document.documentElement.clientHeight || window.innerHeight;
      if (scrollTop + clientHeight >= scrollHeight - 12 && !isLoading.value) {
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

    return { items, isLoading };
  },
};
</script>

<style>
.home-container{
  z-index: 1;  
  position: relative;
}
.title-container {
  z-index: -1;
  position: static;
  padding-top: 50px;
}
.title{
  color: white;  
  font-weight: bold; 
  text-align: center; 
  padding-top: 50px;
}
.text-center {
  padding-top: 200px;
}
.progress-circular{
  position: fixed; 
  height: 100px; 
  right: 20px;
  bottom: 10px;
  z-index: 5;
}
</style>