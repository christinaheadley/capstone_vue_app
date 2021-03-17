<template>
  <div class="home">
    <!-- when add bootstrap, look at : https://www.w3schools.com/bootstrap/bootstrap_button_groups.asp -->
    <div class="checkbox">
      <div v-for="tag in tags" :key="tag.name">
        <input type="checkbox" id="tag.name" name="tag" value="tag.name" />
        <label for="tag.name">{{ tag.name }}</label>
      </div>
    </div>
    <!-- <div> -->
    <!-- <button v-on:click="setSortAttribute(created_at)">Sort by date</button> -->
    <!-- <button v-on:click="sortAttribute = created_at">Sort by date</button> -->
    <!-- <button v-on:click="setSortAttribute(post.claps)">Sort by popularity</button> -->
    <!-- </div> -->
    <!-- <div v-for="post in orderBy(posts, sortAttibute)" v-bind:key="post.id"> -->
    <div v-for="post in orderBy(posts, 'created_at', -1)" v-bind:key="post.id">
      <router-link :to="`/posts/${post.id}`">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
        <img v-bind:src="post.image_url" class="" alt="" />
      </router-link>
      Claps: {{ post.claps.length }}
      <!-- <form v-on:submit.prevent="upvotePost()">
      </form> -->
      <div class="form-group">
        <input type="submit" id="clap.id" value="Add Clap" v-bind="upvotePost()" />
      </div>
      <div v-if="post.user_id == $parent.getUserId()">
        <router-link :to="`/posts/${post.id}/edit`">
          <button>Edit Post</button>
        </router-link>
        <button v-on:click="destroyPost()">Delete</button>
      </div>
      <router-link :to="`/users/${post.user.id}`">
        <p>User: {{ post.user.user_name }}</p>
        <img v-bind:src="post.user.image_url" class="" alt="" />
      </router-link>
      <!-- add click to add clap +1 -->

      <div v-if="post.tags">
        <div v-for="tag in post.tags" v-bind:key="tag.id">
          {{ tag.name }}
        </div>
      </div>
      <button>Add Comment</button>
      <div v-if="post.comment">
        Comment: {{ post.comment.body }}
        <p v-if="post.comment.user">name:{{ post.comment.user.user_name }} pic: {{ post.comment.user.image_url }}</p>
      </div>

      <router-view />
    </div>
  </div>

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
      post: {
        claps: [],
      },
      tags: [],
      posts: [],
      sortAttribute: "created_at",
    };
  },

  created: function() {
    this.indexPosts();
    this.indexTags();
    // this.upvotePost();
  },
  methods: {
    indexPosts: function() {
      axios.get("api/posts").then(response => {
        console.log(response.data);
        this.posts = response.data;
        // .then(response => {
        //   this.posts = response.data.items ? response.data.items : [];
      });
    },
    indexTags: function() {
      axios.get("api/tags").then(response => {
        console.log(response.data);
        this.tags = response.data;
      });
    },
    setSortAttribute: function(attribute) {
      this.sortAttribute = attribute;
    },
    upvotePost: function() {
      let params = {
        user_id: this.$parent.getUserId(),
        post_id: this.postId,
      };
      axios.post("/api/claps", params).then(response => {
        this.claps = response.data;
        console.log(this.claps);
      });
    },
  },
};
</script>

<!-- https://stackoverflow.com/questions/55477354/how-to-filter-an-array-in-vue-js-with-multiple-select-buttons-->
