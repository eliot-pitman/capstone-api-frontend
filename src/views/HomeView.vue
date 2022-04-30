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
        this.getWeather(favoriteAirportInfo.airport_iata);
        this.info.push(favoriteAirportInfo);
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
    getWeather: function (favorite) {
      const headers = {
        Authorization: "Bearer " + process.env.VUE_APP_AVWX_1,
      };
      axios.get(`https://avwx.rest/api/metar/${favorite}`, { headers }).then((response) => {
        this.weatherArray.push(response.data);
        console.log("current Favorite Airport Weather", response.data);
        console.log("weatherArray", this.weatherArray);
      });
    },
    searchByICAO: function (obj, value) {
      // console.log("current favorite loop", obj);
      // console.log("ICAO value loop", value);
      for (var i = 0; i < obj.length; i++) {
        // console.log("obj[i].airport_icoa", obj[i].airport_icao, "obj[i]", obj[i]);
        if (obj[i].airport_icao === value) {
          return obj[i];
        }
      }
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
    <div v-for="weather in weatherArray" :key="weather.id">
      <p>{{ searchByICAO(this.favorites, weather.station) }}</p>
      <h1>{{ weather.station }}</h1>
      <h1>{{ weather.meta }}</h1>
      <h1>{{ weather.raw }}</h1>
      <h1>{{ weather.station }}</h1>
    </div>
  </div>
</template>

<style></style>
