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
      homeAirport: "",
      isHomePresent: false,
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
    this.getUser();
  },
  methods: {
    goToCreate: function () {
      this.$router.push("/add");
    },
    getUser: function () {
      axios.get("/users").then((response) => {
        this.user = response.data;
        console.log("user", response.data);
        this.getHomeWeather();
      });
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
    getHomeWeather: function () {
      const favorite = this.user.home_airport;
      const headers = {
        Authorization: "Bearer " + process.env.VUE_APP_AVWX_1,
      };
      axios.get(`https://avwx.rest/api/metar/${favorite}`, { headers }).then((response) => {
        this.homeAirport = response.data;
        console.log("Home Airport", response.data);
        this.isHomePresent = true;
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
    goShow: function (IATA) {
      this.$router.push("/weather/" + IATA);
    },
  },
};
</script>

<template>
  <header class="py-5">
    <div class="container px-lg-5">
      <div class="p-4 p-lg-5 bg-light rounded-3 text-center">
        <div class="m-4 m-lg-5">
          <h1 class="display-5 fw-bold">Welcome, {{ user.name }}.</h1>
          <h2 v-show="this.isHomePresent === true">Here is {{ user.home_airport }}'s Weather</h2>
          <a v-show="this.isHomePresent === false" href="/update">Add Home Airport</a>

          <div id="home-card-view">
            <div id="card">
              <li class="text-dark fa-solid fa-binoculars fa-2xl animation-duration: 3s; fa-fade mt-2"></li>
              <p class="mt-3">
                <span>{{ homeAirport.flight_rules }}</span>
              </p>
            </div>
            <div id="card">
              <li class="text-success fa-solid fa-gauge fa-2xl animation-duration: 3s; fa-spin mt-2"></li>
              <p class="mt-3">
                <span>{{ homeAirport.altimeter.value }}</span>
              </p>
            </div>
            <li class="text-warning fa-solid fa-wind fa-2xl animation-duration: 3s; fa-beat"></li>
            <p class="mt-3">
              Direction:
              <span>{{ homeAirport.wind_direction.repr }}</span>
              Knots
            </p>
            <p class="mt-3">
              Speed:
              <span>{{ homeAirport.wind_speed.value }}</span>
            </p>
            <li class="text-dark fa-solid fa-temperature-half fa-2xl animation-duration: 3s; fa-bounce mt-2"></li>
            <p class="mt-3">
              Temperature:
              <span>{{ homeAirport.temperature.value }}</span>
              Celcius
            </p>

            <button @click="goShow(homeAirport.station)" class="button button--telesto">
              <span>Full Weather</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
  <header class="py-5">
    <div class="container px-md-2">
      <div class="p-4 p-md-2 bg-light rounded-3 text-center">
        <div class="m-4 m-lg-5">
          <h2 v-show="favorites.length > 1" class="fs-4">You Have {{ favorites.length }} Favorited Airports</h2>
          <h2 v-show="favorites.length === 1" class="fs-4">You Have 1 Favorited Airport</h2>
          <button v-show="favorites.length === 0" @click="goToCreate">Add a Favorite Here</button>
        </div>
      </div>
    </div>
  </header>
  <div class="home">
    <div class="row gx-lg-5">
      <div class="col-lg-6 col-xxl-4 mb-5" v-for="weather in weatherArray" :key="weather.id">
        <div class="card bg-light border-0 h-100">
          <div class="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
            <div class="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4">
              <i class="fa-solid fa-plane-departure"></i>
            </div>
            <h2 class="fs-4 fw-bold">{{ searchByICAOName(this.favorites, weather.station) }}</h2>
            <div id="home-card-view">
              <li class="text-dark fa-solid fa-binoculars fa-2xl animation-duration: 3s; fa-fade mt-2"></li>
              <p class="mt-3">
                <span>{{ weather.flight_rules }}</span>
              </p>
              <li class="text-success fa-solid fa-gauge fa-2xl animation-duration: 3s; fa-spin mt-2"></li>
              <p class="mt-3">
                <span>{{ weather.altimeter.value }}</span>
              </p>
              <li class="text-warning fa-solid fa-wind fa-2xl animation-duration: 3s; fa-beat"></li>
              <p class="mt-3">
                Direction:
                <span>{{ weather.wind_direction.repr }}</span>
                Knots
              </p>
              <p class="mt-3">
                Speed:
                <span>{{ weather.wind_speed.value }}</span>
              </p>
              <li class="text-dark fa-solid fa-temperature-half fa-2xl animation-duration: 3s; fa-bounce mt-2"></li>
              <p class="mt-3">
                Temperature:
                <span>{{ weather.temperature.value }}</span>
                Celcius
              </p>
            </div>

            <button @click="goShow(weather.station)" class="button button--telesto">
              <span>Full Weather</span>
            </button>

            <button
              @click="deleteFavorite(searchByICAOID(this.favorites, weather.station))"
              class="button button--rhea"
            >
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
span {
  font-weight: bold;
  font-size: 20px;
}
</style>
