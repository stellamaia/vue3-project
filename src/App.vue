<template>
  <v-card
    class="mx-auto"
    max-width="50%"
    style="margin-bottom: 70px; margin-top: 70px"
    v-for="(item, index) in items"
    :key="item.date"
  >

    <v-img

      height="auto"
      width="auto"
      :src="item.url"
      :alt="item.title"
      cover
    ></v-img>

    <v-card-title style="padding: 0 16px;">
      Título:
      {{ item.title }}
    </v-card-title>

    <v-card-subtitle>
     Data: {{ item.date }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange-lighten-2" variant="text"> Explore </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="expanded[index] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="expanded[index] = !expanded[index]"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="expanded[index]">
        <v-divider></v-divider>
        <v-card-text>
          {{ item.explanation }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      items: [],
      expanded: [],
    };
  },
 
  mounted() {
    axios
      .get("https://api.nasa.gov/planetary/apod", {
        params: {
          api_key: "4naEqAoTJRwkNt7zcQg3iudJTfjsRcW9FcUQ9XS4",
          count: 3,
        },
      })
      .then((response) => {
        this.items = response.data;
      })
      .catch((error) => {
        console.error("Erro ao obter itemns da NASA:", error);
      });
  },
};
</script> 