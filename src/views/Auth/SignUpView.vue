<template>
  <main>
    <div class="hero py-5 bg-light">
      <div class="container text-center">
        <h2 class="mb-3">Sign Up - Gaming Portal</h2>
        <div class="text-muted">Welcome to gaming portal platform</div>
      </div>
    </div>

    <div class="py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 col-md-6">
            <form @submit.prevent="signUp">
              <div class="form-item card card-default my-4">
                <div class="card-body">
                  <div class="form-group">
                    <label for="username" class="mb-1 text-muted"
                      >Username <span class="text-danger">*</span></label
                    >
                    <input
                      id="username"
                      v-model="username"
                      type="text"
                      placeholder="Username"
                      class="form-control"
                      name="username"
                      required
                    />

                    <small class="text-danger" x-show="errorUsername">{{ errorUsername }}</small>
                  </div>
                </div>
              </div>
              <div class="form-item card card-default my-4">
                <div class="card-body">
                  <div class="form-group">
                    <label for="password" class="mb-1 text-muted"
                      >Password <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="password"
                      id="password"
                      type="password"
                      placeholder="Password"
                      class="form-control"
                      name="userpasswordname"
                      required
                    />

                    <small class="text-danger" x-show="errorPassword">{{ errorPassword }}</small>
                  </div>
                </div>
              </div>

              <div class="mt-4 row">
                <div class="col">
                  <button type="submit" class="btn btn-primary w-100">Sign Up</button>
                </div>
                <div class="mt-2">
                  Already have account? <router-link to="signin">Sign In</router-link>
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
      errorUsername: null,
      errorPassword: null
    }
  },

  methods: {
    async signUp() {
      try {
        const response = await axios.post('http://localhost:8000/api/v1/auth/signup', {
          username: this.username,
          password: this.password
        })

        const data = response.data

        if (data.status == 'success') {
          this.$router.push({ name: 'signin' })
        }

        console.log(data)
      } catch (error) {
        console.log(error)

        if (error.response.data.violations.username) {
          this.errorUsername = error.response.data.violations.username.message
        }
        if (error.response.data.violations.password) {
          this.errorPassword = error.response.data.violations.password.message
        }
      }
    }
  }
}
</script>
<style></style>
