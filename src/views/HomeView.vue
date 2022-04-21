<script>
import axios from "axios";
// import moment from "moment";
export default {
  data: function () {
    return {
      message: "Welcome to METAR, here are your favorite airports METAR",
      airport: [],
      info: [],
      favorites: [],
      favoritesWeather: "",
      currentFavoriteWeather: [],
      timer: "",
    };
  },
  created: function () {},
  methods: {
    getWeather: function (favorite) {
      setTimeout(() => {
        const headers = {
          Authorization: "Bearer " + process.env.VUE_APP_AVWX_2,
        };
        axios.get(`https://avwx.rest/api/metar/${favorite}`, { headers }).then((response) => {
          this.currentFavoriteWeather.push(response.data);
          console.log("favorite weather front end", response.data);
        });
      }, 30000);
    },
    getFavorites: function () {
      axios.get("/favorites").then((response) => {
        this.favorites = response.data;
        console.log("favorites", response.data);
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h1>{{ favorites }}</h1>
    <button @click="getFavorites">get favorites</button>
    <div v-for="favorite in favorites" :key="favorite.id">
      <h1>Airport Name: {{ favorite.airport_name }}</h1>
      <h2>Airport IATA: {{ favorite.airport_iata }}</h2>
      <!-- <h2>Current Airport Weather: {{ getWeather(favorite.airport_iata) }}</h2> -->
      <!-- <h3 v-for="favoriteWeather in currentFavoriteWeather" :key="favoriteWeather.id"></h3> -->
    </div>
    <h1>LOOK: {{ currentFavoriteWeather }}</h1>
  </div>
</template>

<style></style>
