<template lang="">
  <Navbar />
  <main>
    <div class="list-form py-5">
      <div class="container">
        <h6 class="mb-3">List Admins</h6>
        <div v-if="isLoading" class="loader">Loading...</div>

        <table v-else class="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Created at</th>
              <th>Last login</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(admin, index) in admins.content" :key="index">
              <td>{{ admin.username }}</td>
              <td>{{ formatDate(admin.created_at) }}</td>
              <td>{{ admin.last_login_at }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
<script>
import Navbar from '@/components/Admin/Navbar.vue'
import axios from 'axios'
export default {
  components: {
    Navbar
  },

  data() {
    return {
      admins: [],
      isLoading: true
    }
  },

  methods: {
    async fetchAdmin() {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/admins', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          }
        })

        this.admins = response.data

        if (response.status != 200) {
          console.error('error when fetching data')
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },

    formatDate(date) {
      const dateObj = new Date(date)

      const pad = (number) => (number < 10 ? '0' + number : number)

      // Format tanggal dan waktu
      const year = dateObj.getFullYear()
      const month = pad(dateObj.getMonth() + 1)
      const day = pad(dateObj.getDate())
      const hours = pad(dateObj.getHours())
      const minutes = pad(dateObj.getMinutes())
      const seconds = pad(dateObj.getSeconds())

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }
  },

  mounted() {
    this.fetchAdmin()
    this.usernameAdmin = localStorage.getItem('usernameAdmin')
    this.adminToken = localStorage.getItem('adminToken')

    if (this.adminToken == null) {
      this.$router.push({ name: 'signin' })
    }
  }
}
</script>
<style lang=""></style>
