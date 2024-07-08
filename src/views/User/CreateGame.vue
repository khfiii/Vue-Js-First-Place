<template lang="">
  <main>
    <div class="hero py-5 bg-light">
      <div class="container text-center">
        <h2 class="mb-3">Manage Games - Gaming Portal</h2>
      </div>
    </div>

    <div class="py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 col-md-6">
            <form @submit.prevent="uploadGame()">
              <div class="form-item card card-default my-4">
                <div class="card-body">
                  <div class="form-group">
                    <label for="title" class="mb-1 text-muted"
                      >Title <span class="text-danger">*</span></label
                    >
                    <input
                      id="title"
                      type="text"
                      placeholder="Title"
                      class="form-control"
                      name="title"
                      v-model="title"
                    />
                  </div>
                  <small class="text-danger" x-show="errorTitle">{{ errorTitle }}</small>
                </div>
              </div>
              <div class="form-item card card-default my-4">
                <div class="card-body">
                  <div class="form-group">
                    <label for="description" class="mb-1 text-muted"
                      >Description <span class="text-danger">*</span></label
                    >
                    <textarea
                      name="description"
                      class="form-control"
                      placeholder="Description"
                      id="description"
                      cols="30"
                      rows="5"
                      v-model="description"
                    ></textarea>
                    <small class="text-danger" x-show="errorDescription">{{
                      errorDescription
                    }}</small>
                  </div>
                </div>
              </div>

              <div class="mt-4 row">
                <div class="col">
                  <button class="btn btn-primary w-100">Submit</button>
                </div>
                <div class="col">
                  <router-link to="/games/manage" class="btn btn-danger w-100">Back</router-link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      title: '',
      description: '',
      errorTitle: '',
      errorDescription: ''
    }
  },

  methods: {
    async uploadGame() {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/v1/games',
          {
            title: this.title,
            description: this.description
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
          }
        )
        const data = response.data

        if (response.status != 201) {
          console.error('failed when creating a new game')
        }

        return this.$router.push({ name: 'games.manage' })
      } catch (error) {
        const errorItems = error.response.data

        if (errorItems.slug) {
          this.errorTitle = errorItems.slug
        }

        if ((error = errorItems.violations)) {
          if (error.title) {
            this.errorTitle = error.title.message
          }
          if (error.description) {
            this.errorDescription = error.description.message
          }
        }

        console.log(errorItems)
        // if (error.response.data.violations.title) {
        //   this.errorTitle = error.response.data.violations.title.message
        // }
        // if (error.response.data.violations.description) {
        //   this.errorDescription = error.response.data.violations.description.message
        // }
      }
    }
  },
  mounted() {
    if (localStorage.getItem('userToken') == null) {
      this.$router.push({ name: 'signin' })
    }
  }
}
</script>
<style lang=""></style>
