<script>
import axios from "axios";
// import moment from "moment";
export default {
  data: function () {
    return {
      greeting: "Welcome to METAR, here are your favorite airports METAR",
      airport: [],
      info: [],
      weatherArray: [],
      favorites: [],
      favoritesWeather: "",
      currentFavoriteWeather: [],
      status: "",
      index: "",
      favoriteAirport: [],
    };
  },
  created: function () {
    axios.get("/favorites").then((response) => {
      this.favorites = response.data;
      console.log("favorites", response.data);
      this.favorites.forEach((favoriteAirportInfo) => {
        this.getWeather(favoriteAirportInfo.airport_iata, favoriteAirportInfo);
      });
    });
  },
  methods: {
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
    getWeather: function (favorite, favoriteAirportInfo) {
      const headers = {
        Authorization: "Bearer " + process.env.VUE_APP_AVWX_1,
      };
      axios.get(`https://avwx.rest/api/metar/${favorite}`, { headers }).then((response) => {
        this.weatherArray.push(response.data, favoriteAirportInfo);
        console.log("current Favorite Airport Weather", response.data);
        console.log("weatherArray", this.weatherArray);
        // return response.data;
      });
    },
    // getFavorite: function (iata) {
    //   this.favorites.forEach((favorite) => (this.index = favorite.indexOf(iata)));
    //   this.favoriteAirport.push(this.favorites[this.index]);
    // },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ greeting }}</h1>
    <h2>You have {{ favorites.length }} favorites</h2>
    <!-- <h3>{{ weatherArray }}</h3> -->

    <button v-show="favorites.length === 0" @click="goToCreate">Add a Favorite Here</button>
    <button v-show="favorites.length > 0" @click="getFavorites">Refresh favorites</button>
    <div v-for="weather in weatherArray" :key="weather.id">
      <h1>{{ weather.station }}</h1>
      <h1>{{ weather.meta }}</h1>
      <h1>{{ weather.raw }}</h1>
      <h1>{{ weather.station }}</h1>
    </div>
    <!-- <div v-for="favorite in favorites" :key="favorite.id">
      <h1>Airport Name: {{ favorite.airport_name }}</h1>
      <h2>Airport IATA: {{ favorite.airport_iata }}</h2>
      <h2>Airport ICAO: {{ favorite.airport_icao }}</h2>
      <h2>Weather: {{ info }}</h2>
      <a :href="`/weather/${favorite.airport_iata}`">Get Weather</a>
      |
      <button @click="deleteFavorite(favorite.id)">Remove this Favorite</button>
    </div> -->
  </div>
</template>

<style></style>
