<template>
  <v-layout>
    <v-app-bar class="app-bar" density="compact">
      <template v-slot:prepend>
        <router-link to="/">
        <img class="nasa-favicon" src="/favicon.ico" alt="logo-nasa">
      </router-link>
      </template>

      <v-app-bar-title class="app-bar-title">
        { APIs }
      </v-app-bar-title>

      <router-link class="favorite-page" to="/about">Favorites</router-link>

    </v-app-bar>
  </v-layout>
</template>
<style>
.app-bar {
  background: #1f1f1f !important;
  color: white !important;
  box-shadow: none;
}

.favorite-page {
  color: white;
  text-decoration: none;
  padding-right: 50px;
}

.nasa-favicon {
  height: 40px;
  width: 40px;
}

.app-bar-title {
  font-size: 15px;
}

.card {
  z-index: 1;
}
</style>