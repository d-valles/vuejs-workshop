<template>
    <div>

        <div class="container">
            <h1>My movies</h1>
            <p>{{this.$route.params.id}}</p>
        </div>

        <div class="container">
            <div class="card">
            <div class="row">
                <div class="col-md-6">
                <div class="card-block">
                    <h4 class="card-title">{{title}}</h4>
                    <p class="card-text">{{description}}</p>
                    <p class="card-text">{{rate}}</p>
                </div>
                </div>
                <div class="col-md-6">
                    <img :src="image">
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        title() {
            return this.$store.state.movie.title
        },
        image() {
            return `http://image.tmdb.org/t/p/w370_and_h556_bestv2${this.$store.state.movie.poster_path}`
        },
        description() {
            return this.$store.state.movie.overview
        },
        rate() {
            return this.$store.state.movie.vote_average
        }
    },
    mounted() {
        this.$store.dispatch('fetchMovie', this.$route.params.id)
    }
}
</script>

<style scoped>
    .card-img-bottom {
    color: #fff;
    height: 20rem;
    background-size: cover;
    }
</style>

