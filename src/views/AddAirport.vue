<script>
import axios from "axios";
export default {
  data: function () {
    return {
      airportParams: { iata: "" },
      addedAirport: "",
      isAdded: false,
      status: "",
      isActive: false,
      error: false,
      favorites: [],
      isPresent: false,
      airportNameSearchString: "",
      airportFeed: "",
    };
  },
  created: function () {
    axios.get("/favorites").then((response) => {
      this.favorites = response.data;
      console.log("favorites", response.data);
    });
  },
  methods: {
    searchFavorites: function (airportIATA) {
      this.isPresent = false;
      this.favorites.forEach((favorite) => {
        console.log(favorite.airport_iata, airportIATA);
        if (favorite.airport_iata === airportIATA) {
          this.status = "This is Already Favorited";
          console.log("status", this.status);
          this.isPresent = true;
          return;
        }
      });
      console.log("search favorites ispresent", this.isPresent);
      if (this.isPresent === false) {
        this.addAirport(airportIATA);
      }
    },
    addAirport: function (IATA) {
      console.log("ispresent", this.isPresent, IATA);
      axios
        .post("/favorites", { iata: IATA })
        .then((response) => {
          console.log("success", response.data, IATA);
          this.addedAirport = response.data;
          this.isActive = !this.isActive;
          this.error = false;
          this.isPresent = false;
        })
        .catch((error) => {
          console.log("error", error.response.status, error.response.statusText);
          this.status = error.response.status;
          this.error = true;
          this.isActive = !this.isActive;
        });
    },
    goHome: function () {
      this.$router.push("/home");
    },
    getAirportSearch: function () {
      const headers = {
        Authorization: "Bearer " + process.env.VUE_APP_AVWX_1,
      };
      axios
        .get(`https://avwx.rest/api/search/station?text=${this.input}&n=3&airport=true&reporting=true&format=json`, {
          headers,
        })
        .then((response) => {
          this.airportFeed = response.data;
          console.log("active search", response.data);
          console.log("search", this.airportFeed);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<template>
  <div id="add-airport">
    <div id="input-container">
      <input type="text" placeholder="Search by name, city, or IATA code" v-model="input" />
    </div>
    <div class="display" v-for="airport in airportFeed" v-bind:key="airport.id">
      <span class="individual-airport">{{ airport.name }}</span>
      <button @click="searchFavorites(airport.iata)">Add this airport</button>
    </div>
    <button @click="getAirportSearch">Active search test</button>

    <h1 v-show="isActive === true">Added Airport: {{ addedAirport.airport_name }}</h1>
    |
    <h1 v-show="error === true">{{ status }}</h1>
    |
    <h1 v-show="this.isPresent === true">{{ status }}</h1>
    |
    <button @click="goHome()">Check Out Your Favorites</button>
  </div>
</template>
