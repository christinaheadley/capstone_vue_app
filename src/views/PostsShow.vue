<template>
  <div class="posts-show">
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
    <img v-bind:src="post.image_url" class="" alt="" />
    <!-- <router-view>add router link to user info<router-view /> -->
    <!-- user partial throws error on entire page -->
    <!-- {{ post.user.user_name }} -->
    {{ post.user_id }}
    <!-- add user image -->
    {{ post.tag }}
    <p v-for="tag in post.tags" v-bind:key="tag.id">
      {{ tag.name }}
    </p>
    <p>Claps: {{ post.claps }}</p>
    <!-- add click to add clap +1 -->
    <!-- edit and delete buttons for post owner -->
    <p v-if="post.comment">Comment: {{ post.comment.body }}</p>
    <h2>{{ post.comment.body }}</h2>
    <!-- <div>
      <p>{{ comment.body }}</p>
      <p>{{ comment.image_url }}</p>
      <p>User: {{ comment.user_id.user_name }} {{ comment.user_id.image_url }}</p>
     <router-view>add router link to user info<router-view />
      <p>Claps: {{ comment.claps }}</p>
    </div> -->
    <!-- add click to add clap +1 -->
    <!-- edit and delete buttons for comment owner -->
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      post: {},
    };
  },
  created: function() {
    axios.get(`/api/posts/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.post = response.data;
    });
  },
  methods: {},
};
</script>
