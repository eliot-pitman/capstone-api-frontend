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
      favoritesWeather: [],
    };
  },
  created: function () {
    axios.get("/favorites").then((response) => {
      this.favorites = response.data;
      console.log("favorites", response.data);
    });
    axios.get("/airports").then((response) => {
      this.favoritesWeather = response.data;
      console.log("airport weather", response.data);
    });
  },
  methods: {},
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <!-- <div v-for></div> -->
    <h2>{{ favorites }}</h2>
    <h1>favorites weather</h1>
    <h2>{{ favoritesWeather }}</h2>
  </div>
</template>

<style></style>
