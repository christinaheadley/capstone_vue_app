<template>
  <div class="home">
    <!-- when add bootstrap, look at : https://www.w3schools.com/bootstrap/bootstrap_button_groups.asp -->

    <!-- ============================================================= SECTION – POPULAR POSTS ============================================================= -->

    <section id="popular-posts" class="light-bg">
      <div class="container inner-top-md">
        <div class="row">
          <div class="col-md-12">
            <div id="accordion-popular-posts" class="panel-group">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h4 class="panel-title">
                    <a class="panel-toggle collapsed" href="#content-popular-posts" data-toggle="collapse">
                      <span>Popular posts</span>
                    </a>
                  </h4>
                </div>
                <!-- /.panel-heading -->

                <div id="content-popular-posts" class="panel-collapse collapse" data-parent="#accordion-popular-posts">
                  <div class="panel-body">
                    <div id="owl-popular-posts" class="owl-carousel owl-item-gap-sm">
                      <div class="item">
                        <a href="blog-post.html">
                          <figure>
                            <figcaption class="text-overlay">
                              <div class="info">
                                <h4>Vintage Bicycles</h4>
                                <p>Interactive</p>
                              </div>
                              <!-- /.info -->
                            </figcaption>
                            <img src="//assets/images/art/work03.jpg" alt="" />
                          </figure>
                        </a>
                      </div>
                      <!-- /.item -->

                      <div class="item">
                        <a href="blog-post.html">
                          <figure>
                            <figcaption class="text-overlay">
                              <div class="info">
                                <h4>Simpli Nota</h4>
                                <p>Identity</p>
                              </div>
                              <!-- /.info -->
                            </figcaption>
                            <img src="/assets/images/art/work04.jpg" alt="" />
                          </figure>
                        </a>
                      </div>
                      <!-- /.item -->

                      <div class="item">
                        <a href="blog-post.html">
                          <figure>
                            <figcaption class="text-overlay">
                              <div class="info">
                                <h4>Vinyl Records</h4>
                                <p>Identity</p>
                              </div>
                              <!-- /.info -->
                            </figcaption>
                            <img src="/assets/images/art/work07.jpg" alt="" />
                          </figure>
                        </a>
                      </div>
                      <!-- /.item -->

                      <div class="item">
                        <a href="blog-post.html">
                          <figure>
                            <figcaption class="text-overlay">
                              <div class="info">
                                <h4>Astor & Yancy</h4>
                                <p>Identity</p>
                              </div>
                              <!-- /.info -->
                            </figcaption>
                            <img src="/assets/images/art/work09.jpg" alt="" />
                          </figure>
                        </a>
                      </div>
                      <!-- /.item -->

                      <div class="item">
                        <a href="blog-post.html">
                          <figure>
                            <figcaption class="text-overlay">
                              <div class="info">
                                <h4>Signwall</h4>
                                <p>Identity</p>
                              </div>
                              <!-- /.info -->
                            </figcaption>
                            <img src="/assets/images/art/work16.jpg" alt="" />
                          </figure>
                        </a>
                      </div>
                      <!-- /.item -->

                      <div class="item">
                        <a href="blog-post.html">
                          <figure>
                            <figcaption class="text-overlay">
                              <div class="info">
                                <h4>Tri Fold Brochure</h4>
                                <p>Print</p>
                              </div>
                              <!-- /.info -->
                            </figcaption>
                            <img src="/assets/images/art/work10.jpg" alt="" />
                          </figure>
                        </a>
                      </div>
                      <!-- /.item -->

                      <div class="item">
                        <a href="blog-post.html">
                          <figure>
                            <figcaption class="text-overlay">
                              <div class="info">
                                <h4>Embroidered</h4>
                                <p>Identity</p>
                              </div>
                              <!-- /.info -->
                            </figcaption>
                            <img src="/assets/images/art/work05a.jpg" alt="" />
                          </figure>
                        </a>
                      </div>
                      <!-- /.item -->

                      <div class="item">
                        <a href="blog-post.html">
                          <figure>
                            <figcaption class="text-overlay">
                              <div class="info">
                                <h4>El Corcho</h4>
                                <p>Identity</p>
                              </div>
                              <!-- /.info -->
                            </figcaption>
                            <img src="/assets/images/art/work12.jpg" alt="" />
                          </figure>
                        </a>
                      </div>
                      <!-- /.item -->
                    </div>
                    <!-- /.owl-carousel -->
                  </div>
                  <!-- /.panel-body -->
                </div>
                <!-- /.content -->
              </div>
              <!-- /.panel -->
            </div>
            <!-- /.panel-group -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container -->
    </section>
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

    <!-- ============================================================= SECTION – POPULAR POSTS : END ============================================================= -->

    <!-- ============================================================= SECTION – BLOG POST ============================================================= -->

    <section id="blog-post" class="light-bg">
      <div
        v-for="post in orderBy(filterBy(posts, filter), sortAttribute, sortOrder)"
        v-bind:key="post.id"
        class="container inner-top-sm inner-bottom classic-blog"
      >
        <div class="row">
          <div class="col-lg-9 inner-right-sm">
            <div class="sidemeta">
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

                <div class="post-content" data-rel="tooltip" data-placement="left">
                  <router-link :to="`/posts/${post.id}`">
                    <h1 class="post-title">{{ post.title }}</h1>
                    <h3 class="author"></h3>
                  </router-link>
                  <router-link :to="`/users/${post.user.id}`">
                    <h3>
                      by
                      {{ post.user.user_name }}
                    </h3>
                  </router-link>

                  <h4>
                    {{ relativeDate(post.created_at) }}
                  </h4>

                  <ul class="meta" v-if="post.tags">
                    <li class="categories" v-for="tag in post.tags" v-bind:key="tag.id">
                      {{ tag.name, }}
                    </li>
                    <li v-on:click="addClap(post)" class="likes">
                      {{ post.claps }}
                    </li>
                    <!-- <a href="#">Identity</a>
                      ,
                      <a href="#">Graphic Design</a> -->
                  </ul>
                  <ul class="meta" v-if="post.comments">
                    <li class="comments" v-for="comment in post.comments" v-bind:key="comment.id">
                      <!-- post.comments.anything doesn't work here even if it works elsewhere in code, adding  v-if="post.comment" to li doesn't work -->
                      {{ comment.id }}
                    </li>
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
                        {{ post.user.user_name }}
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
                    <div class="avatar icon-overlay icn-link" img v-bind:src="post.comment.user.image_url" alt=""></div>
                    <!-- /.avatar -->

                    <div class="commentbody">
                      Comment: {{ post.comment.body }}
                      <div class="author">
                        <h3>name:{{ post.comment.user.user_name }}</h3>
                        <div class="meta">
                          <span class="date">{{ relativeDate(post.comment.created_at) }}</span>
                        </div>
                        <!-- /.meta -->
                      </div>
                      <!-- /.author -->

                      <div class="message">
                        <p>
                          {{ post.comment.body }}
                        </p>
                      </div>
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
                      <textarea
                        name="message"
                        class="form-control"
                        v-model="body"
                        placeholder="Enter your comment ..."
                      ></textarea>
                    </div>
                    <!-- /.col -->
                  </div>
                  <!-- /.row -->
                  <div class="row">
                    <div class="col-md-12">
                      <textarea
                        name="image"
                        class="form-control"
                        v-model="imageUrl"
                        placeholder="Enter an image... (optional)"
                      ></textarea>
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

            <div class="sidebox widget">
              <h4>Resources</h4>

              <figure>
                <div class="icon-overlay icn-link">
                  <a href="blog-post.html"><img src="/assets/images/art/work01.jpg" alt="" /></a>
                </div>
                <!-- /.icon-overlay -->

                <figcaption class="bordered no-top-border">
                  <div class="info">
                    <h4><a href="blog-post.html">Appscreen Dashboard</a></h4>
                    <p>Interactive</p>
                  </div>
                  <!-- /.info -->
                </figcaption>
              </figure>
            </div>
            <!-- /.widget -->
          </aside>
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container -->
    </section>

    <!-- ============================================================= SECTION – BLOG POST : END ============================================================= -->
    <div class="checkbox">
      <div v-for="tag in tags" v-bind="tag.name" :key="tag.name">
        <input type="checkbox" id="tag.name" name="tag" value="tag.name" />
        <label for="tag.name">{{ tag.name }}</label>
      </div>
    </div>
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
    <div>
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
        Comment: {{ post.comment.body }}
        <!-- comment relativeDate shorts out page- idk why      ? -->
        <p>{{ relativeDate(post.comment.created_at) }}</p>
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
    </div>
  </div>

  <!-- edit and delete buttons for comment owner </div> -->
</template>

<style></style>

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
