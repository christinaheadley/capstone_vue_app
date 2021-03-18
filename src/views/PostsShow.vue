<template>
  <div class="posts-show">
    <img src="../../src/assets/images/Social_RecoverWe_logo.png" />
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
    <img v-bind:src="post.image_url" class="" alt="" />
    Tags:{{ post.tag }}
    <p v-for="tag in post.tags" v-bind:key="tag.id">
      {{ tag.name }}
    </p>
    <p>Claps: {{ post.claps }}</p>
    <div v-if="post.user_id == $parent.getUserId()">
      <router-link :to="`/posts/${post.id}/edit`">
        <button>Edit Post</button>
      </router-link>
      <button v-on:click="destroyPost()">Delete</button>
    </div>
    <button v-on:click="addClap()">Clap</button>
    <div>
      <router-link :to="`/users/${post.user.id}`">
        <p>User: {{ post.user.user_name }}</p>
        <img v-bind:src="post.user.image_url" class="" alt="" />
      </router-link>
    </div>
    <div v-for="comment in post.comments" v-bind:key="comment.id">
      Comment: {{ comment.body }} Commenter: {{ comment.user.user_name }} Commenter pic:
      <img v-bind:src="comment.user.image_url" class="" alt="" />
    </div>
    <button>Add Comment</button>
    <p v-if="!$parent.isLoggedIn()">Please log in!</p>
    <form v-on:submit.prevent="createComment()">
      <p>New Comment:</p>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Text:</label>
        <input type="text" class="form-control" v-model="body" />
      </div>
      <div class="form-group">
        <label>Image:</label>
        <input type="text" class="form-control" v-model="imageUrl" />
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
      post: {
        user: {
          user_name: "",
        },
      },
      body: "",
      imageUrl: "",
      errors: [],
    };
  },
  created: function() {
    axios
      .get(`/api/posts/${this.$route.params.id}`)
      .then(response => {
        this.post = response.data;
        console.log(response.data);
      })
      .catch(error => {
        this.errors = error.response.data.errors;
        this.status = error.response.status;
      });
  },
  methods: {
    createComment: function() {
      let params = {
        body: this.body,
        image_url: this.imageUrl,
        post_id: this.post.id,
      };
      axios
        .post("/api/comments", params)
        .then(response => {
          console.log(response.data);
          this.$parent.flashMessage = "Comment created!";
          this.post.comments.push(response.data);
          console.log(this.post.comments);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },
    addClap: function() {
      let params = {
        id: this.post.id,
      };
      axios.post(`/api/posts/${this.post.id}/clap`, params).then(response => {
        console.log(this.post);
        console.log(response.data);
        this.post.claps += 1;
        this.$parent.flashMessage = "Clap added!";
      });
    },
    destroyPost: function() {
      if (confirm("Do you want to delete this post?")) {
        axios.delete(`api/posts/${this.post.id}`).then(response => {
          console.log(response.data);
          this.$router.push("/");
        });
      }
    },
  },
};
</script>
