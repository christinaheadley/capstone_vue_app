<template>
  <div class="users-edit">
    <!-- ============================================================= SECTION – WORK SAMPLES ============================================================= -->

    <section id="work-samples" class="dark-bg">
      <div class="container inner-md">
        <div class="row">
          <div class="col-md-6 inner-top inner-right-xs inner-bottom-xs">
            <img v-bind:src="user.image_url" class="" alt="" />
          </div>
          <!-- /.col -->
          <div class="col-lg-6 inner-right-xs inner-bottom-xs">
            <form v-on:submit.prevent="updateUser(user)">
              <h1>Edit Profile:</h1>
              <ul>
                <li class="text-danger" v-for="error in errors" v-bind:key="error">
                  {{ error }}
                </li>
              </ul>
              <div class="form-group">
                <label>User Name:</label>
                <input type="text" autocomplete="on" class="form-control" v-model="user.user_name" />
              </div>
              <div class="form-group">
                <label>Email:</label>
                <input type="email" autocomplete="on" class="form-control" v-model="user.email" />
              </div>
              <div class="form-group">
                <label>Password:</label>
                <input type="password" autocomplete="on" class="form-control" v-model="user.password" />
              </div>
              <div class="form-group">
                <label>Confirm Password:</label>
                <input type="password" autocomplete="on" class="form-control" v-model="user.password_confirmation" />
              </div>

              <div class="form-group">
                <label>Bio:</label>
                <input type="text" autocomplete="on" class="form-control" v-model="user.bio" />
              </div>
              <div class="form-group">
                <label>Location:</label>
                <input type="text" autocomplete="on" class="form-control" v-model="user.location" />
              </div>
              <div class="form-group">
                <label>Image:</label>
                <input type="text" autocomplete="on" class="form-control" v-model="user.image_url" />
              </div>
              <input type="submit" class="btn btn-large btn-green" value="Submit" />
              <button v-on:click="destroyUser(user)" class="btn  col-md-12 btn-large btn-red align-center">
                Delete Account
              </button>
            </form>
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container -->
    </section>

    <!-- ============================================================= SECTION – WORK SAMPLES : END =============================================================== -->
  </div>
</template>

<style>
.container .row .col-md-6 .btn {
  width: 60%;
}
</style>

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
    updateUser: function(user) {
      let params = {
        user_name: user.user_name,
        body: user.body,
        image_url: user.image_url,
        password: user.password,
        password_confirmation: user.password_confirmation,
        bio: user.bio,
        location: user.location,
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
    destroyUser: function(user) {
      if (confirm("Do you want to delete your profile?")) {
        axios.delete(`api/users/${this.user.id}`).then(response => {
          console.log(response.data);
          console.log(user);
          this.$parent.flashMessage = "Profile successfully deleted!";
          this.$router.push("/");
        });
      }
    },
  },
};
</script>
