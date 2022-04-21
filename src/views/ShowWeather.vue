<script>
import axios from "axios";
export default {
  data: function () {
    return {
      weather: "",
    };
  },
  created: function () {
    // this.getWeather(this.$route.params.iata);
  },
  methods: {
    getWeather: function (favorite) {
      const headers = {
        Authorization: "Bearer " + process.env.VUE_APP_AVWX_1,
      };
      axios.get(`https://avwx.rest/api/metar/${favorite}`, { headers }).then((response) => {
        this.weather = response.data;
        console.log("current weather", response.data);
      });
    },
  },
};
</script>

<template>
  <div id="show">
    <button @click="this.getWeather(this.$route.params.iata)">get weather</button>
    <div id="show-weather">
      <h1>Weather: {{ weather }}</h1>
    </div>
  </div>
</template>
