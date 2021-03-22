<template>
  <div class="home">
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
                        <span v-for="tag in post.tags" v-bind:key="tag.id">| {{ tag.name }} |</span>
                      </li>
                      <li v-on:click="addClap(post)" class="likes">
                        <span>{{ post.claps }}</span>
                      </li>
                      <li class="comments" v-if="post.comment">
                        <span>{{ post.comments.count }}</span>
                      </li>
                      <li class="comments" v-else><span>0</span></li>
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
                        <p v-if="post.comment.image_url"><img :src="post.comment.image_url" alt="" /></p>
                        <p v-if="post.comment.gif_url"><img :src="post.comment.gif_url" alt="" /></p>
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
                  <div v-if="!$parent.isLoggedIn()">
                    <p>
                      <router-link to="/login">Please log in to leave a comment!</router-link>
                    </p>
                  </div>
                  <h2>Leave a Comment</h2>

                  <form id="commentform" class="forms" v-on:submit.prevent="createComment()">
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
                    <div class="row">
                      <div class="col-md-12">
                        <input
                          type="text"
                          v-model="gifSearchTerm"
                          class="form-control"
                          placeholder="Add search term to add GIF"
                        />
                        <span v-if="gifSearchTerm" href="#modal-work03" data-toggle="modal" v-on:click="viewGifs()">
                          Select GIF
                        </span>
                        <img src="/assets/images/giphy.png" class="" alt="GIPHY attribution for GIFs" />
                      </div>
                      <!-- /.col -->
                    </div>
                    <!-- /.row -->

                    <button type="submit" class="btn btn-submit">
                      Submit comment
                    </button>
                  </form>

                  <div id="response"></div>
                </div>
                <!-- /.comment-form-wrapper -->
                <!-- ============================================================= MODAL WORK03 ============================================================= -->

                <div
                  class="modal fade"
                  id="modal-work03"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="modal-work03"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-md">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h4 class="modal-title" id="modal-work03">Medium modal</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true"><i class="icon-cancel-1"></i></span>
                        </button>
                      </div>
                      <!-- /.modal-header -->

                      <!-- ============================================================= MODAL CONTENT ============================================================= -->

                      <div class="modal-body">
                        <!-- ============================================================= SECTION – PORTFOLIO POST ============================================================= -->

                        <section id="portfolio-post">
                          <div class="container inner-top-xs inner-bottom">
                            <div class="row">
                              <div class="col-md-4" v-for="gif in gifs" v-bind:key="gif.small_gif">
                                <img
                                  v-on:click="gifUrl = gif.small_gif"
                                  class="gif-select"
                                  v-bind:class="{ 'selected-gif': gifUrl == gif.small_gif }"
                                  :src="gif.small_gif"
                                  alt=""
                                />
                              </div>
                              <!-- /.col -->
                            </div>
                            <!-- /.row -->
                          </div>
                          <!-- /.container -->
                        </section>

                        <!-- ============================================================= SECTION – PORTFOLIO POST : END ============================================================= -->
                      </div>
                      <!-- /.modal-body -->

                      <!-- ============================================================= MODAL CONTENT : END ============================================================= -->

                      <div class="modal-footer">
                        <button type="button" class="btn" data-dismiss="modal">Close</button>
                      </div>
                      <!-- /.modal-footer -->
                    </div>
                    <!-- /.modal-content -->
                  </div>
                  <!-- /.modal-dialog -->
                </div>
                <!-- /.modal -->

                <!-- ============================================================= MODAL WORK03 : END ============================================================= -->
              </div>
              <!-- /.sidemeta -->
            </div>
            <!-- /.col -->

            <aside class="col-lg-3">
              <div class="sidebox widget">
                <h4>Search Posts</h4>

                <form id="search" class="navbar-form search" role="search">
                  <input type="search" v-model="filter" class="form-control" placeholder="Type to search" />
                  <button type="submit" class="btn btn-submit icon-right-open"></button>
                </form>
              </div>
              <!-- /.widget -->

              <div class="sidebox widget">
                <h4>Categories</h4>
                <!-- ============================================================= SECTION – BUTTONS ============================================================= -->

                <!-- ============================================================= SECTION – BUTTONS : END ============================================================= -->

                <ul v-for="tag in tags" v-bind="tag.name" :key="tag.name" class="circled">
                  <li id="tag.name" name="tag" value="tag.name">
                    <!-- <a v-bind:[tag]="filter">{{ tag.name }}</a> -->
                    <button v-on:click="setFilterAttribute(tag.name)">{{ tag.name }}</button>
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
  </div>
</template>

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
      gifUrl: "",
      filter: "",
      gifs: [],
      gifSearchTerm: "",
      filterAttribute: "",
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
    setFilterAttribute: function(attribute) {
      this.filter = attribute;
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
        gif_url: this.gifUrl,
        post_id: this.postId,
      };
      axios
        .post("/api/comments", params)
        .then(response => {
          console.log(response.data);
          this.$parent.flashMessage = "Comment created!";
          // this.post.comments.push(response.data);
          // console.log(this.post.comments);
          console.log(post);
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
      axios.get(`/api/gifs/search?search_term=${this.gifSearchTerm}`).then(response => {
        this.gifs = response.data;
        console.log(this.gifs);
      });
    },
    // trendGifs: function() {
    //   axios.get("/api/gifs").then(response => {
    //     this.gifs = response.data;
    //     console.log(this.gifs);
    //   });
    // },
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
