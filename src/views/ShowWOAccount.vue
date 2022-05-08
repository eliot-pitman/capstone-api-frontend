<script>
import axios from "axios";
export default {
  data: function () {
    return {
      airport: "",
      weather: [],
      airportInfo: "",
      toggle: false,
      airportCode: "",
      search: false,
    };
  },
  created: function () {},
  methods: {
    getWeather: function (airport) {
      const headers = {
        Authorization: "Bearer " + process.env.VUE_APP_AVWX_1,
      };
      axios
        .get(`https://avwx.rest/api/metar/${airport}`, { headers })
        .then((response) => {
          this.weather = response.data;
          console.log("current weather", response.data);
          this.search = true;
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
  <div>
    <div>
      <h1>Search Airport by IATA Code</h1>
      <a href="https://www.leonardsguide.com/us-airport-codes.shtml" target="_blank">Find IATA code</a>
    </div>
    <div>
      <input type="text" v-model="airportCode" />
      <button @click="getWeather(airportCode)">Search Airports</button>
    </div>

    <div v-if="search === true">
      <header class="py-5">
        <div class="container px-lg-5">
          <div class="p-4 p-lg-5 bg-light rounded-3 text-center">
            <div class="m-4 m-lg-5">
              <h1 class="display-5 fw-bold">Full Weather for</h1>
            </div>
          </div>
        </div>
      </header>
      <div class="row w-100">
        <!-- wind -->
        <div class="col-md-3">
          <div class="card border-warning mx-sm-1 p-3">
            <div id="icon" class="text-warning p-4 my-card">
              <span
                class="text-warning fa-solid fa-wind fa-2xl animation-duration: 3s; fa-beat"
                aria-hidden="true"
              ></span>
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
              <span
                class="text-success fa-solid fa-gauge fa-2xl animation-duration: 3s; fa-spin"
                aria-hidden="true"
              ></span>
            </div>
            <div class="text-success text-center mt-3"><h4>Altimeter</h4></div>
            <div class="text-success text-center mt-2">
              <h1>{{ weather.altimeter ? weather.altimeter.value : "No Value Given" }}</h1>
            </div>
            <div class="text-success text-center mt-3"><h4>Temperature</h4></div>
            <div class="text-success text-center mt-2">
              <h1>{{ weather.temperature ? weather.temperature.repr + " C" : "No Value Given" }}</h1>
            </div>
            <div class="text-success text-center mt-3"><h4>Density Altitude</h4></div>
            <div class="text-success text-center mt-2">
              <h1>{{ weather.density_altitude ? weather.density_altitude + " ft." : "No Value Given" }}</h1>
            </div>
            <div class="text-success text-center mt-3"><h4>Pressure Altitude</h4></div>
            <div class="text-success text-center mt-2">
              <h1>{{ weather.pressure_altitude ? weather.pressure_altitude + " ft." : "No Value Given" }}</h1>
            </div>
          </div>
        </div>
        <!-- clouds -->
        <div class="col-md-3">
          <div class="card border-info mx-sm-1 p-3">
            <div id="icon" class="text-info p-4 my-card">
              <span
                class="text-info fa-solid fa-cloud fa-2xl animation-duration: 3s; fa-fade"
                aria-hidden="true"
              ></span>
            </div>
            <div class="text-info text-center mt-3"><h4>Clouds</h4></div>
            <div class="text-info text-center mt-2">
              <h1>{{ weather.clouds[0] ? weather.clouds[0].repr : "No Value Given" }}</h1>
            </div>
            <div class="text-info text-center mt-3"><h4>Flight Rules</h4></div>
            <div class="text-info text-center mt-2">
              <h1>{{ weather.flight_rules ? weather.flight_rules : "No Value Given" }}</h1>
            </div>
            <div class="text-info text-center mt-3"><h4>Modifier</h4></div>
            <div class="text-info text-center mt-2">
              <h1>
                {{ weather.clouds[0] ? weather.clouds[0].modifier : "No Value Given" }}
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
              <h1>{{ weather.precip_hourly ? weather.precip_hourly + " in." : "No Value Given" }}</h1>
            </div>
            <div class="text-danger text-center mt-3"><h4>Snow Depth</h4></div>
            <div class="text-danger text-center mt-2">
              <h1>{{ weather.snow_depth ? weather.snow_depth + " in." : "No Value Given" }}</h1>
            </div>
            <div class="text-danger text-center mt-3"><h4>Runway Visibility</h4></div>
            <div class="text-danger text-center mt-2">
              <h1>{{ weather.runway_visibility ? weather.runway_visibility : "No Value Given" }}</h1>
            </div>
          </div>
        </div>
      </div>
      <div id="show-weather">
        <button class="btn btn-light btn-rounded mt-3" @click="toggle = !toggle">See full report...</button>
        <h1 v-show="toggle === true">
          <h2>{{ weather }}</h2>
        </h1>
      </div>
    </div>
  </div>
</template>

<style></style>
