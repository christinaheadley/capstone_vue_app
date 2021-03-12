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
        <input type="text" class="form-control" v-model="imageUrl" />
      </div>
      <div class="form-group">
        <div v-for="tag in tags" :key="tag.name">
          <label for="tag.name">{{ tag.name }}</label>
          <input type="checkbox" id="tag.name" name="tag" value="tag.name" />
        </div>
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
      imageUrl: "",
      errors: [],
      status: "",
      tags: [],
      tag: {
        name: "",
      },
    };
  },
  created: function() {
    this.tagNames();
  },
  methods: {
    createPost: function() {
      let params = {
        title: this.title,
        body: this.body,
        image_url: this.imageUrl,
        tag: this.tag,
      };
      axios
        .post("/api/posts", params)
        .then(response => {
          this.$router.push("/home");
          console.log(response.data);
          // this.$parent.flashMessage = "Post created!";
          //flash message and unshift not working
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },
    tagNames: function() {
      this.tags.forEach(function(tag) {
        console.log(tag.name);
      });

      // createPostTag: function() {
      //   this.
      // },
    },
  },
};
</script>
