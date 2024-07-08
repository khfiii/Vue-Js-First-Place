<template>
  <main>
    <section class="login">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 col-md-6">
            <h1 class="text-center mb-4">Gaming Portal</h1>
            <div class="card card-default">
              <div class="card-body">
                <h3 class="mb-3">Sign In</h3>
                <form @submit.prevent="login">
                  <!-- s: input -->
                  <div class="form-group my-3">
                    <label for="username" class="mb-1 text-muted">Username</label>
                    <input
                      type="text"
                      v-model="username"
                      id="username"
                      name="username"
                      class="form-control"
                      autofocus
                      required
                    />
                  </div>

                  <!-- s: input -->
                  <div class="form-group my-3">
                    <label for="password" class="mb-1 text-muted">Password</label>
                    <input
                      type="password"
                      v-model="password"
                      id="password"
                      name="password"
                      class="form-control"
                      required
                    />
                  </div>

                  <small v-show="isInvalid" class="text-danger">Invalid email and password!</small>

                  <div class="mt-4 row">
                    <div class="col">
                      <button type="submit" class="btn btn-primary w-100">Sign In</button>
                    </div>

                    <div class="mt-2">
                      Don't have any account? <router-link to="signup">Sign Up</router-link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: null,
      isInvalid: false
    }
  },

  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8000/api/v1/auth/signin', {
          username: this.username,
          password: this.password
        })

        const data = response.data

        console.log(data)

        if (data.role === 'user') {
          localStorage.setItem('userToken', data.token)
          localStorage.setItem('usernameUser', data.username)
          this.$router.push({ name: 'games' })
        }

        if (data.role === 'admin') {
          localStorage.setItem('adminToken', data.token)
          localStorage.setItem('usernameAdmin', data.username)
          this.$router.push({ name: 'admins' })
        }
      } catch (error) {
        console.log(error)
        this.showErrorMessage(error)
      }
    },

    showErrorMessage(error) {
      this.isInvalid = true
      setTimeout(() => {
        this.isInvalid = false
      }, 10000)
      this.errorMessage = error.response
    }
  },
  mounted() {
    if (localStorage.getItem('userToken')) {
      this.$router.push({ name: 'games' })
    }
    if (localStorage.getItem('adminToken')) {
      this.$router.push({ name: 'admins' })
    }
  }
}
</script>

<style></style>
