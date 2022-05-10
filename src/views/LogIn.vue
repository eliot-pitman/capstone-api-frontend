<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newSessionParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/home");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
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
                  <div class="col-md-6">
                    <label>Email:</label>

                    <input class="form-control" type="email" v-model="newSessionParams.email" />
                  </div>
                  <div class="col-md-6 mt-3">
                    <label>Password:</label>
                    <input class="form-control" type="password" v-model="newSessionParams.password" />
                  </div>
                </div>
              </h3>
              <br />
              <input class="btn btn-primary btn-lg" type="submit" value="Submit" />
            </div>
          </div>
        </div>
      </header>
    </form>
  </div>
</template>
