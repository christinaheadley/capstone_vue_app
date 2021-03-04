<template>
  <div class="home">
    <div v-for="post in posts" v-bind:key="post.id">
      <router-link to=/api/posts/3>
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
        <p>{{ post.image_url }}</p>
      </router-link>
      <p>User: {{ post.user_id }}</p>
      <!-- add router link to user info -->
      <p>Claps: {{ post.claps }}</p>
      <!-- add click to add clap +1 -->
      <router-view />
    <!-- </div>
     <div>
      <h2>{{ post.comment[0].title }}</h2>
      <p>{{ post.comment[0].body }}</p>
      <p>{{ post.comment[0].image_url }}</p>
      <p>User: {{ post.comment[0].user_id.user_name }} {{ post.comment.user_id.image_url }}</p> <router-view>add router link to user info<router-view /> -->
      <!-- <p>Claps: {{ post.comment[0].claps }}</p> -->
      <!-- add click to add clap +1 -->
      <!-- edit and delete buttons for comment owner -->
    </div> -->
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      posts: [],
      comment: {},
    };
  },
  created: function() {
    axios.get("api/posts").then(response => {
      console.log(response.data);
      this.posts = response.data;
    });
  },
  methods: {},
};
</script>
