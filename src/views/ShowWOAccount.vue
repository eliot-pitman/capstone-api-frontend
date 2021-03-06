<script>
import axios from "axios";
import moment from "moment";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
/* global mapboxgl */
export default {
  data: function () {
    return {
      airport: "",
      weather: [],
      airportInfo: "",
      toggle: false,
      airportCode: "",
      search: false,
      input: "",
      airportFeed: "",
      currentAirport: "",
      isLoading: false,
      isError: false,
      lat: "",
      long: "",
      status: "",
      runways: [],
    };
  },

  methods: {
    getAirportSearch: function () {
      this.search = false;
      this.isLoading = true;
      this.isError = false;
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
          this.isLoading = false;
          if (this.airportFeed.length === 0) {
            this.isError = true;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          this.isError = true;
        });
    },
    getWeather: function (ICAO, airportInfo) {
      console.log("weather param", ICAO);
      this.isLoading = true;
      this.isError = false;
      this.currentAirport = airportInfo;
      this.runways = airportInfo.runways;
      console.log("current airport", this.currentAirport);
      const headers = {
        Authorization: "Bearer " + process.env.VUE_APP_AVWX_1,
      };
      axios
        .get(`https://avwx.rest/api/metar/${ICAO}`, { headers })
        .then((response) => {
          this.weather = response.data;
          // console.log("current weather", response.data);
          this.search = true;
          this.isLoading = false;

          this.lat = this.currentAirport.latitude;
          this.long = this.currentAirport.longitude;
          this.getMap(this.long, this.lat);
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          this.isError = true;
        });
    },
    getMap: function (long, lat) {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_KEY;
      var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [long, lat],
        zoom: 11,
      });
      console.log(map);
      console.log("lat and long", this.lat, this.long);
    },

    zuluToLocal: function (utcDt, utcDtFormat) {
      var toDt = moment.utc(utcDt, utcDtFormat).toDate();
      return moment(toDt).format("YYYY-MM-DD hh:mm:ss A");
    },
  },
  components: {
    Loading,
  },
  // beforeUpdate: () => {
  //   this.getMap(this.long, this.lat);
  // },
};
</script>

<template>
  <div>
    <div class="container mt-5">
      <div class="p-3 bg-light rounded-3 text-center">
        <div class="m-4 m-lg-5">
          <div id="search">
            <div>
              <h1 class="display-5 fw-bold">Search Airports by Name, City, IATA, or ICAO</h1>
            </div>
            <div><input class="mt-3" type="text" placeholder="Search for Airport" v-model="input" /></div>
            <li class="content__item">
              <button class="button button--anthe mt-3" @click="getAirportSearch">
                <span>Search Airports</span>
              </button>
            </li>
          </div>
        </div>
      </div>
    </div>

    <div v-if="search === true" class="alert alert-info mt-5">
      <strong>Info Below</strong>
      Scroll down to get the full weather report.
    </div>

    <div v-if="isError === true" class="alert alert-warning mt-5">
      <strong>oops!</strong>
      This Aiport Isn't Supported :(
    </div>

    <div v-if="search === false">
      <div class="display mt-4" v-for="airport in airportFeed" v-bind:key="airport.id">
        <li class="content__item">
          <button class="button button--pandora mt-3" @click="getWeather(airport.icao, airport)">
            <span>{{ airport.name }}</span>
          </button>
        </li>
      </div>
    </div>

    <div v-if="search === true">
      <header class="py-5">
        <div class="container px-lg-5">
          <div class="p-4 p-lg-5 bg-light rounded-3 text-center">
            <div class="m-4 m-lg-5">
              <h1 class="display-5 fw-bold">Full Weather for {{ currentAirport.name }}</h1>
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
              <span
                class="text-info fa-solid fa-cloud fa-2xl animation-duration: 3s; fa-fade"
                aria-hidden="true"
              ></span>
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
              <h3>{{ weather.precip_hourly ? weather.precip_hourly + " in." : "No Precipitation Reported" }}</h3>
            </div>
            <div class="text-danger text-center mt-3"><h4>Snow Depth</h4></div>
            <div class="text-danger text-center mt-2">
              <h3>{{ weather.snow_depth ? weather.snow_depth + " in." : "No Snow Reported" }}</h3>
            </div>
            <div class="text-danger text-center mt-3"><h4>Runway Visibility</h4></div>
            <div class="text-danger text-center mt-2">
              <h3>
                {{ weather.runway_visibility[0] ? weather.runway_visibility[0] : "No Runway Visibility Reported" }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- airport information -->

  <div v-show="search === true" class="card text-white bg-dark mb-3 mt-3">
    <h2 class="card-header">{{ this.currentAirport.name }}'s Information</h2>
    <div class="card-body">
      <h3 class="card-title">City:</h3>
      <h5 class="card-title">{{ currentAirport.city }}</h5>
      <h4>
        <a :href="`${currentAirport.website}`" target="_blank">Website</a>
      </h4>
      <h4>
        <a :href="`${currentAirport.wiki}`" target="_blank">Wiki</a>
      </h4>
      <div v-if="runways.length > 0">
        <h3 class="card-title">Runways:</h3>
        <h5 class="card-title" v-for="runway in runways" :key="runway.id">{{ runway.ident1 }}, {{ runway.ident2 }}</h5>
      </div>

      <div id="map" class="container" style="width: 400px; height: 300px"></div>
    </div>
  </div>

  <!-- unparsed data -->
  <div v-if="search === true">
    <div v-if="toggle === true" class="alert alert-info mt-4">Unparsed data below</div>
    <div id="show-weather">
      <button class="btn btn-light btn-rounded mt-4 mb-4" @click="toggle = !toggle">See full report...</button>
      <h1 v-show="toggle === true">
        <h2>{{ weather }}</h2>
      </h1>
    </div>
  </div>

  <loading :active="isLoading" :is-full-page="true"></loading>
</template>

<style></style>
