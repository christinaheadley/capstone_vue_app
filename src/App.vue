<template>
  <div id="app">
    <!-- ============================================================= HEADER ============================================================= -->

    <header>
      <div class="navbar">
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
                <li>
                  <router-link to="/">Home</router-link>
                </li>
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
          <div class="col-lg-3 col-md-6 inner">
            <h4>Who we are</h4>
            <a href="index.html"><img class="logo img-intext" src="assets/images/logo-white.svg" alt="" /></a>
            <p>
              Magnis modipsae voloratati andigen daepeditem quiate re porem que aut labor. Laceaque eictemperum quiae
              sitiorem rest non restibusaes maio es dem tumquam.
            </p>
            <a href="about.html" class="txt-btn">More about us</a>
          </div>
          <!-- /.col -->

          <div class="col-lg-3 col-md-6 inner">
            <h4>Latest works</h4>

            <div class="row thumbs gap-xs">
              <div class="col-6 thumb">
                <figure class="icon-overlay icn-link">
                  <a href="portfolio-post.html"><img src="assets/images/art/work02.jpg" alt="" /></a>
                </figure>
              </div>
              <!-- /.thumb -->

              <div class="col-6 thumb">
                <figure class="icon-overlay icn-link">
                  <a href="portfolio-post.html"><img src="assets/images/art/work03.jpg" alt="" /></a>
                </figure>
              </div>
              <!-- /.thumb -->

              <div class="col-6 thumb">
                <figure class="icon-overlay icn-link">
                  <a href="portfolio-post.html"><img src="assets/images/art/work07.jpg" alt="" /></a>
                </figure>
              </div>
              <!-- /.thumb -->

              <div class="col-6 thumb">
                <figure class="icon-overlay icn-link">
                  <a href="portfolio-post.html"><img src="assets/images/art/work01.jpg" alt="" /></a>
                </figure>
              </div>
              <!-- /.thumb -->
            </div>
            <!-- /.row -->
          </div>
          <!-- /.col -->

          <div class="col-lg-3 col-md-6 inner">
            <h4>Get In Touch</h4>
            <p>
              Doloreiur quia commolu ptatemp dolupta oreprerum tibusam eumenis et consent accullignis dentibea autem
              inisita.
            </p>
            <ul class="contacts">
              <li>
                <i class="icon-location contact"></i>
                84 Street, City, State 24813
              </li>
              <li>
                <i class="icon-mobile contact"></i>
                +00 (123) 456 78 90
              </li>
              <li>
                <a href="#">
                  <i class="icon-mail-1 contact"></i>
                  info@reen.com
                </a>
              </li>
            </ul>
            <!-- /.contacts -->
          </div>
          <!-- /.col -->

          <div class="col-lg-3 col-md-6 inner">
            <h4>Free updates</h4>
            <p>Conecus iure posae volor remped modis aut lor volor accabora incim resto explabo.</p>
            <form id="newsletter" class="form-inline newsletter" role="form">
              <label class="sr-only" for="exampleInputEmail">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail" placeholder="Enter your email address" />
              <button type="submit" class="btn btn-submit">Subscribe</button>
            </form>
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
            <li><a href="index.html">Home</a></li>
            <li><a href="portfolio.html">Portfolio</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="contact.html">Contact</a></li>
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
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
