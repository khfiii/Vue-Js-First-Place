<template lang="">
  <div>
    <Navbar />
    <main>
      <div class="hero py-5 bg-light">
        <div class="container text-center">
          <h1>Discover Games</h1>
        </div>
      </div>

      <div class="list-form py-5">
        <div v-if="isLoading" class="loader">Loading...</div>

        <div v-else class="container">
          <div class="row">
            <div class="col">
              <h2 class="mb-3">{{ games.totalElements }} Game Avaliable</h2>
            </div>

            <div class="col-lg-8" style="text-align: right">
              <div class="mb-3">
                <div class="btn-group" role="group">
                  <button
                    @click="changeSort('popular')"
                    :class="['btn', sortBy === 'popular' ? 'btn-secondary' : 'btn-outline-primary']"
                  >
                    Popularity
                  </button>
                  <button
                    @click="changeSort('uploaddate')"
                    :class="[
                      'btn',
                      sortBy === 'uploaddate' ? 'btn-secondary' : 'btn-outline-primary'
                    ]"
                  >
                    Recently Updated
                  </button>
                  <button
                    @click="changeSort('title')"
                    :class="['btn', sortBy === 'title' ? 'btn-secondary' : 'btn-outline-primary']"
                  >
                    Alphabetically
                  </button>
                </div>

                <div class="btn-group" role="group">
                  <button
                    @click="changeOrder('asc')"
                    :class="['btn', sortDir === 'asc' ? 'btn-secondary' : 'btn-outline-primary']"
                  >
                    ASC
                  </button>
                  <button
                    @click="changeOrder('desc')"
                    :class="['btn', sortDir === 'desc' ? 'btn-secondary' : 'btn-outline-primary']"
                  >
                    DESC
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div v-for="(game, index) in games.content" :key="index" class="col-md-6">
              <a
                :href="'detail-games.html?gameId=' + game.id"
                class="card card-default mb-3"
                role="link"
              >
                <div class="card-body">
                  <div class="row">
                    <div class="col-4">
                      <img
                        :src="game.thumbnail || '../example_game/v1/thumbnail.png'"
                        :alt="game.title + ' Logo'"
                        style="width: 100%"
                      />
                    </div>
                    <div class="col">
                      <h5 class="mb-1">
                        {{ game.title }} <small class="text-muted">{{ game.author }}</small>
                      </h5>
                      <div>{{ game.description }}</div>
                      <hr class="mt-1 mb-1" />
                      <div class="text-muted">#scores submitted: {{ game.scoreCount }}</div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
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
      userToken: null,
      isLoading: true,
      games: {
        content: [],
        totalElements: 0
      },
      sortBy: 'title', // default sort
      sortDir: 'asc', // default order
      page: 0, // initial page
      size: 10 // number of games per request
    }
  },

  methods: {
    async fetchGames() {
      this.isLoading = true
      try {
        const response = await axios.get('http://localhost:8000/api/v1/games', {
          headers: {
            Authorization: `Bearer ${this.userToken}`
          },
          params: {
            sortBy: this.sortBy,
            sortDir: this.sortDir,
            page: this.page,
            size: this.size
          }
        })

        if (!response.status === 200) {
          console.error('Error when fetching data')
        }

        this.games.content = response.data.content
        this.games.totalElements = response.data.totalElements
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },

    changeSort(sort) {
      console.log(sort)
      this.sortBy = sort
      this.page = 0
      this.fetchGames()
    },

    changeOrder(order) {
      this.sortDir = order
      this.page = 0
      this.fetchGames()
    }
  },

  mounted() {
    const userToken = localStorage.getItem('userToken')
    this.userToken = userToken

    this.fetchGames()

    if (userToken == null) {
      this.$router.push({ name: 'signin' })
    }
  }
}
</script>

<style lang=""></style>
