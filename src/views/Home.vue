<template>
  <div class="home">
    <!-- ============================================================= SECTION – BUTTONS ============================================================= -->

    <section id="buttons">
      <div class="container">
        <div class="row">
          <div class="col-lg-10 mx-auto text-center">
            <div class="btn-wrapper"></div>
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
        <div class="row">
          <div class="col-md-12">
            <ul class="format-filter text-center">
              <li>
                <button
                  class="btn btn-large btn-navy"
                  v-on:click="
                    sortAttribute = 'created_at';
                    sortOrder = -1;
                  "
                >
                  Sort by date
                </button>
                &nbsp;

                <button
                  class="btn btn-large btn-navy"
                  v-on:click="
                    sortAttribute = 'claps';
                    sortOrder = -1;
                  "
                >
                  Sort by popularity
                </button>
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
                <div class="post format-gallery ">
                  <div class="date-wrapper">
                    <div class="date  navy-bg">
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
                      <h2 class="post-title inner-top-xs inner-left-lg">{{ post.title }}</h2>
                      <h3 data-rel="tooltip" data-placement="" class="author"></h3>
                    </router-link>
                    <router-link :to="`/users/${post.user.id}`">
                      <h4 class="inner-left-lg">
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
                      <li v-on:click="addClap(post)" class="likes">
                        <a href="#">{{ post.claps }}</a>
                      </li>
                      <li class="comments" v-if="!post.comment">
                        <a href="#">0</a>
                      </li>

                      <li class="comments" v-else>
                        <a href="#">{{ post.comments.length }}</a>
                      </li>
                    </ul>
                    <figure v-if="post.image_url">
                      <img v-bind:src="post.image_url" class="" alt="" />
                    </figure>
                    <!-- /.meta -->
                    <p>
                      {{ post.body }}
                    </p>
                    <div v-if="post.user_id == $parent.getUserId()">
                      <router-link :to="`/posts/${post.id}/edit`">
                        <button class="btn btn-orange">Edit Post</button>
                      </router-link>
                      <!-- <button class="btn-navy" v-on:click="destroyPost(post)">Delete</button> -->
                    </div>
                  </div>
                  <!-- /.post-content -->
                </div>
                <!-- /.post -->

                <div class="post-author">
                  <figure>
                    <div class="author-image icon-overlay icn-link">
                      <router-link :to="`/users/${post.user.id}`">
                        <img :src="post.user.image_url" class="" alt="" />
                      </router-link>
                    </div>

                    <figcaption class="author-details">
                      <h3>{{ post.user.user_name }}</h3>
                      <router-link :to="`/users/${post.user.id}`">
                        <p>
                          {{ post.user.bio }}
                        </p>
                        <p>
                          {{ post.user.location }}
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
                    <li class="comment" v-if="post.comment.user.image_url">
                      <div class="avatar icon-overlay icn-link">
                        <img :src="post.comment.user.image_url" alt="" />
                      </div>
                      <!-- /.avatar -->

                      <div class="commentbody">
                        <div class="author">
                          <h3>
                            <a href="#">{{ post.comment.user.user_name }}</a>
                          </h3>
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
                          <p v-if="post.comment.image_url"><img :src="post.comment.image_url" alt="" /></p>
                          <p v-if="post.comment.gif_url"><img :src="post.comment.gif_url" alt="" /></p>
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
                        <h4 class="modal-title" id="modal-work03">GIPHY Search</h4>
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
                  <input type="search" v-model.lazy="filter" class="form-control" placeholder="Type to search" />
                  <button type="submit" class="btn btn-submit btn-navy icon-right-open"></button>
                </form>
              </div>
              <!-- /.widget -->

              <div class="sidebox widget">
                <h4>Categories</h4>
                <!-- ============================================================= SECTION – BUTTONS ============================================================= -->

                <!-- ============================================================= SECTION – BUTTONS : END ============================================================= -->

                <ul v-for="tag in tags" v-bind="tag.name" :key="tag.name">
                  <li id="tag.name" name="tag" value="tag.name">
                    <!-- <a v-bind:[tag]="filter">{{ tag.name }}</a> -->
                    <button class="btn btn-navy" v-on:click="setFilterAttribute(tag.name)">{{ tag.name }}</button>
                  </li>
                </ul>
                <!-- /.circled -->
              </div>
              <!-- /.widget -->

              <div class="sidebox widget">
                <h4>Archives</h4>

                <ul class="circled">
                  <li><a href="#">March 2021</a></li>
                  <li><a href="#">February 2021</a></li>
                  <li><a href="#">January 2021</a></li>
                  <li><a href="#">December 2020</a></li>
                  <li><a href="#">November 2020</a></li>
                  <li><a href="#">October 2020</a></li>
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
<style>
img {
  object-fit: cover;
}
li .btn {
  margin: 0px;
}
u {
  font-size: 24px;
}
/* .sidebox ul {
  padding-left: 0px;
} */
/* .home.light-bg.inner-bottom  */
main header .home .inner-bottom {
  padding-bottom: 0px;
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
        this.$parent.flashMessage = "Clap added!";
      });
    },
    createComment: function(post) {
      let params = {
        body: this.body,
        image_url: this.imageUrl,
        gif_url: this.gifUrl,
        post_id: post.id,
      };
      axios
        .post("/api/comments", params)
        .then(response => {
          console.log(response.data);
          this.$parent.flashMessage = "Comment created!";
          this.post.comments.push(response.data);
          console.log(this.post.comments);
          this.body = "";
          this.imageUrl = "";
          this.gifUrl = "";
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
    viewGifs: function(post) {
      axios.get(`/api/gifs/search?search_term=${this.gifSearchTerm}`).then(response => {
        this.gifs = response.data;
        console.log(this.gifs);
        console.log(post);
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
