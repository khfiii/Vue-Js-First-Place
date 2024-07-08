<template lang="">
  <Navbar />
  <main>
    <div class="hero py-5 bg-light">
      <div class="container">
        <router-link to="/games/create" class="btn btn-primary">Add Game</router-link>
      </div>
    </div>

    <div class="list-form py-5">
      <div class="container">
        <div v-if="isLoading" class="loader">Loading...</div>

        <div v-else>
          <h6 class="mb-3">List Games</h6>

          <div v-if="games?.authorGames?.length == 0">No published game yet</div>

          <table v-if="games?.authorGames?.length > 0" class="table table-striped">
            <thead>
              <tr>
                <th width="100">Thumbnail</th>
                <th width="200">Title</th>
                <th width="500">Description</th>
                <th width="180">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(game, index) in games.authorGames" :key="index">
                <td>
                  <img
                    src="../example_game/v1/thumbnail.png"
                    alt="Demo Game 1 Logo"
                    style="width: 100%"
                  />
                </td>
                <td>{{ game.title }}</td>
                <td>
                  {{ game.description }}
                </td>
                <td>
                  <button @click="goToDetail(game.slug)" class="btn btn-sm btn-primary">
                    Detail
                  </button>
                  <a href="manage-games-form-update.html" class="btn btn-sm btn-secondary"
                    >Update</a
                  >
                  <button @click="deleteGame(game.slug)" href="#" class="btn btn-sm btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
      games: [],
      usernameUser: null,
      userToken: null,
      isLoading: true
    }
  },

  methods: {
    async fetchGamesByUser() {
      this.isLoading = true
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/users/${this.usernameUser}`,
          {
            headers: {
              Authorization: `Bearer ${this.userToken}`
            }
          }
        )

        if (!response.status === 200) {
          console.error('Error when fetching data')
        }

        this.games = response.data
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },

    async deleteGame(slug) {
      try {
        const response = await axios.delete(`http://localhost:8000/api/v1/games/${slug}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`
          }
        })

        if (response.status == 204) {
          this.fetchGamesByUser()
        }
      } catch (error) {
        console.error(error)
      }
    },

    goToDetail(slug) {
      this.$router.push({ name: 'games.detail', params: { slug: slug } })
    }
  },

  mounted() {
    const userToken = localStorage.getItem('userToken')
    const usernameUser = localStorage.getItem('usernameUser')

    this.usernameUser = usernameUser
    this.userToken = userToken

    this.fetchGamesByUser()

    if (userToken == null) {
      this.$router.push({ name: 'signin' })
    }
  }
}
</script>
<style lang=""></style>
