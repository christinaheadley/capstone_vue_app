<template>
  <div class="posts-show">
    <!-- ============================================================= SECTION – BLOG POST ============================================================= -->

    <section id="blog-post" class="light-bg">
      <div class="container inner-top-sm inner-bottom classic-blog no-sidebar">
        <div class="row">
          <div class="col-lg-9 mx-auto">
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

                <div class="post-content">
                  <p class="author">
                    <router-link
                      :to="`/users/${post.user.id}`"
                      title="Post author"
                      data-rel="tooltip"
                      data-placement="left"
                    >
                      {{ post.user.user_name }}
                    </router-link>
                  </p>

                  <h2 class="post-title">{{ post.title }}</h2>

                  <ul class="meta">
                    <li class="categories">
                      <a href="#" v-for="tag in post.tags" v-bind:key="tag.id">| {{ tag.name }} |</a>
                    </li>
                    <li class="comments">
                      <a href="#">{{ post.comments.length }}</a>
                    </li>
                    <li v-on:click="addClap()" class="likes">
                      <a href="#">{{ post.claps }}</a>
                    </li>
                  </ul>
                  <!-- /.meta -->

                  <p>{{ post.body }}</p>
                  <div v-if="post.user_id == $parent.getUserId()">
                    <router-link :to="`/posts/${post.id}/edit`">
                      <button class="btn btn-orange">Edit Post</button>
                    </router-link>

                    <!-- /.post-content -->
                  </div>
                </div>
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
                    <router-link :to="`/users/${post.user.id}`">
                      <h3>{{ post.user.user_name }}</h3>
                      <p>
                        {{ post.user.bio }}
                      </p>

                      <p></p>
                      <p>{{ post.user.location }}</p>
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

              <div id="comments">
                <h2>{{ post.comments.length }} Comments</h2>
                <ol class="commentlist">
                  <li class="comment" v-for="comment in post.comments" v-bind:key="comment.id">
                    <div class="avatar icon-overlay icn-link">
                      <router-link :to="`/users/${comment.user.id}`">
                        <img v-bind:src="comment.user.image_url" alt="" />
                      </router-link>
                    </div>
                    <!-- /.avatar -->

                    <div class="commentbody">
                      <div class="author">
                        <h3>
                          <router-link :to="`/users/${comment.user.id}`">{{ comment.user.user_name }}</router-link>
                        </h3>
                        <div class="meta">
                          <span class="date">{{ relativeDate(comment.created_at) }}</span>
                        </div>
                        <!-- /.meta -->
                      </div>
                      <!-- /.author -->

                      <div class="message">
                        <p>
                          {{ comment.body }}
                        </p>
                        <p v-if="comment.image_url"><img :src="comment.image_url" alt="" /></p>
                        <p v-if="comment.gif_url"><img :src="comment.gif_url" alt="" /></p>
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

                <form id="commentform" class="forms" v-on:submit.prevent="createComment()">
                  <div class="row">
                    <div class="col-md-12">
                      <textarea v-model="body" class="form-control" placeholder="Enter your comment ..."></textarea>
                    </div>
                    <!-- /.col -->
                  </div>
                  <!-- /.row -->
                  <div class="row">
                    <div class="col-md-12">
                      <input
                        type="text"
                        v-model="imageUrl"
                        class="form-control"
                        placeholder="Enter an image (optional)"
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
                        placeholder="Type search term to view GIFs"
                      />
                      <a v-if="gifSearchTerm" href="#modal-work03" data-toggle="modal" v-on:click="viewGifs()">
                        <u><b class="navy">See GIFs</b></u>
                      </a>
                      &nbsp;
                      <img src="/assets/images/giphy.png" class="" alt="GIPHY attribution for GIFs" />
                      <p></p>
                    </div>
                    <!-- /.col -->
                  </div>
                  <!-- /.row -->

                  <button type="submit" class="btn btn-submit">Submit comment</button>
                </form>

                <div id="response"></div>
              </div>
              <!-- /.comment-form-wrapper -->
            </div>
            <!-- /.sidemeta -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container -->
    </section>

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

    <!-- ============================================================= SECTION – BLOG POST : END ============================================================= -->
  </div>
</template>

<style>
.gif-select {
  width: 100%;
}
.selected-gif {
  border: 5px solid blueviolet;
}
</style>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      post: {
        user: {
          user_name: "",
        },
        comments: {},
      },
      body: "",
      imageUrl: "",
      gifUrl: "",
      errors: [],
      gifs: [],
      gifSearchTerm: "",
    };
  },
  created: function() {
    axios
      .get(`/api/posts/${this.$route.params.id}`)
      .then(response => {
        this.post = response.data;
        console.log(response.data);
      })
      .catch(error => {
        this.errors = error.response.data.errors;
        this.status = error.response.status;
      });
  },
  methods: {
    createComment: function() {
      let params = {
        body: this.body,
        image_url: this.imageUrl,
        gif_url: this.gifUrl,
        post_id: this.post.id,
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
    addClap: function() {
      let params = {
        id: this.post.id,
      };
      axios.post(`/api/posts/${this.post.id}/clap`, params).then(response => {
        console.log(this.post);
        console.log(response.data);
        this.post.claps += 1;
        // this.$parent.flashMessage = "Clap added!";
      });
    },
    destroyPost: function() {
      if (confirm("Do you want to delete this post?")) {
        axios.delete(`api/posts/${this.post.id}`).then(response => {
          console.log(response.data);
          this.$router.push("/");
        });
      }
    },
    viewGifs: function() {
      axios.get(`/api/gifs/search?search_term=${this.gifSearchTerm}`).then(response => {
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
