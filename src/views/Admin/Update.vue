<template lang="">
  <
  <main>
    <div class="hero py-5 bg-light">
      <div class="container text-center">
        <h2 class="mb-3">Manage User - Administrator Portal</h2>
        <div class="text-muted">Update user for the games</div>
      </div>
    </div>

    <div class="py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 col-md-6">
            <form @submit.prevent="updateUser()">
              <div class="form-item card card-default my-4">
                <div class="card-body">
                  <div class="form-group">
                    <label for="username" class="mb-1 text-muted"
                      >Username <span class="text-danger">*</span></label
                    >
                    <input
                      id="username"
                      type="text"
                      placeholder="Username"
                      class="form-control"
                      name="username"
                      v-model="username"
                    />
                  </div>
                  <small class="text-danger" x-show="errorUsername">{{ errorUsername }}</small>
                </div>
              </div>
              <div class="form-item card card-default my-4">
                <div class="card-body">
                  <div class="form-group">
                    <label for="password" class="mb-1 text-muted"
                      >Password <span class="text-danger">*</span></label
                    >
                    <input
                      id="password"
                      type="password"
                      placeholder="Password"
                      class="form-control"
                      name="userpasswordname"
                      v-model="password"
                    />
                  </div>
                  <small class="text-danger" x-show="errorPassword">{{ errorPassword }}</small>
                </div>
              </div>

              <div class="mt-4 row">
                <div class="col">
                  <button type="submit" class="btn btn-primary w-100">Submit</button>
                </div>
                <div class="col">
                  <router-link to="/admins/users" class="btn btn-danger w-100">Back</router-link>
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
      username: '',
      password: '',
      id: '',
      errorUsername: '',
      errorPassword: ''
    }
  },
  methods: {
    async updateUser() {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/v1/users/${this.id}`,
          {
            username: this.username,
            password: this.password
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('adminToken')}`
            }
          }
        )
        const data = response.data

        return this.$router.push({ name: 'admins.users' })
      } catch (error) {
        console.error(error)
        if (error.response.data.violations.username) {
          this.errorUsername = error.response.data.violations.username.message
        }
        if (error.response.data.violations.password) {
          this.errorPassword = error.response.data.violations.password.message
        }
      }
    },
    async fetchUser() {
      this.id = this.$route.params.id
      this.username = this.$route.params.username
    }
  },
  mounted() {
    if (localStorage.getItem('adminToken') == null) {
      this.$router.push({ name: 'signin' })
    } else {
      this.fetchUser()
    }
  }
}
</script>
<style lang=""></style>
