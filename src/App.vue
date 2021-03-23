<template>
  <div id="app">
    <!-- ============================================================= HEADER ============================================================= -->

    <header>
      <div class="navbar">
        <div class="navbar-header">
          <div class="container">
            <!-- ============================================================= LOGO MOBILE ============================================================= -->

            <a class="navbar-brand" href="index.html">
              <img src="/assets/images/social_recoverwe_logo.png" class="logo" alt="" />
            </a>

            <!-- ============================================================= LOGO MOBILE : END ============================================================= -->

            <a
              class="navbar-toggler btn responsive-menu float-right"
              data-toggle="collapse"
              data-target=".navbar-collapse"
            >
              <i class="icon-menu-1"></i>
            </a>
          </div>
          <!-- /.container -->
        </div>
        <!-- /.navbar-header -->

        <div class="yamm">
          <div class="navbar-collapse collapse">
            <div class="container">
              <!-- ============================================================= LOGO ============================================================= -->

              <a class="navbar-brand" href="index.html">
                <img src="/assets/images/social_recoverwe_logo.png" class="logo" alt="" />
              </a>

              <!-- ============================================================= LOGO : END ============================================================= -->

              <!-- ============================================================= MAIN NAVIGATION ============================================================= -->

              <ul class="nav navbar-nav">
                <li class="dropdown">
                  <router-link to="/" class="dropdown-toggle" data-toggle="dropdown">Home</router-link>
                </li>
                <!-- /.dropdown -->

                <li>
                  <router-link to="/about">About</router-link>
                </li>
                <li>
                  <router-link to="/posts/new">Add Post</router-link>
                </li>
                <li v-if="!isLoggedIn()">
                  <router-link to="/signup">Signup</router-link>
                </li>

                <li v-if="!isLoggedIn()">
                  <router-link to="/login">Login</router-link>
                </li>
                <li v-if="isLoggedIn()">
                  <router-link :to="`/users/${getUserId()}`">Profile</router-link>
                </li>
                <li v-if="isLoggedIn()">
                  <router-link to="/logout">Logout</router-link>
                </li>

                <!-- /.dropdown -->
              </ul>
              <!-- /.nav -->

              <!-- ============================================================= MAIN NAVIGATION : END ============================================================= -->
            </div>
            <!-- /.container -->
          </div>
          <!-- /.navbar-collapse -->
        </div>
        <!-- /.yamm -->
      </div>
      <!-- /.navbar -->
    </header>

    <!-- ============================================================= HEADER : END ============================================================= -->

    <!-- ============================================================= MAIN ============================================================= -->

    <main>
      <div v-if="flashMessage">
        {{ flashMessage }}
        <button v-on:click="flashMessage = ''">Close</button>
      </div>
      <!-- Vue templates injected here -->
      <router-view :key="$route.fullPath" />
    </main>

    <!-- ============================================================= MAIN : END ============================================================= -->

    <!-- ============================================================= FOOTER ============================================================= -->

    <footer class="dark-bg">
      <div class="container inner">
        <div class="row">
          <div class="col-lg-6  col-md-6 inner">
            <h4>Our Mission</h4>
            <a href="index.html">
              <img class="logo img-intext" src="/assets/images/social_recoverwe_logo.png" alt="" />
            </a>
            <p>
              Social RecoverWe uses peer support to help people with pandemic-induced anxiety.
            </p>
            <a href="about.html" class="txt-btn">More about us</a>
          </div>
          <!-- /.col -->

          <div class="col-lg-6 col-md-6 inner">
            <h4>Get In Touch</h4>
            <p>
              Site owner: Christina Headley
            </p>
            <ul class="contacts">
              <li>
                <i class="icon-location contact"></i>
                Chapel Hill, NC
              </li>
              <li>
                <i class="icon-mobile contact"></i>
                (510) 712-9493
              </li>
              <li>
                <a href="#">
                  <i class="icon-mail-1 contact"></i>
                  chrstnaheadley@gmail.com
                </a>
              </li>
            </ul>
            <!-- /.contacts -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- .container -->

      <div class="footer-bottom">
        <div class="container inner clearfix">
          <p class="float-left">© 2019 REEN. All rights reserved.</p>
          <ul class="footer-menu float-right">
            <li><router-link to="/">Home</router-link></li>
            <li><a href="portfolio.html">Portfolio</a></li>
            <li><router-link to="/">All Posts</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link :to="`/users/${getUserId()}`">Account</router-link></li>
            <li><router-link to="/">Contact</router-link></li>
          </ul>
          <!-- .footer-menu -->
        </div>
        <!-- .container -->
      </div>
      <!-- .footer-bottom -->
    </footer>

    <!-- ============================================================= FOOTER : END ============================================================= -->
  </div>
</template>

<style></style>
<script>
import axios from "axios";
export default {
  data: function() {
    return {
      flashMessage: "",
      filter: "",
    };
  },
  methods: {
    isLoggedIn: function() {
      return localStorage.jwt ? true : false;
    },
    getUserId: function() {
      return localStorage.user_id;
    },
    createComment: function() {
      let params = {
        body: this.body,
        image_url: this.imageUrl,
        //  to create comment, need to figure this out so comment attaches to correct post
        // post_id: this.getCurrentPost(),
      };
      axios
        .post("/api/comments", this.getCurrentPost(), params)
        .then(response => {
          this.$parent.flashMessage = "Comment created!";
          this.$router("/");
          console.log(response.data);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },
  },
};
</script>
