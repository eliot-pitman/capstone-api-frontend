<script>
import axios from "axios";
export default {
  data: function () {
    return {
      airportParams: { iata: "" },
      addedAirport: "",
      isAdded: false,
      status: "",
      isActive: false,
      error: false,
    };
  },
  methods: {
    addAirport: function () {
      axios
        .post("/favorites", this.airportParams)
        .then((response) => {
          console.log("success", response.data, this.airport_iata);
          this.addedAirport = response.data;
          this.isActive = !this.isActive;
          this.error = false;
        })
        .catch((error) => {
          console.log("error", error.response.status, error.response.statusText);
          this.status = error.response.status;
          this.error = true;
          this.isActive = !this.isActive;
        });
    },
  },
};
</script>

<template>
  <div id="add-airport">
    <h1>Add an airport to your favorites:</h1>
    <input type="text" v-model="airportParams.iata" />
    <button @click="addAirport">Add this airport</button>
    <h1 v-show="isActive === true">Added Airport: {{ addedAirport.airport_name }}</h1>
    <h1 v-show="error === true">Status:{{ status }}</h1>
  </div>
</template>
