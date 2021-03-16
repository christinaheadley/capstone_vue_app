<template>
  <div class="users-edit">
    <form v-on:submit.prevent="updateUser()">
      <h1>Edit Profile:</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>User Name:</label>
        <input type="text" class="form-control" v-model="user.user_name" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" class="form-control" v-model="user.email" />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" class="form-control" v-model="user.password" />
      </div>
      <div class="form-group">
        <label>Confirm Password:</label>
        <input type="password" class="form-control" v-model="user.password_confirmation" />
      </div>
      <div class="form-group">
        <label>Bio:</label>
        <input type="text" class="form-control" v-model="user.bio" />
      </div>
      <div class="form-group">
        <label>Image:</label>
        <input type="text" class="form-control" v-model="user.image_url" />
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user: {},
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {
    updateUser: function() {
      let params = {
        user_name: this.userName,
        body: this.body,
        image_url: this.imageUrl,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
        bio: this.bio,
      };
      axios
        .patch(`/api/users/${this.user.id}`, params)
        .then(response => {
          console.log(response.data);
          this.$parent.flashMessage = "Profile successfully updated!";
          this.$router.push(`/users/${this.user.id}`);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },
    methods: {
      destroyUser: function() {
        if (confirm("Do you want to delete your profile?")) {
          axios.delete(`api/users/${this.user.id}`).then(response => {
            console.log(response.data);
            this.$parent.flashMessage = "Profile successfully deleted!";
            this.$router.push("/");
            // enter logout stuff here
          });
        }
      },
    },
  },
};
</script>
