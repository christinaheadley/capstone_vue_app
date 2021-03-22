<template>
  <div class="home">
    <!-- when add bootstrap, look at : https://www.w3schools.com/bootstrap/bootstrap_button_groups.asp -->
    <!-- ============================================================= SECTION – BUTTONS ============================================================= -->

    <section id="buttons">
      <div class="container">
        <div class="row">
          <div class="col-lg-10 mx-auto text-center">
            <div class="btn-wrapper">
              <button
                class="btn btn-large btn-green"
                v-on:click="
                  sortAttribute = 'created_at';
                  sortOrder = -1;
                "
              >
                Sort by date
              </button>
              <button
                class="btn btn-large btn-green"
                v-on:click="
                  sortAttribute = 'claps';
                  sortOrder = -1;
                "
              >
                Sort by popularity
              </button>
            </div>
          </div>
          <!-- ./col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container -->
    </section>

    <!-- ============================================================= SECTION – BUTTONS : END ============================================================= -->

    <!-- ============================================================= SECTION – BLOG POST ============================================================= -->

    <section id="blog-post" class="light-bg">
      <div class="container inner-top-sm inner-bottom classic-blog">
        <div class="row inner-bottom-xs">
          <div class="col-md-12">
            <ul class="format-filter text-center">
              <li>
                <a class="active" href="#" data-filter="*" title="All" data-rel="tooltip" data-placement="top">
                  <i class="icon-th"></i>
                </a>
              </li>
              <li>
                <a href="#" data-filter=".format-standard" title="Standard" data-rel="tooltip" data-placement="top">
                  <i class="icon-edit"></i>
                </a>
              </li>
              <li>
                <a href="#" data-filter=".format-image" title="Image" data-rel="tooltip" data-placement="top">
                  <i class="icon-picture-1"></i>
                </a>
              </li>
              <li>
                <a href="#" data-filter=".format-gallery" title="Gallery" data-rel="tooltip" data-placement="top">
                  <i class="icon-picture"></i>
                </a>
              </li>
              <li>
                <a href="#" data-filter=".format-video" title="Video" data-rel="tooltip" data-placement="top">
                  <i class="icon-video-1"></i>
                </a>
              </li>
              <li>
                <a href="#" data-filter=".format-audio" title="Audio" data-rel="tooltip" data-placement="top">
                  <i class="icon-music-1"></i>
                </a>
              </li>
              <li>
                <a href="#" data-filter=".format-quote" title="Quote" data-rel="tooltip" data-placement="top">
                  <i class="icon-quote"></i>
                </a>
              </li>
              <li>
                <a href="#" data-filter=".format-link" title="Link" data-rel="tooltip" data-placement="top">
                  <i class="icon-popup"></i>
                </a>
              </li>
            </ul>
            <!-- /.format-filter -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->

        <div
          v-for="post in orderBy(filterBy(posts, filter), sortAttribute, sortOrder)"
          v-bind:key="post.id"
          class="container inner-top-sm inner-bottom classic-blog"
        >
          <div class="row">
            <div class="col-lg-9 inner-right-sm inner-left-sm">
              <div class="posts sidemeta">
                <div class="post format-gallery">
                  <div class="date-wrapper">
                    <div class="date">
                      <span class="month">{{ dayOfTheWeek(post.created_at) }}</span>
                      <span class="day">{{ formattedDay(post.created_at) }}</span>
                      <span class="month">{{ formattedMonth(post.created_at) }}</span>
                    </div>
                    <!-- /.date -->
                  </div>
                  <!-- /.date-wrapper -->

                  <div class="post-content">
                    <figure class="icon-overlay icn-link post-media"></figure>
                    <!-- /.post-media -->

                    <router-link :to="`/posts/${post.id}`">
                      <h2 class="post-title inner-left">{{ post.title }}</h2>
                      <h3 data-rel="tooltip" data-placement="" class="author"></h3>
                    </router-link>
                    <router-link :to="`/users/${post.user.id}`">
                      <h4 class="inner-left">
                        by
                        {{ post.user.user_name }}
                      </h4>
                    </router-link>

                    <h4>
                      {{ relativeDate(post.created_at) }}
                    </h4>
                    <ul class="meta">
                      <li class="categories">
                        <a href="#" v-for="tag in post.tags" v-bind:key="tag.id">| {{ tag.name }} |</a>
                      </li>
                      <li v-on:click="addClap()" class="likes">
                        <a href="#">{{ post.claps }}</a>
                      </li>
                      <li class="comments" v-if="post.comment">
                        <a href="#">{{ post.comment.id }}</a>
                      </li>
                      <li class="comments" v-else><a href="#">0</a></li>
                    </ul>
                    <figure>
                      <img v-bind:src="post.image_url" class="" alt="" />
                    </figure>

                    <!-- /.meta -->

                    <p>
                      {{ post.body }}
                    </p>
                  </div>
                  <!-- /.post-content -->
                </div>
                <!-- /.post -->

                <div class="post-author">
                  <figure>
                    <div class="author-image icon-overlay icn-link">
                      <router-link :to="`/users/${post.user.id}`">
                        <img v-bind:src="post.user.image_url" class="" alt="" />
                      </router-link>
                    </div>

                    <figcaption class="author-details">
                      <h3>{{ post.user.user_name }}</h3>
                      <router-link :to="`/users/${post.user.id}`">
                        <p>
                          {{ post.user.bio }}
                        </p>
                      </router-link>
                      <ul class="meta">
                        <li class="author-posts">
                          <a href="#">All posts by {{ post.user.user_name }}</a>
                        </li>
                      </ul>
                      <!-- /.meta -->
                    </figcaption>
                  </figure>
                </div>
                <!-- /.post-author -->

                <div id="comments" v-if="gif.small_gif">
                  <h2>Top Gifs</h2>
                  <ol class="commentlist">
                    <li class="comment" v-for="gif in gifs" v-bind:key="gif.small_gif">
                      <div class="avatar icon-overlay icn-link" img v-bind:src="gif.small_gif" alt=""></div>
                    </li>
                  </ol>
                </div>

                <div id="comments" v-if="post.comment">
                  <h2>Top Comment</h2>
                  <ol class="commentlist">
                    <li class="comment">
                      <div
                        class="avatar icon-overlay icn-link"
                        img
                        v-bind:src="post.comment.user.image_url"
                        alt=""
                      ></div>
                      <!-- /.avatar -->

                      <div class="commentbody">
                        <p>
                          {{ post.comment.body }}
                        </p>
                        <div class="author">
                          <h4>by {{ post.comment.user.user_name }}</h4>
                          <div class="meta">
                            <span class="date">{{ relativeDate(post.comment.created_at) }}</span>
                          </div>
                          <!-- /.meta -->
                        </div>
                        <!-- /.author -->

                        <!-- /.message -->
                      </div>
                      <!-- /.commentbody -->
                    </li>
                    <!-- /.comment -->
                  </ol>
                  <!-- /.commentlist -->
                </div>
                <!-- /#comments -->

                <div class="comment-form-wrapper">
                  <h2>Leave a Comment</h2>

                  <form id="commentform" class="forms" action="" method="post">
                    <p v-if="!$parent.isLoggedIn()">
                      Please
                      <router-link to="/login">log in</router-link>
                      to leave a comment!
                    </p>

                    <div class="row">
                      <div class="col-md-12">
                        <input
                          type="text"
                          name="message"
                          class="form-control"
                          v-model="body"
                          placeholder="Enter your comment ..."
                        />
                      </div>
                      <!-- /.col -->
                    </div>
                    <!-- /.row -->
                    <div class="row">
                      <div class="col-sm-12">
                        <input
                          type="text"
                          class="form-control"
                          v-model="imageUrl"
                          placeholder="Enter an image... (optional)"
                        />
                      </div>
                      <!-- /.col -->
                    </div>
                    <!-- /.row -->

                    <button v-on:submit.prevent="createComment(post)" type="submit" class="btn btn-submit">
                      Submit comment
                    </button>
                  </form>

                  <div id="response"></div>
                </div>
                <!-- /.comment-form-wrapper -->
              </div>
              <!-- /.sidemeta -->
            </div>
            <!-- /.col -->

            <aside class="col-lg-3">
              <div class="sidebox widget">
                <h4>Search Posts</h4>

                <form id="search" class="navbar-form search" role="search">
                  <input type="search" v-model="filter" class="form-control" placeholder="Type to search" />
                  <!-- <button type="submit" class="btn btn-submit icon-right-open"></button> -->
                </form>
              </div>
              <!-- /.widget -->

              <div class="sidebox widget">
                <h4>Categories</h4>

                <ul v-for="tag in tags" v-bind="tag.name" :key="tag.name" class="circled">
                  <li id="tag.name" name="tag" value="tag.name">
                    <a href="#">{{ tag.name }}</a>
                  </li>
                </ul>
                <!-- /.circled -->
              </div>
              <!-- /.widget -->

              <div class="sidebox widget">
                <h4>Archives</h4>

                <ul class="circled">
                  <li><a href="#">March 2015</a></li>
                  <li><a href="#">February 2015</a></li>
                  <li><a href="#">January 2015</a></li>
                  <li><a href="#">December 2013</a></li>
                  <li><a href="#">November 2013</a></li>
                  <li><a href="#">October 2013</a></li>
                </ul>
                <!-- /.circled -->

                <a href="#" class="txt-btn">All archives</a>
              </div>
              <!-- /.widget -->
            </aside>
          </div>
          <!-- /.row -->
        </div>
        <!-- /.container -->
      </div>
    </section>

    <!-- ============================================================= SECTION – BLOG POST : END ============================================================= -->
    <!-- <div class="checkbox">
      <div v-for="tag in tags" v-bind="tag.name" :key="tag.name">
        <input type="checkbox" id="tag.name" name="tag" value="tag.name" />
        <label for="tag.name">{{ tag.name }}</label>
      </div>
    </div> -->
    <!-- <div>
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
    </div> -->
    <!-- <div>
      <input type="text" v-model="filter" />
    </div>
    <div v-for="post in orderBy(filterBy(posts, filter), sortAttribute, sortOrder)" v-bind:key="post.id">
      <router-link :to="`/posts/${post.id}`">
        <h2>{{ post.title }}</h2>
        <p>Posted: {{ relativeDate(post.created_at) }}</p>
        <p>{{ post.body }}</p>
        <img v-bind:src="post.image_url" class="" alt="" />
      </router-link>
      Claps: {{ post.claps }}
      <button v-on:click="addClap(post)">Clap</button>
      <div v-if="post.user_id == $parent.getUserId()">
        <router-link :to="`/posts/${post.id}/edit`">
          <button>Edit Post</button>
        </router-link>
        <button v-on:click="destroyPost(post)">Delete</button>
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
        Comment: {{ post.comment.body }}-->
    <!-- comment relativeDate shorts out page- idk why      ? -->
    <!--<p>{{ relativeDate(post.comment.created_at) }}</p>
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
      <form v-on:submit.prevent="createComment(post)">
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
    </div> -->
  </div>

  <!-- edit and delete buttons for comment owner </div> -->
</template>

<style>
#blog-post {
  margin: auto;
}
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
import moment from "moment";

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
      filter: "",
      gifs: [],
      gif: {
        small_gif: "",
      },
    };
  },

  created: function() {
    this.indexPosts();
    this.indexTags();
    this.viewGifs();
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
    addClap: function(post) {
      let params = {
        id: post.id,
      };
      axios.post(`/api/posts/${post.id}/clap`, params).then(response => {
        console.log(post);
        console.log(response.data);
        post.claps += 1;
        // this.$parent.flashMessage = "Clap added!";
      });
    },
    createComment: function(post) {
      let params = {
        body: this.body,
        image_url: this.imageUrl,
        post_id: post.id,
      };
      axios
        .post("/api/comments", params)
        .then(response => {
          console.log(response.data);
          this.$parent.flashMessage = "Comment created!";
          // post.comments.push(response.data);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },
    destroyPost: function(post) {
      let index = this.posts.indexOf(post);
      if (confirm("Do you want to delete this post?")) {
        axios.delete(`api/posts/${post.id}`).then(response => {
          console.log(response.data);
          this.posts.splice(index, 1);
        });
      }
    },
    viewGifs: function() {
      axios.get("/api/gifs").then(response => {
        this.gifs = response.data;
        console.log(this.gifs);
      });
    },
    relativeDate: function(date) {
      return moment(date).fromNow();
    },
    dayOfTheWeek: function(date) {
      return moment(date).format("ddd");
    },
    formattedMonth: function(date) {
      return moment(date).format("MMM");
    },
    formattedDay: function(date) {
      return moment(date).format("D");
    },
  },
};
</script>

<!-- https://stackoverflow.com/questions/55477354/how-to-filter-an-array-in-vue-js-with-multiple-select-buttons-->
