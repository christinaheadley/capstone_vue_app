/* eslint-disable vue/valid-v-for */ /* eslint-disable */
<!-- prettier-ignore-start -->
<template>
  <div class="home">
    <!-- <div>
      <button type="button" v-for="tag in tags" v-bind:key="tag.id">{{ tag.name }}"</button>
    </div> -->
    <!-- <div v-for="post in filterBy(posts, tagFilter, 'tags')" v-bind:key="post.name"> -->
    <!-- <button v:on-click="tagFilter" v-bind:key="post.id">{{ post.tag.name }}</button> -->
    <ul>
      <li>{{ tagNames() }}</li>
      <!-- <li v-for="tag in tags" :key="tag.name">
        {{ tag.name }}
      </li> -->
    </ul>
    <div v-for="post in posts" v-bind:key="post.id">
      <router-link :to="`/posts/${post.id}`">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
        <img v-bind:src="post.image_url" class="" alt="" />
      </router-link>
      <!-- <router-link :to="`/users/${id}`"> -->
      <p>User: {{ post.user.user_name }}</p>
      <img v-bind:src="post.user.image_url.url" class="" alt="" />
      <!-- </router-link> -->
      <!-- find a way to show user.user_name and image -->
      <!-- add router link to user info -->
      <!-- add click to add clap +1 -->
      <p>Claps: {{ post.claps }}</p>

      <p v-if="post.comment">Comment: {{ post.comment.body }}</p>
      <div v-if="post.tags">
        <div v-for="tag in post.tags" v-bind:key="tag.id">
          {{ tag.name }}
        </div>
      </div>
    </div>

    <router-view />
    <!-- </div> -->
    <!-- <div v-for="post.tag in filterBy(post.tags, filter)" v-bind:key="post.tag.id"></div> -->
  </div>

  <!-- add click to add clap +1 (need to create BE for this)-->
  <!-- edit and delete buttons for comment owner </div> -->
</template>

<style></style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
// import func from "vue-editor-bridge";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      // tags: [{ name: "` this.tagName `" }],
      post: {},
      tags: [
        { name: "pandemic" },
        { name: "isolation" },
        { name: "advice" },
        { name: "vaccine" },
        { name: "safety" },
        { name: "work" },
        { name: "family" },
        { name: "anxiety" },
        { name: "covid" },
      ],
      posts: [],
    };
  },

  created: function() {
    this.indexPosts();
    this.tagNames();
    // this.commentBody();
  },
  methods: {
    indexPosts: function() {
      axios.get("api/posts").then(response => {
        console.log(response.data);
        this.posts = response.data;
      });
    },
    tagNames: function() {
      this.tags.forEach(function(tag) {
        console.log(tag.name);
      });
    },

    // commentBody: function() {
    //   if (this.post.comment.body == false) {
    //     console.log(" ");
    //   } else {
    //     console.log("this.post.comment.body");
    //   }
    // },
  },
};
</script>
<!-- prettier-ignore-end -->
