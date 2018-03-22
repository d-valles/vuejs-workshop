import Vue from 'vue'
import VueRouter from 'vue-router'

import TodoPage from '../components/todo/TodoPage'
import MoviePage from '../components/movies/MoviePage'
import MovieInfo from '../components/movies/MovieInfo'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: TodoPage },
    { path: '/movies', component: MoviePage },
    { path: '/movies/:id', component: MovieInfo }
]

export default new VueRouter({
    mode: 'history',
    routes
})