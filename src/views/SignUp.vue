<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
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
                <div class="col-md-6">
                  <input type="text" class="form-control" placeholder="Name" v-model="newUserParams.name" />
                </div>
                <br />
                <br />
                <div class="col-md-6">
                  <input type="text" class="form-control" placeholder="Email" v-model="newUserParams.email" />
                </div>
                <br />
                <br />
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Home Airport"
                    v-model="newUserParams.home_airport"
                  />
                </div>
                <br />
                <br />
                <div class="col-md-6">
                  <input type="text" class="form-control" placeholder="Username" v-model="newUserParams.username" />
                </div>
                <br />
                <br />
                <div class="col-md-6">
                  <input type="password" class="form-control" placeholder="Password" v-model="newUserParams.password" />
                </div>
                <br />
                <br />
                <div class="col-md-6">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password Confirmation"
                    v-model="newUserParams.password_confirmation"
                  />
                </div>
                <br />
                <br />
                <div class="col-md-6">
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
            <input class="btn btn-primary btn-lg" type="submit" value="Create" />
          </div>
        </div>
      </div>
    </header>
  </form>
</template>
