<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  data: function () {
    return {
      newSessionParams: {},
      errors: [],
      isLoading: false,
    };
  },
  methods: {
    submit: function () {
      this.isLoading = true;
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/home");
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
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
  <div class="login">
    <form v-on:submit.prevent="submit()">
      <header class="py-2 user-info">
        <div class="container px-lg-5">
          <div class="p-4 p-lg-5 bg-light rounded-3 text-center">
            <div class="m-4 m-lg-5">
              <h1 class="display-5 fw-bold">Login</h1>
              <br />
              <h3 class="fs-4">
                <div class="row mt-2">
                  <ul>
                    <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                  </ul>
                  <div class="col-md-6 mt-3">
                    <input class="form-control" placeholder="Email" type="text" v-model="newSessionParams.email" />
                  </div>
                  <div class="col-md-6 mt-3">
                    <input
                      class="form-control"
                      placeholder="Password"
                      type="password"
                      v-model="newSessionParams.password"
                    />
                  </div>
                </div>
              </h3>
              <br />
              <li class="content__item">
                <button class="button button--calypso" @click="this.submit()"><span>Login</span></button>
              </li>
            </div>
          </div>
        </div>
      </header>
    </form>
  </div>
  <loading :active="isLoading" :is-full-page="true"></loading>
</template>
