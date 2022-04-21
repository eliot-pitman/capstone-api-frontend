<script>
import axios from "axios";
// import moment from "moment";
export default {
  data: function () {
    return {
      greeting: "Welcome to METAR, here are your favorite airports METAR",
      airport: [],
      info: [],
      favorites: [],
      favoritesWeather: "",
      currentFavoriteWeather: [],
      timer: "",
    };
  },
  created: function () {
    this.getFavorites();
  },
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
    goToCreate: function () {
      this.$router.push("/add");
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ greeting }}</h1>
    <h2>You have {{ favorites.length }} favorites</h2>
    <button v-show="favorites.length === 0" @click="goToCreate">Add a Favorite Here</button>
    <button v-show="favorites.length > 0" @click="getFavorites">Refresh favorites</button>
    <div v-for="favorite in favorites" :key="favorite.id">
      <h1>Airport Name: {{ favorite.airport_name }}</h1>
      <h2>Airport IATA: {{ favorite.airport_iata }}</h2>
      <h2>Airport ICAO: {{ favorite.airport_icao }}</h2>
      <!-- <h2>Current Airport Weather: {{ getWeather(favorite.airport_iata) }}</h2> -->
      <!-- <h3 v-for="favoriteWeather in currentFavoriteWeather" :key="favoriteWeather.id"></h3> -->
    </div>
  </div>
</template>

<style></style>
