<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "Welcome to METAR, here are your favorite airports METAR",
      airport: [],
      token: "",
      user: [],
      info: [],
      favorites: [],
      favoritesWeather: "",
    };
  },
  created: function () {
    axios.get("/favorites").then((response) => {
      this.favorites = response.data;
      console.log("favorites", response.data);
    });
  },
  methods: {
    getWeather: function () {
      const headers = {
        Authorization: "Bearer token(.env)",
      };
      axios.get("https://avwx.rest/api/metar/jfk", { headers }).then((response) => {
        this.user = response.data;
        console.log("favorite weather front end", response.data);
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <button @click="getWeather">front end test</button>
    <!-- <div v-for></div> -->
    <h2>{{ favorites }}</h2>
    <h1>favorites weather</h1>
    <div v-for="favoriteW in favoritesWeather" :key="favoriteW"></div>
    <h2>{{ user }}</h2>
  </div>
</template>

<style></style>
