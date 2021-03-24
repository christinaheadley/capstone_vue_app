<template>
  <div class="posts-new">
    <!-- ============================================================= SECTION – BLOG POST ============================================================= -->

    <section id="blog-post" class="light-bg">
      <div class="container inner-top-sm inner-bottom classic-blog no-sidebar">
        <div class="row">
          <div class="col-lg-9 mx-auto">
            <div class="sidemeta">
              <div id="accordion-related-posts" class="panel-group"></div>
              <!-- /.panel-group -->

              <div class="comment-form-wrapper">
                <h2 class="navy">New Post</h2>

                <form v-on:submit.prevent="createPost()" id="commentform" class="forms" action="" method="post">
                  <div class="row">
                    <div class="col-md-6">
                      <input
                        v-model="title"
                        type="text"
                        name="name"
                        class="form-control"
                        placeholder="Title (Required)"
                      />
                    </div>
                    <!-- /.col -->
                  </div>
                  <!-- /.row -->

                  <div class="row">
                    <div class="col-md-12">
                      <textarea
                        v-model="body"
                        name="message"
                        class="form-control"
                        placeholder="Enter your post ..."
                      ></textarea>
                    </div>
                    <!-- /.col -->
                  </div>
                  <!-- /.row -->

                  <div class="row">
                    <div class="col-md-12">
                      <textarea
                        v-model="imageUrl"
                        name="text"
                        class="form-control"
                        placeholder="Enter an image (optional) ..."
                      ></textarea>
                    </div>
                    <!-- /.col -->
                  </div>
                  <!-- /.row -->

                  <div class="row">
                    <div v-for="tag in tags" :key="tag.id" class="col-sm-4">
                      <div class="col-sm-4">
                        <div class="col-sm-4">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <div class="input-group-text">
                                <input
                                  type="checkbox"
                                  id="tag.name"
                                  name="tag"
                                  :value="tag.id"
                                  v-model="selectedTagIds"
                                  class="form-control"
                                />
                                <label for="tag.name">
                                  <h6>{{ tag.name }}</h6>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button type="submit" class="btn btn-submit">Submit Post</button>
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

    <!-- ============================================================= SECTION – BLOG POST : END ============================================================= -->
  </div>
</template>

<style>
label h6 {
  margin: auto;
  padding-left: 12px;
}
.input-group-text .form-control {
  width: 27.95px;
  height: 42.5px;
  background-color: aquamarine;
}
</style>
<script>
import axios from "axios";

export default {
  data: function() {
    return {
      title: "",
      body: "",
      imageUrl: "",
      errors: [],
      status: "",
      tags: [],
      selectedTagIds: [],
      tag: {
        name: "",
      },
      gifs: [],
      searchTerms: [
        {
          small_gif: "",
        },
      ],
    };
  },
  created: function() {
    this.indexTags();
  },
  methods: {
    createPost: function() {
      let params = {
        title: this.title,
        body: this.body,
        image_url: this.imageUrl,
        tag_ids: this.selectedTagIds,
      };
      axios
        .post("/api/posts", params)
        .then(response => {
          this.$parent.flashMessage = "Post created!";
          this.$router.push("/");
          console.log(response.data);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },
    indexTags: function() {
      axios.get("/api/tags").then(response => {
        this.tags = response.data;
        console.log(this.tags);
      });
    },

    searchGifs: function() {
      let params = {
        search_terms: this.searchTerms,
      };

      axios.get("/api/gifs/search", params).then(response => {
        for (this.small_gif of this.searchTerms);
        console.log(this.small_gif);

        this.gifs = response.data;
        console.log(this.gifs);
      });
    },
  },
};
</script>
