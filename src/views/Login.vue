<template>
  <div class="login">
    <!-- ============================================================= SECTION – WORK SAMPLES ============================================================= -->

    <section id="work-samples" class="dark-bg">
      <div class="container inner-md">
        <div class="row gray">
          <div class="col-lg-6 inner-right-xs inner-bottom-xs">
            <form v-on:submit.prevent="submit()">
              <h1 class="gray">Login</h1>
              <ul>
                <li class="text-danger" v-for="error in errors" v-bind:key="error">
                  {{ error }}
                </li>
              </ul>
              <div class="form-group">
                <label>Email:</label>
                <input type="email" class="form-control" v-model="email" />
              </div>
              <div class="form-group">
                <label>Password:</label>
                <input type="password" class="form-control" v-model="password" />
              </div>
              <input type="submit" class="btn btn-gray btn-primary" value="Submit" />
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

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$parent.flashMessage = "Login Successful";
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
