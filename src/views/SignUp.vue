<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: { home_airport: "" },
      errors: [],
      search: false,
      airportFeed: "",
      input: "",
    };
  },
  methods: {
    userCreate: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log("new user params", response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    getAirportSearch: function () {
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
          console.log("active search", response.data);
          console.log("search", this.airportFeed);
        })
        .catch((error) => {
          console.log("error", error.response.status, error.response.statusText);
          this.status = "Airport Not Found";
          this.error = true;
          this.isError = true;
          this.search = false;
        });
    },
    createHome: function (airport) {
      this.newUserParams.home_airport = airport;
      console.log("added home", airport);
    },
  },
};
</script>

<template>
  <form v-on:submit.prevent="userCreate()">
    <header class="py-2 user-info">
      <div class="container px-lg-5">
        <div class="p-4 p-lg-5 bg-light rounded-3 text-center">
          <div class="m-4 m-lg-5">
            <h1 class="display-5 fw-bold">Create an Account</h1>
            <br />
            <h3 class="fs-4">
              <div class="row mt-2">
                <ul>
                  <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                </ul>
                <div class="col-md-6 mt-3">
                  <input type="text" class="form-control" placeholder="Name" v-model="newUserParams.name" />
                </div>

                <div class="col-md-6 mt-3">
                  <input type="text" class="form-control" placeholder="Email" v-model="newUserParams.email" />
                </div>

                <div class="col-md-6 mt-3">
                  <input type="password" class="form-control" placeholder="Password" v-model="newUserParams.password" />
                </div>

                <div class="col-md-6 mt-3">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password Confirmation"
                    v-model="newUserParams.password_confirmation"
                  />
                </div>

                <div class="col-md-6 mt-3">
                  <input type="text" class="form-control" placeholder="Username" v-model="newUserParams.username" />
                </div>
                <div class="col-md-6 mt-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="~Add img address for avitar~ :')"
                    v-model="newUserParams.avitar"
                  />
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
  </form>
  <div class="col-md-6 mt-3">
    <input type="text" class="form-control" placeholder="Home Airport" v-model="input" />
    <button @click="getAirportSearch()">search</button>
  </div>
  <div v-if="search === true">
    <div class="display mt-4" v-for="airport in airportFeed" v-bind:key="airport.id">
      <h1>
        <span class="individual-airport">{{ airport.name }}</span>
      </h1>
      <li class="content__item">
        <button class="button button--anthe mt-3" @click="createHome(airport.iata)">
          <span>Add as Home Airport</span>
        </button>
      </li>
    </div>
  </div>
</template>
