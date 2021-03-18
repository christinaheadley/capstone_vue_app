<template>
  <div class="home">
    <img src="../../src/assets/images/Social_RecoverWe_logo.png" />
    <!-- when add bootstrap, look at : https://www.w3schools.com/bootstrap/bootstrap_button_groups.asp -->
    <div class="checkbox">
      <div v-for="tag in tags" v-bind="tag.name" :key="tag.name">
        <input type="checkbox" id="tag.name" name="tag" value="tag.name" />
        <label for="tag.name">{{ tag.name }}</label>
      </div>
    </div>
    <div>
      <button
        v-on:click="
          sortAttribute = 'created_at';
          sortOrder = -1;
        "
      >
        Sort by date
      </button>
      <button
        v-on:click="
          sortAttribute = 'claps';
          sortOrder = -1;
        "
      >
        Sort by popularity
      </button>
    </div>
    <div v-for="post in orderBy(filterBy(posts, filter), sortAttribute, sortOrder)" v-bind:key="post.id">
      <!-- <div v-for="post in orderBy(posts, sortAttribute, sortOrder)" v-bind:key="post.id"> -->
      <router-link :to="`/posts/${post.id}`">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
        <img v-bind:src="post.image_url" class="" alt="" />
      </router-link>
      Claps: {{ post.claps }}
      <button v-on:click="addClap()">Clap</button>
      <div v-if="post.user_id == $parent.getUserId()">
        <router-link :to="`/posts/${post.id}/edit`">
          <button>Edit Post</button>
        </router-link>
        <button v-on:click="$parent.destroyPost()">Delete</button>
      </div>
      <router-link :to="`/users/${post.user.id}`">
        <p>User: {{ post.user.user_name }}</p>
        <img v-bind:src="post.user.image_url" class="" alt="" />
      </router-link>
      <div v-if="post.tags">
        <div v-for="tag in post.tags" v-bind:key="tag.id">
          {{ tag.name }}
        </div>
      </div>
      <div v-if="post.comment">
        Comment: {{ post.comment.body }}
        <p v-if="post.comment.user">
          name:{{ post.comment.user.user_name }} pic:
          <img v-bind:src="post.comment.user.image_url" class="" alt="" />
        </p>
      </div>
      <div v-for="comment in post.comments" v-bind:key="comment.id">
        Comment: {{ comment.body }} Commenter: {{ comment.user.user_name }} Commenter pic:
        <img v-bind:src="comment.user.image_url" class="" alt="" />
      </div>
      <button>Add Comment</button>
      <p v-if="!$parent.isLoggedIn()">Please log in!</p>
      <form v-on:submit.prevent="$parent.createComment()">
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
        <router-view />
      </form>
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
      sortOrder: -1,
      checked: "",
      body: "",
      imageUrl: "",
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
    setSortAttribute: function(attribute) {
      this.sortAttribute = attribute;
    },
    // getCurrentPost: function() {
    //   return this.post.id;
    // },
    addClap: function() {
      axios.post(`/api/posts/${this.post.id}/clap`).then(response => {
        console.log(response.data);
        this.$parent.flashMessage = "Clap added!";
        this.$router("`/api/posts/${this.post.id}`");
      });
    },
  },
};
</script>

<!-- https://stackoverflow.com/questions/55477354/how-to-filter-an-array-in-vue-js-with-multiple-select-buttons-->
