<template>
  <div class="movie-card">
    <img class="card-img-top"
      @error="imageError = true"
      :src="workingImage">

    <img v-if="saved"
      class="movie-card-saved-icon" src="/static/star.png">

    <div class="movie-card-body">
      <div class="text-container">
        <h4 class="card-title">{{title}}</h4>
        <p class="card-text">{{description}}</p>
      </div>

      <movie-card-vote-average :voteAverage="voteAverage"/>

      <router-link :to="getRoute"
        class="btn btn-primary save-btn">
        More
      </router-link>
      <a v-if="!saved" href="#" @click.prevent="saveMovie(movieObject)"
        class="btn btn-info save-btn">
        Add
      </a>
      <a v-else href="#" @click.prevent="removeMovie(movieObject)"
        class="btn btn-danger save-btn">
        Remove
      </a>

    </div>
  </div>
</template>

<script>
import MovieCardVoteAverage from './MovieCardVoteAverage'
import {mapActions} from 'vuex'

export default {
  components: {
    MovieCardVoteAverage
  },

  data () {
    return {
      imageError: false
    }
  },

  props: {
    id: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      default: 'http://lorempixel.com/370/556'
    },
    title: {
      type: String,
      default: 'Some Title'
    },
    description: {
      type: String,
      default: 'Some description'
    },
    voteAverage: {
      type: Number,
      default: -1
    }
  },

  computed: {
    workingImage () {
      if (this.imageError) {
        const escapedMovieTitle = this.title.replace(' ','+')
        return `http://via.placeholder.com/370x556?text=${escapedMovieTitle}`
      }
      return this.image
    },
    saved () {
      const savedMovies = this.$store.state.savedMovies
      return savedMovies.some(movie => movie.id === this.id)
    },
    movieObject () {
      // We don't save vote_average because it may change
      return {
        'id': this.id,
        'title': this.title,
        'description': this.description,
        'image': this.image,
      }
    },
    getRoute() {
      return `/movies/${this.id}`
    }
  },

  methods: {
    ...mapActions({
      saveMovie: 'saveMovie',
      removeMovie: 'removeMovie'
    })
  }
}
</script>

<style scoped>
.movie-card {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
  color: white;
  position: relative;
  overflow: hidden;
}
.movie-card-saved-icon {
  width: 30px;
  height: 30px;
  top: 10px;
  right: 10px;
  position: absolute
}
.movie-card-body {
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 20px;
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.3s, transform 0.3s;
}
.movie-card:hover .movie-card-body {
  opacity: 1;
  transform: translateY(0);
}
.text-container {
  max-height: 300px;
  margin-bottom: 20px;
  overflow: hidden;
}
.card-text {
  font-size: 14px;
}
.save-btn {
  float: right;
}
</style>
