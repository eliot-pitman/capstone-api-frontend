<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
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
      search: false,
      input: "",
      isError: false,
      isLoading: false,
    };
  },
  created: function () {
    this.isLoading = true;
    axios.get("/favorites").then((response) => {
      this.favorites = response.data;
      console.log("favorites", response.data);
      this.isLoading = false;
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
        this.isPresent = false;

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
          this.isActive = true;
          this.error = false;
        })
        .catch((error) => {
          console.log("error", error.response.status, error.response.statusText);
          this.status = "This Airport is Not Available";
          this.error = true;
          this.isActive = false;
          this.isError = true;
        });
    },
    goHome: function () {
      this.$router.push("/home");
    },
    getAirportSearch: function () {
      this.search = true;
      this.isError = false;
      this.isLoading = true;
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
        })
        .catch((error) => {
          console.log("error", error.response.status, error.response.statusText);
          this.status = "Airport Not Found";
          this.error = true;
          this.isError = true;
          this.search = false;
          this.isLoading = false;
        });
    },
  },
  components: {
    Loading,
  },
};
</script>

<template>
  <!-- alerts  -->
  <div v-if="this.isError === false">
    <span v-if="this.search === true" class="alert alert-info mt-5">Select Airport Below</span>
  </div>
  <span v-if="this.isError === true" class="alert alert-warning mt-5">{{ this.status }}</span>
  <!-- search bar -->
  <div class="container mt-5">
    <div class="p-3 bg-light rounded-3 text-center">
      <div class="m-4 m-lg-5">
        <div id="search">
          <div>
            <h1 class="display-5 fw-bold">Search Airports by Name, City, IATA, or ICAO</h1>
          </div>
          <div><input class="mt-3" type="text" placeholder="Add Favorite" v-model="input" /></div>
          <li class="content__item">
            <button class="button button--anthe mt-3" @click="getAirportSearch">
              <span>Search Airports</span>
            </button>
          </li>
        </div>
      </div>
    </div>
  </div>
  <!-- success banner -->
  <span v-if="isActive === true" class="alert alert-success mt-3" role="alert">
    Added Airport: {{ addedAirport.airport_name }}
  </span>
  <!-- already favorited banner -->
  <span v-if="isPresent === true" class="alert alert-warning mt-3" role="alert">
    {{ status }}
  </span>
  <!-- error banner -->
  <span v-if="error === true" class="alert alert-warning mt-3" role="alert">
    {{ status }}
  </span>
  <!-- aiport options -->
  <div v-if="search === true">
    <div class="display mt-4" v-for="airport in airportFeed" v-bind:key="airport.id">
      <li class="content__item">
        <button class="button button--pandora mt-3" @click="searchFavorites(airport.iata)">
          <span>{{ airport.name }}</span>
        </button>
      </li>
    </div>
  </div>
  <!-- back to home -->
  <footer>
    <li class="content__item mt-3">
      <button @click="goHome()" class="button button--anthe mt-3"><span>Back to Favorites</span></button>
    </li>
  </footer>
  <loading :active="isLoading" :is-full-page="true"></loading>
</template>
