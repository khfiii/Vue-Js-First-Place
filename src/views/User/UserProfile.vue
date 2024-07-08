<template lang="">
  <Navbar />
  <main>
    <div v-if="isLoading" class="loader mt-4">Loading...</div>

    <div v-else>
      <div class="hero py-5 bg-light">
        <div class="container text-center">
          <h2 class="mb-1">{{ profiles.username }}</h2>
          <h5 class="mt-2">Last Login {{ formatDate(profiles.registerTimestamp) }}</h5>
        </div>
      </div>
      <div class="py-5">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-5 col-md-6">
              <div v-if="profiles.highScores.length > 0" class="card-body">
                <h5>Highscores per Game</h5>
                <ol>
                  <li v-for="(profile, index) in profiles.highScores" :key="index">
                    <a href="detail-games.html">{{ profile.game.title }} ({{ profile.score }})</a>
                  </li>
                </ol>
              </div>

              <div v-else></div>

              <div v-if="profiles.authorGames.length > 0">
                <h5>Authored Games</h5>
                <a
                  v-for="(author, index) in profiles.authorGames"
                  :key="index"
                  href="detail-games.html"
                  class="card card-default mb-3"
                >
                  <div class="card-body">
                    <div class="row">
                      <div class="col-4">
                        <img
                          src="../example_game/v1/thumbnail.png"
                          alt="Demo Game 1 Logo"
                          style="width: 100%"
                        />
                      </div>
                      <div class="col">
                        <h5 class="mb-1">
                          {{ author.title }}
                          <small class="text-muted">By {{ profiles.username }}</small>
                        </h5>
                        <div>
                          {{ author.description }}
                        </div>
                        <hr class="mt-1 mb-1" />
                        <div class="text-muted">#scores submitted : 203</div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              <div v-else class="mb-4">You are not published game yet</div>

              <!-- <a href="detail-games.html" class="card card-default mb-3">
                <div class="card-body">
                  <div class="row">
                    <div class="col-4">
                      <img
                        src="../example_game/v1/thumbnail.png"
                        alt="Demo Game 1 Logo"
                        style="width: 100%"
                      />
                    </div>
                    <div class="col">
                      <h5 class="mb-1">Demo Game 1 <small class="text-muted">By Dev1</small></h5>
                      <div>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, numquam
                        repellendus perspiciatis cupiditate veritatis porro quod eveniet animi
                        perferendis molestias debitis temporibus, asperiores iusto.
                      </div>
                      <hr class="mt-1 mb-1" />
                      <div class="text-muted">#scores submitted : 203</div>
                    </div>
                  </div>
                </div>
              </a> -->

              <a href="discover-games.html" class="btn btn-danger w-100">Back</a>
            </div>
          </div>
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
      usernameUser: '',
      userToken: '',
      isLoading: true,
      profiles: []
    }
  },

  methods: {
    async fetchUserProfile() {
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
          console.error('Error when fetching user profile')
        }

        this.profiles = response.data
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
    const userToken = localStorage.getItem('userToken')
    const usernameUser = localStorage.getItem('usernameUser')

    this.usernameUser = usernameUser
    this.userToken = userToken

    if (userToken == null) {
      this.$router.push({ name: 'signin' })
    }

    this.fetchUserProfile()
  }
}
</script>
<style lang=""></style>
