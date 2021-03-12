/* eslint-disable vue/valid-v-for */ /* eslint-disable */
<!-- prettier-ignore-start -->
<template>
  <div class="home">
    <h4>View by Category:</h4>
    <!-- when add bootstrap, look at : https://www.w3schools.com/bootstrap/bootstrap_button_groups.asp -->
    <div class="checkbox">
      <div v-for="tag in tags" :key="tag.name">
        <label for="tag.name">{{ tag.name }}</label>
        <input type="checkbox" id="tag.name" name="tag" value="tag.name" />
      </div>
    </div>
    <!-- <div v-for="tag in tags" :key="tag.name">
      <input type="radio" id="tag.name" name="tag" value="tag.name" />
      <label for="tag.name">{{ tag.name }}</label>
    </div> -->
    <!-- <div v-for="post in filterBy(posts, tagFilter, 'tags')" v-bind:key="post.name"> -->
    <div v-for="post in posts.slice().reverse()" v-bind:key="post.id">
      <router-link :to="`/posts/${post.id}`">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
        <img v-bind:src="post.image_url" class="" alt="" />
      </router-link>
      <router-link :to="`/users/${post.user.id}`">
        <p>User: {{ post.user.user_name }}</p>
        <img v-bind:src="post.user.image_url" class="" alt="" />
      </router-link>
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
      tags: [],
      posts: [],
      tagFilter: "",
    };
  },

  created: function() {
    this.indexPosts();
    this.indexTags();
  },
  methods: {
    indexPosts: function() {
      axios.get("api/posts").then(response => {
        console.log(response.data);
        this.posts = response.data;
      });
    },
    indexTags: function() {
      axios.get("api/tags").then(response => {
        console.log(response.data);
        this.tags = response.data;
      });
    },
  },
};
</script>
<!-- prettier-ignore-end -->
<!-- https://stackoverflow.com/questions/55477354/how-to-filter-an-array-in-vue-js-with-multiple-select-buttons-->
