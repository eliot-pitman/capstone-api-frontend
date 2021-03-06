<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  data: function () {
    return {
      newUserParams: { home_airport: this.selectedHomeAirport, email: this.email },
      errors: [],
      search: false,
      airportFeed: "",
      input: "",
      selectedHomeAirport: "",
      isEditing: false,
      homeAdded: false,
      isError: false,
      isHomeError: false,
      isLoading: false,
      msg: [],
      email: "",
      noGo: false,
    };
  },
  watch: {
    email: function (value) {
      this.newUserParams.email = value;
      this.validateEmail(value);
    },
  },
  beforeMount() {
    window.addEventListener("beforeunload", this.preventNav);
  },
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.preventNav);
  },
  beforeRouteLeave(to, from, next) {
    if (this.isEditing) {
      if (!window.confirm("Leave without saving?")) {
        return;
      }
    }
    next();
  },
  methods: {
    userCreate: function () {
      this.isEditing = false;
      this.isLoading = true;
      // console.log("new user", this.newUserParams);
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log("new user params", response.data);
          this.$router.push("/login");
          this.isLoading = false;
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          this.isError = true;
          this.isLoading = false;
        });
    },
    getAirportSearch: function () {
      this.isLoading = true;
      this.search = true;
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
          // console.log("active search", response.data);
          // console.log("search", this.airportFeed);
          this.isLoading = false;
        })
        .catch((error) => {
          console.log("error", error.response.status, error.response.statusText);
          this.status = "Airport Not Found";
          this.error = true;
          this.isError = true;
          this.isHomeError = true;
          this.search = false;
          this.isLoading = false;
        });
    },
    createHome: function (airport) {
      this.newUserParams.home_airport = airport;
      this.homeAdded = true;
      this.search = false;
      this.selectedHomeAirport = airport;
      // console.log("added home", airport);
    },
    preventNav(event) {
      if (!this.isEditing) return;
      event.preventDefault();
      event.returnValue = "";
    },
    validateEmail: function (value) {
      //eslint-disable-next-line
      if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(value)) {
        this.msg["email"] = "";
      } else {
        this.msg["email"] = "Invalid Email Address";
        this.noGo = true;
      }
    },
  },

  components: {
    Loading,
  },
};
</script>

<template>
  <div>
    <header class="py-2 user-info">
      <div class="container px-lg-5">
        <div class="p-4 p-lg-5 bg-light rounded-3 text-center">
          <div class="m-4 m-lg-5">
            <h1 class="display-5 fw-bold">Create an Account</h1>
            <br />
            <h3 class="fs-4">
              <div class="row mt-2">
                <div v-for="error in errors" :key="error.id" class="alert alert-warning mt-3" role="alert">
                  {{ error }}
                </div>

                <div class="col-md-6 mt-3">
                  <input type="text" class="form-control" placeholder="Name (Required)" v-model="newUserParams.name" />
                </div>

                <div class="col-md-6 mt-3">
                  <input type="email" class="form-control" placeholder="Email (Required)" v-model="email" />
                  <small v-if="msg.email">{{ msg.email }}</small>
                </div>

                <div class="col-md-6 mt-3">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password (Required)"
                    v-model="newUserParams.password"
                  />
                </div>

                <div class="col-md-6 mt-3">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password Confirmation (Required)"
                    v-model="newUserParams.password_confirmation"
                  />
                </div>

                <div class="col-md-6 mt-3">
                  <input type="text" class="form-control" placeholder="Username" v-model="newUserParams.username" />
                </div>
                <!-- <div class="col-md-6 mt-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="~Add img address for avitar~ :')"
                    v-model="newUserParams.avitar"
                  />
                </div> -->
                <!-- selected home airport banner -->
                <div v-if="homeAdded === true" class="alert alert-success mt-3" role="alert">
                  Home Airport: {{ this.selectedHomeAirport }}
                </div>

                <div v-if="isHomeError === true" class="alert alert-warning mt-3" role="alert">{{ this.status }}</div>

                <div v-if="homeAdded === false" class="col-md-6 mt-3">
                  <input type="text" class="form-control" placeholder="Home Airport (Required)" v-model="input" />
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
                      <button id="search" class="button button--pandora mt-3" @click="createHome(airport.iata)">
                        <span>{{ airport.name }}</span>
                      </button>
                    </li>
                  </div>
                </div>
              </div>
            </h3>
            <br />
            <li class="content__item">
              <button class="button button--calypso" @click="this.userCreate()"><span>Create Account</span></button>
            </li>
          </div>
        </div>
      </div>
    </header>
  </div>
  <loading :active="isLoading" :is-full-page="true"></loading>
</template>

<style scoped>
small {
  padding-top: 0px;
  margin-top: 0px;
  font-size: 12px;
  color: red;
}
</style>
