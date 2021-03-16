<template>
  <div class="home">
    <!-- when add bootstrap, look at : https://www.w3schools.com/bootstrap/bootstrap_button_groups.asp -->
    <div class="checkbox">
      <div v-for="tag in tags" :key="tag.name">
        <input type="checkbox" id="tag.name" name="tag" value="tag.name" />
        <label for="tag.name">{{ tag.name }}</label>
      </div>
    </div>
    <!-- buttons not working:
    <button v-on:click="sortAttribute = 'posts'"><h4>Most Recent:</h4></button>
    <button v-on:click="sortAttribute = 'claps'"><h4>Most Popular:</h4></button>
    <button v-on:click="sortAttribute = 'user_id'"><h4>Most Popular:</h4></button>
    <div v-for="post in posts.slice().reverse()" v-bind:key="post.id"> -->
    <div v-for="post in orderBy(filterBy(posts.slice().reverse(), postFilter), sortAttribute)" v-bind:key="post.id">
      <router-link :to="`/posts/${post.id}`">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
        <img v-bind:src="post.image_url" class="" alt="" />
        <div v-if="post.user_id == $parent.getUserId()">
          <router-link :to="`/posts/${post.id}/edit`">
            <button>Edit Post</button>
          </router-link>
          <button v-on:click="destroyPost()">Delete</button>
        </div>
      </router-link>
      <router-link :to="`/users/${post.user.id}`">
        <p>User: {{ post.user.user_name }}</p>
        <img v-bind:src="post.user.image_url" class="" alt="" />
      </router-link>
      <!-- add click to add clap +1 -->
      <p>Claps: {{ post.claps }}</p>

      <div v-if="post.tags">
        <div v-for="tag in post.tags" v-bind:key="tag.id">
          {{ tag.name }}
        </div>
      </div>
      <button>Add Comment</button>
      <template v-if="post.comment">
        Comment: {{ post.comment.body }}

        pic:{{ post.comment.user }} name: {{ post.comment.user }}
      </template>
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
      post: {},
      tags: [],
      posts: [],
      tagFilter: "",
      postFilter: "",
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

<!-- https://stackoverflow.com/questions/55477354/how-to-filter-an-array-in-vue-js-with-multiple-select-buttons-->
