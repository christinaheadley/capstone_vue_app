<template>
  <div class="users-show">
    <img src="../../src/assets/images/Social_RecoverWe_logo.png" />
    <h2>{{ user.user_name }}</h2>
    <p v-if="user.id == $parent.getUserId()">{{ user.email }}</p>
    <img v-bind:src="user.image_url" class="" alt="" />
    <p>{{ user.bio }}</p>
    <div v-if="user.id == $parent.getUserId()">
      <router-link :to="`/users/${user.id}/edit`">
        <button>Edit Profile</button>
      </router-link>
      <button v-on:click="destroyUser()">Delete</button>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user: {},
      errors: [],
    };
  },
  created: function() {
    axios
      .get(`/api/users/${this.$route.params.id}`)
      .then(response => {
        console.log(response.data);
        this.user = response.data;
      })
      .catch(error => {
        console.log(error.response);
        // reroute to sign in:
        this.errors = ["Unauthorized."];
      });
  },
  methods: {},
  // this.email = "";

  // this.password = "";
  // });
  // },
  // getUserId()
  // this.parent.user_id() }, };
};
</script>
