/* eslint-disable vue/valid-v-for */ /* eslint-disable */
<!-- prettier-ignore-start -->
<template>
  <div class="home">
    <div>
      <button type="button" v-for="tag in tags" v-bind:key="tag.id">{{ tag.name }}"</button>
    </div>
    <!-- <div v-for="post in filterBy(posts, tagFilter, 'tags')" v-bind:key="post.name"> -->
    <div v-for="post in posts" v-bind:key="post.id">
      <router-link :to="`/posts/${post.id}`">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
        <img v-bind:src="post.image_url" class="" alt="" />
      </router-link>
      <p>User: {{ post.user_id }}</p>
      <!-- find a way to show user.user_name and image -->
      <!-- add router link to user info -->
      <!-- add click to add clap +1 -->
      <p>Claps: {{ post.claps }}</p>
      <!-- <p>Tags: {{ post.tags }}</p> -->
    </div>
    <!-- <div v-for="tag in post.tags" v-bind:key="tag.id">
      <p>{{ post.tag.name }}</p> -->

    <router-view />
    <!-- </div> -->
    <!-- </div> -->
    <!-- <div v-for="post.tag in filterBy(post.tags, filter)" v-bind:key="post.tag.id"></div> -->

    <!-- <button v:on-click="tagFilter" v-bind:key="post.id">{{ post.tag.name }}</button> -->
  </div>
  <!-- <div>
      <h2>{{ post.comment[0].title }}</h2>
      <p>{{ post.comment[0].body }}</p>
      <p>{{ post.comment[0].image_url }}</p>
      <p>User: {{ post.comment[0].user_id.user_name }} {{ post.comment.user_id.image_url }}</p> <router-view>add router link to user info<router-view /> -->
  <!-- <p>Claps: {{ post.comment[0].claps }}</p> -->
  <!-- add click to add clap +1 (need to create BE for this)-->
  <!-- edit and delete buttons for comment owner </div> -->
</template>

<style></style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      posts: [],
      comment: {},
      // post: {
      tags: {
        //     name: "",
      },
      // },
      // user: {
      //   name: [],
      // },
      // post_tags: [],

      // tagFilter: "corona",
    };
  },
  created: function() {
    this.indexPosts();
  },
  methods: {
    indexPosts: function() {
      axios.get("api/posts").then(response => {
        console.log(response.data);
        this.posts = response.data;
      });
    },
  },
};
</script>
<!-- prettier-ignore-end -->
