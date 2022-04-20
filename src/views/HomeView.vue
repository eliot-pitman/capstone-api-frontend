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
  created: function () {
    this.getFavorites();
  },
  methods: {
    getWeather: function (favorite) {
      const headers = {
        Authorization: "Bearer lOeb42_xPJibT35Pn9HvjCNI1GWcpsUNW9n0h4gQgw8",
      };
      axios.get(`https://avwx.rest/api/metar/${favorite}`, { headers }).then((response) => {
        this.currentFavoriteWeather = response.data;
        console.log("favorite weather front end", response.data);
      });
    },
    getFavorites: function () {
      axios.get("/favorites").then((response) => {
        this.favorites = response.data;
        console.log("favorites", response.data);
      });
    },
  },
  mounted: function () {
    window.setInterval(() => {
      this.getFavorites();
    }, 300000);
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h1>{{ favorites }}</h1>
    <div v-for="favorite in favorites" :key="favorite.id">
      <h1>Airport Name: {{ favorite.airport_name }}</h1>
      <h2>Airport IATA: {{ favorite.airport_iata }}</h2>
      <h2>Current Airport Weather {{ currentFavoriteWeather }}</h2>
      <button @click="getWeather(favorite.airport_iata)">update weather</button>
    </div>
  </div>
</template>

<style></style>
