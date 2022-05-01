<script>
import axios from "axios";
// import moment from "moment";
export default {
  data: function () {
    return {
      info: [],
      weatherArray: [],
      favorites: [],
      status: "",
      user: [],
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
    axios.get("/users").then((response) => {
      this.user = response.data;
      console.log("user", response.data);
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
          window.location.reload();
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
    searchByICAOName: function (obj, value) {
      // console.log("current favorite loop", obj);
      // console.log("ICAO value loop", value);
      for (var i = 0; i < obj.length; i++) {
        // console.log("obj[i].airport_icoa", obj[i].airport_icao, "obj[i]", obj[i]);
        if (obj[i].airport_icao === value) {
          return obj[i].airport_name;
        }
      }
    },
    searchByICAOID: function (obj, value) {
      // console.log("current favorite loop", obj);
      // console.log("ICAO value loop", value);
      for (var i = 0; i < obj.length; i++) {
        // console.log("obj[i].airport_icoa", obj[i].airport_icao, "obj[i]", obj[i]);
        if (obj[i].airport_icao === value) {
          return obj[i].id;
        }
      }
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>Welcome {{ user.name }}, here are your favorites</h1>
    <h2>You have {{ favorites.length }} favorites</h2>

    <button v-show="favorites.length === 0" @click="goToCreate">Add a Favorite Here</button>
    <button v-show="favorites.length > 0" @click="getFavorites">Refresh favorites</button>

    <div
      v-for="weather in weatherArray"
      :key="weather.id"
      class="card row-sm-4 text-white bg-dark mb-4"
      style="max-width: 18rem"
    >
      <div>
        <div class="card-header">{{ searchByICAOName(this.favorites, weather.station) }}</div>
        <div class="card-body">
          <h5 class="card-title">Brief Weather</h5>
          <p class="card-text">
            {{ weather.meta }}
          </p>
          <p class="card-text">
            {{ weather.raw }}
          </p>
          <p class="card-text">
            <a :href="`/weather/${weather.station}`">Full Weather Data</a>
          </p>
          <p class="card-text">
            <button @click="deleteFavorite(searchByICAOID(this.favorites, weather.station))">Remove Favorite</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
