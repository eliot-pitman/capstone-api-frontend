<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "User Info:",
      user: [],
      updateParams: {},
      status: "",
      isProfileImg: false,
      errors: [],
    };
  },
  created: function () {
    axios.get("/users").then((response) => {
      this.user = response.data;
      console.log("user", response.data);
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
  <form v-on:submit.prevent="userUpdate()">
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
                <div class="col-md-6">
                  <input type="text" class="form-control" placeholder="Name" v-model="updateParams.name" />
                </div>
                <br />
                <br />
                <div class="col-md-6">
                  <input type="text" class="form-control" placeholder="Email" v-model="updateParams.email" />
                </div>
                <br />
                <br />
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Home Airport"
                    v-model="updateParams.home_airport"
                  />
                </div>
                <br />
                <br />
                <div class="col-md-6">
                  <input type="text" class="form-control" placeholder="Username" v-model="updateParams.username" />
                </div>
              </div>
            </h3>
            <br />
            <input class="btn btn-primary btn-lg" type="submit" value="update" />
          </div>
        </div>
      </div>
    </header>
  </form>
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
