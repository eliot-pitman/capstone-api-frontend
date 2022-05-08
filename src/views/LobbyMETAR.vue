<script>
import axios from "axios";
export default {
  data: function () {
    return {
      show: "/show",
    };
  },
  methods: {
    goShow: function () {
      this.$router.push("/show");
    },

    getWeather: function (airport) {
      const headers = {
        Authorization: "Bearer " + process.env.VUE_APP_AVWX_1,
      };
      axios
        .get(`https://avwx.rest/api/metar/${airport}`, { headers })
        .then((response) => {
          this.weather = response.data;
          console.log("current weather", response.data);
        })
        .then(this.airportInfoGet(this.airportCode));
    },
    airportInfoGet: function (code) {
      const headers = {
        "X-RapidAPI-Key": process.env.VUE_APP_AIRPORT_INFO,
      };
      axios.get(`https://airport-info.p.rapidapi.com/airport?iata=${code}`, { headers }).then((response) => {
        this.airportInfo = response.data;
        console.log("airport info", response.data);
      });
    },
  },
};
</script>

<template>
  <header class="py-5">
    <div class="container px-lg-5">
      <div class="p-4 p-lg-5 bg-light rounded-3 text-center">
        <div class="m-4 m-lg-5">
          <h1 class="display-5 fw-bold">Welcome, to METAR</h1>
          <h2>All your Favorite Airports in One Place</h2>
          <p>Easily make an account to save and search current weather data or...</p>
          <button @click="goShow">Search Without Account</button>
        </div>
      </div>
    </div>
  </header>
</template>
