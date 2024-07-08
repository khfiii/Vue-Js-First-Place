<template>
  <Navbar />
  <main>
    <div class="hero py-5 bg-light">
      <div class="container">
        <router-link to="/admins/create" class="btn btn-primary">Create User</router-link>
        <!-- Modal trigger button -->
        <!-- <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#createUser"
        >
          Create User
        </button> -->

        <!-- Modal Body -->
        <!-- <div
          class="modal fade"
          id="createUser"
          tabindex="-1"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="modalTitleId"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-base"
            role="document"
          >
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalTitleId">Create User</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="createUser()">
                  <div class="mb-3">
                    <label for="" class="form-label">Username</label>
                    <input
                      type="text"
                      class="form-control"
                      name=""
                      id=""
                      aria-describedby="emailHelpId"
                      v-model="username"
                    />

                    <small class="text-danger" x-show="errorUsername">{{ errorUsername }}</small>
                  </div>
                  <div class="mb-3">
                    <label for="" class="form-label">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      name=""
                      id=""
                      aria-describedby="emailHelpId"
                      v-model="password"
                    />
                    <small class="text-danger" x-show="errorPassword">{{ errorPassword }}</small>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                      Close
                    </button>
                    <button type="submit" class="btn btn-primary">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>

    <div class="list-form py-5">
      <div class="container">
        <h6 class="mb-3">List Users</h6>
        <div v-if="isLoading" class="loader">Loading...</div>
        <table v-else class="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Created at</th>
              <th>Last login</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users.content" :key="index">
              <td>
                <a href="../Gaming Portal/profile.html" target="_blank">{{ user.username }}</a>
              </td>
              <td>{{ formatDate(user.created_at) }}</td>
              <td>{{ user.last_login_at ?? '-' }}</td>
              <td><span class="bg-success text-white p-1 d-inline-block">Active</span></td>
              <td>
                <div class="btn-group" role="group">
                  <button
                    type="button"
                    class="btn btn-primary btn-sm dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Lock
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <button type="submit" class="dropdown-item" name="reason" value="spamming">
                        Spamming
                      </button>
                    </li>
                    <li>
                      <button type="submit" class="dropdown-item" name="reason" value="cheating">
                        Cheating
                      </button>
                    </li>
                    <li>
                      <button type="submit" class="dropdown-item" name="reason" value="other">
                        Other
                      </button>
                    </li>
                  </ul>
                </div>
                <button
                  @click="updateUser(user.username, user.id)"
                  class="btn btn-sm btn-secondary"
                >
                  Update
                </button>

                <button @click="deleteUser(user.id)" class="btn btn-sm btn-danger">Delete</button>
              </td>
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
import '../../assets/js/bootstrap'

export default {
  components: {
    Navbar
  },

  data() {
    return {
      users: [],
      username: '',
      password: '',
      errorUsername: '',
      errorPassword: '',
      isLoading: true
    }
  },

  methods: {
    async fetchUser() {
      this.isLoading = true // Set isLoading menjadi true saat mulai fetch data
      try {
        const response = await axios.get('http://localhost:8000/api/v1/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          }
        })

        this.users = response.data

        if (response.status != 200) {
          console.error('error when fetching data')
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false //
      }
    },

    async createUser() {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/v1/users',
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

        if (response.status != 201) {
          console.error('failed when creating a new user')
        }

        const modalElement = document.getElementById('createUser')
        const modal = bootstrap.Modal.getInstance(modalElement)
        modal.hide()

        this.fetchUser()
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

    async deleteUser(id) {
      try {
        const response = await axios.delete(`http://localhost:8000/api/v1/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          }
        })

        if (response.status == 204) {
          this.fetchUser()
        }
      } catch (error) {
        console.error(error)
      }
    },

    updateUser(username, id) {
      this.$router.push({ name: 'admins.update', params: { id: id, username: username } })
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
    this.fetchUser()
    this.usernameAdmin = localStorage.getItem('usernameAdmin')
    this.adminToken = localStorage.getItem('adminToken')

    if (this.adminToken == null) {
      this.$router.push({ name: 'signin' })
    }
  }
}
</script>

<style>
.loader {
  text-align: center;
  font-size: 20px;
  color: #333;
}
</style>
