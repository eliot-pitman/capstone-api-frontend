<script>
import axios from "axios";
export default {
  data: function () {
    return {
      weather: "",
    };
  },
  created: function () {
    this.getWeather(this.$route.params.iata);
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
      <h1>
        Weather received at: {{ weather.meta.timestamp }}
        <h1>METAR: {{ weather.raw }}</h1>
        <h1>Full Weather:</h1>
        <h2>Clouds: {{ weather.clouds }}</h2>
        <h2>flight rules: {{ weather.flight_rules }}</h2>
        <h2>visibility: {{ weather.visibility }}</h2>
        <h2>
          Wind: direction =>{{ weather.wind_direction }} gust => {{ weather.wind_gust }} speed =>
          {{ weather.wind_speed }}
        </h2>
        <h2>{{ weather }}</h2>
      </h1>
    </div>
  </div>
</template>
