import { createRouter, createWebHistory } from 'vue-router'
import GameView from '../views/User/HomeView.vue'
import SignIn from '../views/Auth/SignInView.vue'
import SignUp from '../views/Auth/SignUpView.vue'
import Admin from '../views/Admin/Home.vue'
import AdminList from '../views/Admin/ListAdmin.vue'
import UserList from '../views/Admin/ListUser.vue'
import CreateUser from '../views/Admin/Create.vue'
import UpdateUser from '../views/Admin/Update.vue'
import DiscoverGame from '../views/User/DiscoverGame.vue'
import ManageGame from '../views/User/ManageGame.vue'
import UserProfile from '../views/User/UserProfile.vue'
import CreateGame from '../views/User/CreateGame.vue'
import DetailGame from '../views/User/DetailGame.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: SignIn
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/games',
      name: 'games',
      component: GameView
    },
    {
      path: '/games/discover',
      name: 'games.discover',
      component: DiscoverGame
    },
    {
      path: '/games/manage',
      name: 'games.manage',
      component: ManageGame
    },
    {
      path: '/games/profile',
      name: 'games.profile',
      component: UserProfile
    },
    {
      path: '/games/create',
      name: 'games.create',
      component: CreateGame
    },
    {
      path: '/games/detail/:slug',
      name: 'games.detail',
      component: DetailGame
    },
    {
      path: '/admins/index',
      name: 'admins',
      component: Admin
    },
    {
      path: '/admins/list',
      name: 'admins.list',
      component: AdminList
    },
    {
      path: '/admins/users',
      name: 'admins.users',
      component: UserList
    },
    {
      path: '/admins/create',
      name: 'admins.create',
      component: CreateUser
    },
    {
      path: '/admins/update/:id/:username',
      name: 'admins.update',
      component: UpdateUser
    }
  ]
})

export default router
