<template>
  <div class="posts-new">
    <p v-if="!$parent.isLoggedIn()">Please log in!</p>
    <form v-on:submit.prevent="createPost()">
      <h1>New Post:</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Title:</label>
        <input type="text" class="form-control" v-model="title" />
      </div>
      <div class="form-group">
        <label>Body:</label>
        <input type="text" class="form-control" v-model="body" />
      </div>
      <div class="form-group">
        <label>Image:</label>
        <input type="text" class="form-control" v-model="image_url" />
      </div>
      <!-- need to add category buttons to select tags for new Post -->
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      title: "",
      body: "",
      image_url: "",
      errors: [],
      status: "",
    };
  },
  created: function() {
    this.indexTags();
  },
  methods: {
    createPost: function() {
      var params = {
        title: this.title,
        body: this.body,
        image_url: this.image_url,
      };
      axios
        .post("/api/posts", params)
        .then(response => {
          console.log(response.data);
          // this.$parent.flashMessage = "Post created!";
          this.$router.push("/home");
          //flash message and unshift not working
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },
  },
};
</script>
