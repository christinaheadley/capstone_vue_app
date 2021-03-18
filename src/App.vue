<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
      |
      <router-link to="/posts/new">Add Post</router-link>
      <!-- |
      <router-link to="/posts/:id/edit">Edit Post</router-link> -->
      |
      <router-link v-if="!isLoggedIn()" to="/signup">Signup</router-link>
      |
      <router-link v-if="!isLoggedIn()" to="/login">Login</router-link>
      |
      <router-link v-if="isLoggedIn()" to="/logout">Logout</router-link>
      |
      <router-link v-if="isLoggedIn()" :to="`/users/${getUserId()}`">Profile</router-link>
    </div>
    <div v-if="flashMessage">
      {{ flashMessage }}
      <button v-on:click="flashMessage = ''">Close</button>
    </div>
    <router-view :key="$route.fullPath" />
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
    // destroyPost: function() {
    //   if (confirm("Do you want to delete this post?")) {
    //     axios.delete(`api/posts/${this.post.id}`).then(response => {
    //       console.log(response.data);
    //       this.$router.push("/");
    //     });
    //   }
    // },
  },
};
</script>
