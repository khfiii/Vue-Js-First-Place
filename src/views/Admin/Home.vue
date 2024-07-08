<template lang="">
  <body>
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
            Welcome, {{ usernameAdmin }}. Don't forget to sign out when you are finished using this
            page
          </h5>
        </div>
      </div>
    </main>
  </body>
</template>
<script>
import axios from 'axios'
import Navbar from '@/components/Admin/Navbar.vue'

export default {
  components: {
    Navbar
  },
  data() {
    return {
      adminToken: null,
      usernameAdmin: null
    }
  },

  mounted() {
    this.usernameAdmin = localStorage.getItem('usernameAdmin')
    this.adminToken = localStorage.getItem('adminToken')

    if (this.adminToken == null) {
      this.$router.push({ name: 'signin' })
    }
  }
}
</script>
<style lang=""></style>
