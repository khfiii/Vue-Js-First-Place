<template lang="">
  <nav class="navbar navbar-expand-lg sticky-top bg-primary navbar-dark">
    <div class="container">
      <router-link to="/admins/index" class="navbar-brand">Administrator Portal</router-link>
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <router-link to="/admins/list" class="nav-link px-2 text-white">List Admins</router-link>
        <router-link to="/admins/users" class="nav-link px-2 text-white">List Users</router-link>
        <li class="nav-item">
          <a class="nav-link active bg-dark" href="#">Welcome, {{ usernameAdmin }} </a>
        </li>
        <li class="nav-item">
          <button @click="logout()" class="btn bg-white text-primary ms-4">Sign Out</button>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      usernameAdmin: null,
      tokenAdmin: null
    }
  },

  methods: {
    async logout() {
      try {
        const token = localStorage.getItem('adminToken')

        const response = await axios.post(
          'http://localhost:8000/api/v1/auth/signout',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        const data = response.data

        if (data.status === 'success') {
          localStorage.removeItem('adminToken')
          localStorage.removeItem('usernameAdmin')
          this.$router.push({ name: 'signin' })
        } else {
          console.error('Logout failed', data)
        }
      } catch (error) {
        console.log('An error occurred during logout', error)
      }
    }
  },

  mounted() {
    this.usernameAdmin = localStorage.getItem('usernameAdmin')
    this.tokenAdmin = localStorage.getItem('adminToken')
  }
}
</script>
<style lang=""></style>
