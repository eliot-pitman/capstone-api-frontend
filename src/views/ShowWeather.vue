<script>
import axios from "axios";
import moment from "moment";
export default {
  data: function () {
    return {
      weather: "",
      favorites: [],
      toggle: false,
      isLoaded: false,
    };
  },
  created: function () {
    this.getWeather(this.$route.params.icao);
    axios.get("/favorites").then((response) => {
      this.favorites = response.data;
      // console.log("favorites", response.data);
    });
  },
  methods: {
    getWeather: function (favorite) {
      const headers = {
        Authorization: "Bearer " + process.env.VUE_APP_AVWX_1,
      };
      axios.get(`https://avwx.rest/api/metar/${favorite}`, { headers }).then((response) => {
        this.weather = response.data;
        // console.log("current weather", response.data);
      });
    },
    searchByICAOName: function (obj, value) {
      for (var i = 0; i < obj.length; i++) {
        if (obj[i].airport_icao === value) {
          return obj[i].airport_name;
        }
      }
    },
    zuluToLocal: function (utcDt, utcDtFormat) {
      var toDt = moment.utc(utcDt, utcDtFormat).toDate();
      return moment(toDt).format("YYYY-MM-DD hh:mm:ss A");
    },
  },
};
</script>

<template>
  <header class="py-5">
    <div class="container px-lg-5">
      <div class="p-4 p-lg-5 bg-light rounded-3 text-center">
        <div class="m-4 m-lg-5">
          <h1 class="display-5 fw-bold">Full Weather for {{ this.$route.params.icao }}</h1>
          <h4>Last Reported: {{ this.zuluToLocal(weather.meta.timestamp) }} Local Time</h4>
          <p>UTC: {{ weather.meta.timestamp }}</p>
        </div>
      </div>
    </div>
  </header>
  <div class="row w-100">
    <!-- wind -->
    <div class="col-md-3">
      <div class="card border-warning mx-sm-1 p-3">
        <div id="icon" class="text-warning p-4 my-card">
          <span class="text-warning fa-solid fa-wind fa-2xl animation-duration: 3s; fa-beat" aria-hidden="true"></span>
        </div>
        <div class="text-warning text-center mt-3"><h4>Direction</h4></div>
        <div class="text-warning text-center mt-2">
          <h1>{{ weather.wind_direction ? weather.wind_direction.repr : "No Value Given" }}</h1>
        </div>
        <div class="text-warning text-center mt-3"><h4>Gust</h4></div>
        <div class="text-warning text-center mt-2">
          <h1>{{ weather.wind_gust ? weather.wind_gust.repr : "No Value Given" }}</h1>
        </div>
        <div class="text-warning text-center mt-3"><h4>Speed</h4></div>
        <div class="text-warning text-center mt-2">
          <h1>
            {{ weather.wind_speed ? weather.wind_speed.repr + " Knots" : "No Value Given" }}
          </h1>
        </div>
      </div>
    </div>
    <!-- altimeter settings -->
    <div class="col-md-3">
      <div class="card border-success mx-sm-1 p-3">
        <div id="icon" class="text-info p-4 my-card">
          <span class="text-success fa-solid fa-gauge fa-2xl animation-duration: 3s; fa-spin" aria-hidden="true"></span>
        </div>
        <div class="text-success text-center mt-3"><h4>Altimeter</h4></div>
        <div class="text-success text-center mt-2">
          <h1>{{ weather.altimeter ? weather.altimeter.value : "No Value Given" }}</h1>
        </div>
        <div class="text-success text-center mt-3"><h4>Temperature</h4></div>
        <div class="text-success text-center mt-2">
          <h1>{{ weather.temperature ? weather.temperature.repr + " C" : "No Temperature Given" }}</h1>
        </div>
        <div class="text-success text-center mt-3"><h4>Density Altitude</h4></div>
        <div class="text-success text-center mt-2">
          <h1>{{ weather.density_altitude ? weather.density_altitude + " ft." : "No Density Alt. Given" }}</h1>
        </div>
        <div class="text-success text-center mt-3"><h4>Pressure Altitude</h4></div>
        <div class="text-success text-center mt-2">
          <h1>{{ weather.pressure_altitude ? weather.pressure_altitude + " ft." : "No Pressure Alt. Given" }}</h1>
        </div>
      </div>
    </div>
    <!-- clouds -->
    <div class="col-md-3">
      <div class="card border-info mx-sm-1 p-3">
        <div id="icon" class="text-info p-4 my-card">
          <span class="text-info fa-solid fa-cloud fa-2xl animation-duration: 3s; fa-fade" aria-hidden="true"></span>
        </div>
        <div class="text-info text-center mt-3"><h4>Clouds</h4></div>
        <div class="text-info text-center mt-2">
          <h1>{{ weather.clouds[0] ? weather.clouds[0].repr : "No Cloud Report Given" }}</h1>
        </div>
        <div class="text-info text-center mt-3"><h4>Flight Rules</h4></div>
        <div class="text-info text-center mt-2">
          <h1>{{ weather.flight_rules ? weather.flight_rules : "No Flight Rules Given" }}</h1>
        </div>
        <div class="text-info text-center mt-3"><h4>Modifier</h4></div>
        <div class="text-info text-center mt-2">
          <h1>
            {{ weather.clouds[0] ? weather.clouds[0].modifier : "No Modifiers Given" }}
          </h1>
        </div>
      </div>
    </div>
    <!-- precipitation -->
    <div class="col-md-3">
      <div class="card border-danger mx-sm-1 p-3">
        <div id="icon" class="text-danger p-3 my-card">
          <span class="fa-solid fa-cloud-sun-rain fa-2xl fa-shake" aria-hidden="true"></span>
        </div>
        <div class="text-danger text-center mt-3"><h4>Hourly Precipitation</h4></div>
        <div class="text-danger text-center mt-2">
          <h1>{{ weather.precip_hourly ? weather.precip_hourly + " in." : "No Precipitation Reported" }}</h1>
        </div>
        <div class="text-danger text-center mt-3"><h4>Snow Depth</h4></div>
        <div class="text-danger text-center mt-2">
          <h1>{{ weather.snow_depth ? weather.snow_depth + " in." : "No Snow Reported" }}</h1>
        </div>
        <div class="text-danger text-center mt-3"><h4>Runway Visibility</h4></div>
        <div class="text-danger text-center mt-2">
          <h1>{{ weather.runway_visibility[0] ? weather.runway_visibility[0] : "No Runway Visibility Reported" }}</h1>
        </div>
      </div>
    </div>
  </div>

  <div v-if="toggle === true" class="alert alert-info mt-4">Unparsed data below</div>
  <div id="show-weather">
    <button class="btn btn-light btn-rounded mt-4 mb-4" @click="toggle = !toggle">See full report...</button>
    <h1 v-show="toggle === true">
      <h2>{{ weather }}</h2>
    </h1>
  </div>
</template>

<style></style>
