<template>
  <div class="posts-edit">
    <!-- ============================================================= SECTION – BLOG POST ============================================================= -->

    <section id="blog-post" class="light-bg">
      <div class="container inner-top-sm inner-bottom classic-blog no-sidebar">
        <div class="row">
          <div class="col-lg-9 mx-auto">
            <div class="sidemeta">
              <div id="accordion-related-posts" class="panel-group"></div>
              <!-- /.panel-group -->

              <div class="comment-form-wrapper">
                <h2 class="navy">Edit Post</h2>

                <form v-on:submit.prevent="updatePost()" id="commentform" class="forms" action="" method="post">
                  <ul>
                    <li class="text-danger" v-for="error in errors" v-bind:key="error">
                      {{ error }}
                    </li>
                  </ul>
                  <div class="row form-group">
                    <div class="col-md-12">
                      <label>Title:</label>
                      <input
                        v-model="post.title"
                        type="text"
                        name="name"
                        class="form-control"
                        placeholder="Title (Required)"
                      />
                    </div>
                  </div>
                  <!-- /.col -->
                  <!-- </div> -->
                  <!-- /.row -->

                  <div class="row form-group">
                    <div class="col-md-12">
                      <label>Body:</label>
                      <textarea
                        v-model="post.body"
                        name="message"
                        class="form-control"
                        placeholder="Enter your post ..."
                      ></textarea>
                    </div>
                    <!-- /.col -->
                  </div>
                  <!-- /.row -->

                  <div class="row form-group">
                    <div class="col-md-12">
                      <label>Image:</label>
                      <textarea
                        v-model="post.image_url"
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
      post: {},
      errors: [],
      status: "",
      tags: [],
      selectedTagIds: [],
    };
  },
  created: function() {
    this.indexTags();
    axios.get(`/api/posts/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.post = response.data;
      this.selectedTagIds = this.post.tags.map(tag => tag.id);
      console.log(this.selectedTagIds);
    });
  },
  methods: {
    updatePost: function() {
      let params = {
        title: this.post.title,
        body: this.post.body,
        image_url: this.post.image_url,
        tag_ids: this.selectedTagIds,
      };
      axios
        .patch(`/api/posts/${this.post.id}`, params)
        .then(response => {
          console.log(response.data);
          this.$router.push(`/posts/${this.post.id}`);
          // this.$parent.flashMessage = "Post created!";
          //flash message and unshift not working
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },
    indexTags: function() {
      axios.get("/api/tags").then(response => (this.tags = response.data));
      console.log(this.tags);
    },
  },
};
</script>
