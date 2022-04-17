<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "Welcome to METAR, here is your home airport METAR",
      airport: [],
      token: "key",
    };
  },
  created: function () {
    axios
      .get("https://private-47724b-avwx.apiary-mock.com/api/metar/KJFK", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.airport = response.data;
        console.log("airport weather", response.data);
      });
  },
  methods: {},
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>

    <h2>{{ airport }}</h2>
  </div>
</template>

<style></style>
