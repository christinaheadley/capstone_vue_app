<template>
  <div class="users-show">
    <!-- ============================================================= SECTION – WORK SAMPLES ============================================================= -->

    <section id="work-samples" class="dark-bg">
      <div class="container inner">
        <div class="row">
          <div class="col-md-6 inner-right-xs text-right">
            <figure><img v-bind:src="user.image_url" class="" alt="" /></figure>
          </div>
          <!-- /.col -->

          <div class="col-md-4 inner-top-xs inner-left-xs">
            <h1 class="gray">{{ user.user_name }}</h1>
            <h3 class="gray">{{ user.location }}</h3>
            <p></p>
            <p>
              {{ user.bio }}
            </p>
            <div v-if="user.id == $parent.getUserId()">
              <router-link :to="`/users/${user.id}/edit`">
                <button class="btn col-lg-12 btn-gray">Edit Profile</button>
              </router-link>
              <!-- &nbsp;
              <button class="btn btn-gray" v-on:click="destroyUser()">Delete</button> -->
            </div>
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->

        <div class="row inner-top-sm">
          <div class="col-md-12"></div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container -->
    </section>

    <!-- ============================================================= SECTION – WORK SAMPLES : END ============================================================= -->
  </div>
</template>

<style>
img {
  max-width: 60%;
  height: auto;
}
</style>

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
