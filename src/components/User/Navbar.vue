<template lang="">
  <nav class="navbar navbar-expand-lg sticky-top bg-primary navbar-dark">
    <div class="container">
      <router-link to="/games" class="navbar-brand">Gaming Portal</router-link>
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <router-link to="/games/discover" class="nav-link px-2 text-white"
          >Discover Games</router-link
        >
        <router-link to="/games/manage" class="nav-link px-2 text-white">Manage Games</router-link>
        <router-link to="/games/profile" class="nav-link px-2 text-white">User Profile</router-link>
        <li class="nav-item">
          <a class="nav-link active bg-dark" href="#">Welcome, {{ usernameUser }} </a>
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
      usernameUser: '',
      userToken: ''
    }
  },

  methods: {
    async logout() {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/v1/auth/signout',
          {},
          {
            headers: {
              Authorization: `Bearer ${this.userToken}`
            }
          }
        )

        const data = response.data

        if (data.status === 'success') {
          localStorage.removeItem('userToken')
          localStorage.removeItem('usernameUser')
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
    this.usernameUser = localStorage.getItem('usernameUser')
    this.userToken = localStorage.getItem('userToken')
  }
}
</script>
<style lang=""></style>
