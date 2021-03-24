<template>
  <div class="signup">
    <!-- ============================================================= SECTION – WORK SAMPLES ============================================================= -->

    <section id="work-samples" class="dark-bg">
      <div class="container inner-md">
        <div class="row gray">
          <div class="col-lg-6 inner-right-xs inner-bottom-xs">
            <form v-on:submit.prevent="submit()">
              <h1 class="gray">Signup</h1>
              <ul>
                <li class="text-danger" v-for="error in errors" v-bind:key="error">
                  {{ error }}
                </li>
              </ul>
              <div class="form-group">
                <label>Name:</label>
                <input type="text" class="form-control" v-model="userName" />
              </div>
              <div class="form-group">
                <label>Email:</label>
                <input type="email" class="form-control" v-model="email" />
              </div>
              <div class="form-group">
                <label>Password:</label>
                <input type="password" class="form-control" v-model="password" />
              </div>
              <div class="form-group">
                <label>Password confirmation:</label>
                <input type="password" class="form-control" v-model="passwordConfirmation" />
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
      userName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
    };
  },
  methods: {
    submit: function() {
      var params = {
        user_name: this.userName,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      axios
        .post("/api/users", params)
        .then(response => {
          console.log(response.data);
          this.$parent.flashMessage = "Signup Successful";
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
