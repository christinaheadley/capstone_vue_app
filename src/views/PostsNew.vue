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
        <div v-for="tag in tags" :key="tag.id">
          <input type="checkbox" id="tag.name" name="tag" :value="tag.id" v-model="selectedTagIds" />
          <label for="tag.name">{{ tag.name }}</label>
        </div>
      </div>

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
      selectedTagIds: [],
      tag: {
        name: "",
      },
    };
  },
  created: function() {
    this.indexTags();
  },
  methods: {
    createPost: function() {
      let params = {
        title: this.title,
        body: this.body,
        image_url: this.imageUrl,
        tag_ids: this.selectedTagIds,
      };
      axios
        .post("/api/posts", params)
        .then(response => {
          this.$parent.flashMessage = "Post created!";
          this.$router.push("/");
          console.log(response.data);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },
    indexTags: function() {
      axios.get("/api/tags").then(response => {
        this.tags = response.data;
        console.log(this.tags);
      });
    },
  },
};
</script>
