<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  data: function () {
    return {
      message: "User Info:",
      user: [],
      updateParams: { home_airport: "" },
      status: "",
      isProfileImg: false,
      errors: [],
      airportFeed: "",
      isError: false,
      search: false,
      input: "",
      isLoading: false,
    };
  },
  created: function () {
    this.isLoading = true;
    axios.get("/users").then((response) => {
      this.user = response.data;
      console.log("user", response.data);
      this.isLoading = false;
    });
    if (this.user.avitar) {
      this.isProfileImg = true;
    }
  },
  methods: {
    userUpdate: function () {
      axios
        .patch("/users", this.updateParams)
        .then((response) => {
          console.log("success", response.data);
          this.$router.push("/userinfo");
        })
        .catch((error) => {
          console.log("error", error.response.status, error.response.statusText);
          this.errors = error.response.data.errors;
        });
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
    updateHome: function (iata) {
      this.updateParams.home_airport = iata;
      this.userUpdate();
    },
  },
  components: {
    Loading,
  },
};
</script>

<template>
  <div class="d-flex flex-column align-items-center text-center p-3 py-5">
    <img v-show="this.isProfileImg === true" id="profile-img" class="rounded-circle mt-5" :src="`${user.avitar}`" />
    <img
      v-show="this.isProfileImg === false"
      id="profile-img"
      class="rounded-circle mt-5"
      src="https://www.pngitem.com/pimgs/m/200-2008473_pilot-with-hat-and-tie-pilot-silhouette-transparent.png"
    />
    <span class="font-weight-bold">{{ user.name }}</span>
    <span class="text-black-50">{{ user.email }}</span>
  </div>
  <div>
    <header class="py-2 user-info">
      <div class="container px-lg-5">
        <div class="p-4 p-lg-5 bg-light rounded-3 text-center">
          <div class="m-4 m-lg-5">
            <h1 class="display-5 fw-bold">Account Information</h1>
            <br />
            <h3 class="fs-4">
              <div class="row mt-2">
                <ul>
                  <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                </ul>
                <div class="col-md-6 mt-3">
                  <input type="text" class="form-control" placeholder="Name" v-model="updateParams.name" />
                </div>

                <div class="col-md-6 mt-3">
                  <input type="text" class="form-control" placeholder="Email" v-model="updateParams.email" />
                </div>

                <div class="col-md-6 mt-3">
                  <input type="text" class="form-control" placeholder="Username" v-model="updateParams.username" />
                </div>

                <div class="col-md-6 mt-3">
                  <input type="text" class="form-control" placeholder="Home Airport" v-model="input" />
                  <!-- airport search button -->
                  <li class="content__item">
                    <button class="button button--anthe mt-3" @click="getAirportSearch()">
                      <span>Search Airports</span>
                    </button>
                  </li>
                </div>

                <!-- home airport options after search -->
                <div v-if="search === true">
                  <div class="display mt-4" v-for="airport in airportFeed" v-bind:key="airport.id">
                    <li class="content__item">
                      <button id="search" class="button button--pandora mt-3" @click="updateHome(airport.iata)">
                        <span>{{ airport.name }}</span>
                      </button>
                    </li>
                  </div>
                </div>
              </div>
            </h3>
            <br />
            <li class="content__item">
              <button class="button button--pandora mt-3" @click="userUpdate()">
                <span>Save</span>
              </button>
            </li>
          </div>
        </div>
      </div>
    </header>
  </div>
  <loading :active="isLoading" :is-full-page="true"></loading>
</template>

<style>
img {
  height: 150px;
  width: 150px;
}
#profile-img {
  background-image: url("https://www.pngitem.com/pimgs/m/200-2008473_pilot-with-hat-and-tie-pilot-silhouette-transparent.png");
}
</style>
