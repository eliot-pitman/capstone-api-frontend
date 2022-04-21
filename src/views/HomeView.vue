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
      status: "",
    };
  },
  created: function () {
    axios.get("/favorites").then((response) => {
      this.favorites = response.data;
      console.log("favorites", response.data);
    });
  },
  methods: {
    getWeather: function (favorite) {
      const headers = {
        Authorization: "Bearer " + process.env.VUE_APP_AVWX_1,
      };
      axios.get(`https://avwx.rest/api/metar/${favorite}`, { headers }).then((response) => {
        this.currentFavoriteWeather.push(response.data);
        console.log("current weather", response.data);
      });
    },
    goToCreate: function () {
      this.$router.push("/add");
    },
    deleteFavorite: function (airport_id) {
      console.log(airport_id);
      axios
        .delete("/favorites/" + airport_id)
        .then((response) => {
          console.log("successfully removed", response.data);
        })
        .catch((error) => {
          console.log("error", error.response.status, error.response.statusText);
          this.status = error.response.status;
        });
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
      <!-- <h3 v-for="favoriteWeather in currentFavoriteWeather" :key="favoriteWeather.id"></h3> -->
      <button @click="getWeather(favorite.airport_iata)">Get Weather</button>
      <button @click="deleteFavorite(favorite.id)">Remove this Favorite</button>
    </div>
  </div>
</template>

<style></style>
