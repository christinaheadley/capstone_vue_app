<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<!-- <div class="home"> -->
<!-- <div v-for="post in filterBy(posts, tagFilter, 'tags')" v-bind:key="post.name"> -->
<!-- <div v-for="post in posts" v-bind:key="post.id">
      <router-link :to="`/posts/${post.id}`">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
        <img v-bind:src="post.image_url" class="" alt="" />
      </router-link>
      <p>User: {{ post.user_id }}</p> -->
<!-- find a way to show user.user_name and image -->
<!-- add router link to user info -->
<!-- add click to add clap +1 -->
<!-- <p>Claps: {{ post.claps }}</p> -->
<!-- make a loop to get tag names only -->
<!-- <div v-for="tag in tags" v-bind:key="tag.id"> -->
<!-- <p>Tags: {{ post.tag.name }}</p>
      </div>
      <router-view /> -->
<!-- </div> -->
<!-- <div v-for="tag in tags" v-bind:key="tag.name">
      <p>{{ tag.name }}</p> -->
<!-- </div> -->
<!-- </div> -->
<!-- <div v-for="post.tag in filterBy(post.tags, filter)" v-bind:key="post.tag.id"></div> -->

<!-- <button v:on-click="tagFilter" v-bind:key="post.id">{{ post.tag.name }}</button> -->
<!-- </div> -->
<!-- <div>
      <h2>{{ post.comment[0].title }}</h2>
      <p>{{ post.comment[0].body }}</p>
      <p>{{ post.comment[0].image_url }}</p>
      <p>User: {{ post.comment[0].user_id.user_name }} {{ post.comment.user_id.image_url }}</p> <router-view>add router link to user info<router-view /> -->
<!-- <p>Claps: {{ post.comment[0].claps }}</p> -->
<!-- add click to add clap +1 (need to create BE for this)-->
<!-- edit and delete buttons for comment owner </div> -->

<!-- <script>
// import axios from "axios";
// import Vue2Filters from "vue2-filters";
// export default {
//   mixins: [Vue2Filters.mixin],
//   data: function() {
//     return {
//       post: {
//         tag: {
//           name: "",
//         },
//       }, 
// comment: {},

// tagFilter: "corona",
//   };
// },
//   created: function() {
//     this.indexTags();
//     this.indexPosts();
//   },
//   methods: {
//     indexPosts: function() {
//       axios.get("api/posts").then(response => {
//         console.log(response.data);
//         this.posts = response.data;
//       });
//     },

//     indexTags: function() {
//       axios.get("api/tags").then(response => {
//         console.log(response.data);
//         this.tags = response.data;
//       });
//     },
//   },
// };
//
</script>
-->
