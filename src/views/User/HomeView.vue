<template>
  <Navbar />
  <main>
    <div class="hero py-5 bg-light">
      <div class="container text-center">
        <h1 class="mb-0 mt-0">Dashboard</h1>
      </div>
    </div>

    <div class="list-form py-5">
      <div class="container">
        <h5 class="alert alert-info">
          Welcome, {{ usernameUser }}. Don't forget to sign out when you are finished using this
          page
        </h5>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import Navbar from '@/components/User/Navbar.vue'

export default {
  components: {
    Navbar
  },
  data() {
    return {
      usernameUser: null,
      userToken: null
    }
  },

  mounted() {
    this.usernameUser = localStorage.getItem('usernameUser')
    this.userToken = localStorage.getItem('userToken')

    if (this.userToken == null) {
      this.$router.push({ name: 'signin' })
    }
  }
}
</script>

<style></style>
