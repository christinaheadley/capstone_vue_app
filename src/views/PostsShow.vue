<template>
  <div class="posts-show">
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
    <img v-bind:src="post.image_url" class="" alt="" />
    Tags:{{ post.tag }}
    <p v-for="tag in post.tags" v-bind:key="tag.id">
      {{ tag.name }}
    </p>
    <div v-if="post.user_id == $parent.getUserId()">
      <router-link :to="`/posts/${post.id}/edit`">
        <button>Edit Post</button>
      </router-link>
      <button v-on:click="destroyPost()">Delete</button>
    </div>
    <p>Claps: {{ post.claps }}</p>
    <!-- add click to add clap +1 -->
    <!-- edit and delete buttons for post owner -->
    <div>
      <router-link :to="`/users/${post.user.id}`">
        <p>User: {{ post.user.user_name }}</p>
        <img v-bind:src="post.user.image_url" class="" alt="" />
      </router-link>
      <!-- START HERE -->
    </div>
    <p v-if="post.comment">Comment: {{ post.comment.body }}</p>
    <!-- <p>{{ comment.image_url }}</p>
      <p>User: {{ comment.user_id.user_name }} {{ comment.user_id.image_url }}</p> -->
    <!-- <router-view>add router link to user info<router-view /> -->
    <!-- edit and delete buttons for comment owner -->
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
    destroyPost: function() {
      if (confirm("Do you want to delete this post?")) {
        axios.delete(`api/posts/${this.post.id}`).then(response => {
          console.log(response.data);
          this.$router.push("/posts");
        });
      }
    },
  },
};
</script>
