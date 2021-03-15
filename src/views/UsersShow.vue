<template>
  <div class="users-show">
    <h2>{{ user.user_name }}</h2>
    <p>{{ user.email }}</p>
    <img v-bind:src="user.image_url" class="" alt="" />
    <p>{{ user.bio }}</p>
    <button>Edit</button>
    <button>Delete</button>
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
