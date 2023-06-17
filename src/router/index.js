import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Upload from '../views/Upload.vue'
import Update from '../views/Update'
import Download from '../views/Download'
import Markdown from '../views/MarkDown'
import Chat from '../views/Chat'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  },
    {
        path: '/upload',
        name: 'upload',
        component: Upload
    },
    {
        path: '/update',
        name: 'update',
        component: Update
    },
    {
        path: '/download',
        name: 'Download',
        component: Download
    },
    {
        path: '/markdown',
        name: 'markdown',
        component: Markdown
    },
    {
        path: '/chat',
        name: 'chat',
        component: Chat
    },



]

const router = new VueRouter({
  routes
})

export default router
