<template>
  <div class="posts-edit">
    <form v-on:submit.prevent="updatePost()">
      <h1>Edit Post:</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Title:</label>
        <input type="text" class="form-control" v-model="post.title" />
      </div>
      <div class="form-group">
        <label>Body:</label>
        <input type="text" class="form-control" v-model="post.body" />
      </div>
      <div class="form-group">
        <label>Image:</label>
        <input type="text" class="form-control" v-model="post.image_url" />
      </div>
      <div class="form-group">
        <div v-for="tag in tags" :key="tag.id">
          <input type="checkbox" id="tag.name" name="tag" :value="tag.id" v-model="selectedTagIds" />
          <label for="tag.name">{{ tag.name }}</label>
        </div>
        <span>Checked tag ids: {{ selectedTagIds }}</span>
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      post: {},
      errors: [],
      status: "",
      tags: [],
      selectedTagIds: [],
    };
  },
  created: function() {
    this.indexTags();
    axios.get(`/api/posts/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.post = response.data;
      this.selectedTagIds = this.post.tags.map(tag => tag.id);
      console.log(this.selectedTagIds);
    });
  },
  methods: {
    updatePost: function() {
      let params = {
        title: this.post.title,
        body: this.post.body,
        image_url: this.post.image_url,
        tag_ids: this.selectedTagIds,
      };
      axios
        .patch(`/api/posts/${this.post.id}`, params)
        .then(response => {
          console.log(response.data);
          this.$router.push(`/posts/${this.post.id}`);
          // this.$parent.flashMessage = "Post created!";
          //flash message and unshift not working
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },
    indexTags: function() {
      axios.get("/api/tags").then(response => (this.tags = response.data));
      console.log(this.tags);
    },
  },
};
</script>
