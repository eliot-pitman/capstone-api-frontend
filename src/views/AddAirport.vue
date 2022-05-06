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
    };
  },
  created: function () {
    axios.get("/favorites").then((response) => {
      this.favorites = response.data;
      console.log("favorites", response.data);
    });
  },
  methods: {
    searchFavorites: function () {
      this.isPresent = false;
      this.favorites.forEach((favorite) => {
        console.log(favorite.airport_iata, this.airportParams);
        if (favorite.airport_iata === this.airportParams.iata) {
          this.status = "This is Already Favorited";
          console.log("status", this.status);
          this.isPresent = true;
          return;
        }
      });
      console.log("search favorites ispresent", this.isPresent);
      if (this.isPresent === false) {
        this.addAirport();
      }
    },
    addAirport: function () {
      console.log("ispresent", this.isPresent);
      axios
        .post("/favorites", this.airportParams)
        .then((response) => {
          console.log("success", response.data, this.airport_iata);
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
  },
};
</script>

<template>
  <div id="add-airport">
    <h1>Add an airport to your favorites:</h1>
    <input type="text" v-model="airportParams.iata" />
    |
    <button @click="searchFavorites">Add this airport</button>
    <h1 v-show="isActive === true">Added Airport: {{ addedAirport.airport_name }}</h1>
    |
    <h1 v-show="error === true">{{ status }}</h1>
    |
    <h1 v-show="this.isPresent === true">{{ status }}</h1>
    |
    <button @click="goHome()">Check Out Your Favorites</button>
  </div>
</template>
