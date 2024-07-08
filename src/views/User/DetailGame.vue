<template lang="">
  <main>
    <div v-if="isLoading" class="loader mt-5">Loading...</div>

    <div v-else class="hero py-5 bg-light">
      <div class="container text-center">
        <h2 class="mb-1">{{ game.title }}</h2>

        <a href="profile.html" class="btn btn-success">{{ game.author }}</a>
        <div class="text-muted">
          {{ game.description }}
        </div>
        <!-- <h5 class="mt-2">Last Versions v2 (2024-04-09 22:45:41)</h5> -->
        <h5 class="mt-2">Upload Timestamp {{ game.uploadTimestamp }}</h5>
      </div>
    </div>
    <div class="py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 col-md-6">
            <div class="row">
              <div class="col">
                <div class="card mb-3">
                  <div class="card-body">
                    <h5>Top 10 Leaderboard</h5>
                    <ol>
                      <li v-for="(score, index) in scores?.scores" :key="index">
                        {{ score.username }} ({{ score.score }})
                      </li>
                      <!-- <li>Player2 (2993)</li>
                      <li>Player3 (2000)</li>
                      <li>Player4 (1195)</li>
                      <li><b>Player1 (1190)</b></li>
                      <li>Player6 (1093)</li>
                      <li>Player7 (1055)</li>
                      <li>Player8 (1044)</li>
                      <li>Player9 (1005)</li>
                      <li>Player10 (992)</li> -->
                    </ol>
                  </div>
                </div>
              </div>
              <div class="col">
                <img
                  src="../example_game/v1/thumbnail.png"
                  alt="Demo Game 1 Logo"
                  style="width: 100%"
                />
                <a href="../example_game/v1//game.zip" class="btn btn-primary w-100 mb-2 mt-2"
                  >Download Game</a
                >
              </div>
            </div>
            <router-link to="/games/manage" class="btn btn-danger w-100">Back</router-link>
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
      userToken: '',
      isLoading: true,
      game: null,
      scores: null,
      currentUser: ''
    }
  },
  methods: {
    async fetchDetailGame() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/games/${this.$route.params.slug}`,
          {
            headers: {
              Authorization: `Bearer ${this.userToken}`
            }
          }
        )

        if (!response.status === 200) {
          console.error('Error when fetching user profile')
        }

        this.game = response.data
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },

    async fetchScores() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/games/${this.$route.params.slug}/scores`,
          {
            headers: {
              Authorization: `Bearer ${this.userToken}`
            }
          }
        )

        if (!response.status === 200) {
          console.error('Error when fetching user profile')
        }

        this.scores = response.data
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoadingScores = false
      }
    }
  },
  mounted() {
    const userToken = localStorage.getItem('userToken')
    const usernameUser = localStorage.getItem('usernameUser')

    this.userToken = userToken
    this.currentUser = usernameUser

    this.fetchDetailGame()
    this.fetchScores()

    if (userToken == null) {
      this.$router.push({ name: 'signin' })
    }
  }
}
</script>
<style lang=""></style>
