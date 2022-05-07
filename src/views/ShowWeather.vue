<script>
import axios from "axios";
export default {
  data: function () {
    return {
      weather: "",
      favorites: [],
    };
  },
  created: function () {
    this.getWeather(this.$route.params.icao);
    axios.get("/favorites").then((response) => {
      this.favorites = response.data;
      console.log("favorites", response.data);
    });
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
    searchByICAOName: function (obj, value) {
      for (var i = 0; i < obj.length; i++) {
        if (obj[i].airport_icao === value) {
          return obj[i].airport_name;
        }
      }
    },
  },
};
</script>

<template>
  <header class="py-5">
    <div class="container px-lg-5">
      <div class="p-4 p-lg-5 bg-light rounded-3 text-center">
        <div class="m-4 m-lg-5">
          <h1 class="display-5 fw-bold">
            Full Weather for {{ searchByICAOName(this.favorites, this.weather.station) }}
          </h1>
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
          <h1>{{ weather.wind_direction ? weather.wind_direction.repr : "Not Reporting" }}</h1>
        </div>
        <div class="text-warning text-center mt-3"><h4>Gust</h4></div>
        <div class="text-warning text-center mt-2">
          <h1>{{ weather.wind_gust ? weather.wind_gust.repr : "Not Reporting" }}</h1>
        </div>
        <div class="text-warning text-center mt-3"><h4>Speed</h4></div>
        <div class="text-warning text-center mt-2">
          <h1>
            {{ weather.wind_speed ? weather.wind_speed.repr : "Not Reporting" }}
          </h1>
        </div>
      </div>
    </div>
    <!-- altimeter settings -->
    <div class="col-md-3">
      <div class="card border-success mx-sm-1 p-3">
        <div id="icon" class="text-info p-4 my-card">
          <span
            class="text-success fa-solid fa-gauge fa-2xl animation-duration: 3s; fa-shake"
            aria-hidden="true"
          ></span>
        </div>
        <div class="text-success text-center mt-3"><h4>Altimeter</h4></div>
        <div class="text-success text-center mt-2">
          <h1>{{ weather.altimeter ? weather.altimeter.value : "Not Reporting" }}</h1>
        </div>
        <div class="text-success text-center mt-3"><h4>Temperature</h4></div>
        <div class="text-success text-center mt-2">
          <h1>{{ weather.temperature ? weather.temperature.repr : "Not Reporting" }}</h1>
        </div>
        <div class="text-success text-center mt-3"><h4>Density Altitude</h4></div>
        <div class="text-success text-center mt-2">
          <h1>{{ weather.density_altitude ? weather.density_altitude : "Not Reporting" }}</h1>
        </div>
        <div class="text-success text-center mt-3"><h4>Pressure Altitude</h4></div>
        <div class="text-success text-center mt-2">
          <h1>{{ weather.pressure_altitude ? weather.pressure_altitude : "Not Reporting" }}</h1>
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
          <h1>{{ weather.clouds ? weather.clouds[0].repr : "Not Reporting" }}</h1>
        </div>
        <div class="text-info text-center mt-3"><h4>Flight Rules</h4></div>
        <div class="text-info text-center mt-2">
          <h1>{{ weather.flight_rules ? weather.flight_rules : "Not Reporting" }}</h1>
        </div>
        <div class="text-info text-center mt-3"><h4>Modifier</h4></div>
        <div class="text-info text-center mt-2">
          <h1>
            {{ weather.clouds[0].modifier ? weather.clouds[0].modifier : "Not Reporting" }}
          </h1>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card border-danger mx-sm-1 p-3">
        <div class="card border-danger shadow text-danger p-3 my-card">
          <span class="fa fa-heart" aria-hidden="true"></span>
        </div>
        <div class="text-danger text-center mt-3"><h4>Hearts</h4></div>
        <div class="text-danger text-center mt-2"><h1>346</h1></div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card border-warning mx-sm-1 p-3">
        <div class="card border-warning shadow text-warning p-3 my-card">
          <span class="fa fa-inbox" aria-hidden="true"></span>
        </div>
        <div class="text-warning text-center mt-3"><h4>Inbox</h4></div>
        <div class="text-warning text-center mt-2"><h1>346</h1></div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card border-dark mx-sm-1 p-3">
        <div class="card border-dark shadow text-dark p-3 my-card">
          <span class="fa fa-inbox" aria-hidden="true"></span>
        </div>
        <div class="text-dark text-center mt-3"><h4>Inbox</h4></div>
        <div class="text-dark text-center mt-2"><h1>346</h1></div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card border-secondary mx-sm-1 p-3">
        <div class="card border-secondary shadow text-dark p-3 my-card">
          <span class="fa fa-inbox" aria-hidden="true"></span>
        </div>
        <div class="text-secondary text-center mt-3"><h4>Inbox</h4></div>
        <div class="text-secondary text-center mt-2"><h1>346</h1></div>
      </div>
    </div>
  </div>

  <div id="show">
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

<style></style>
