<template>
  <nav v-if="shouldShow">
    <ul class="pagination">

      <!-- prev arrows -->
      <li :class="{'page-item':true, 'disabled': isAtFirstPage}">
        <a class="page-link" href="#"
          @click.prevent="clickedPage(currentPage-1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <!-- pages -->
      <li v-for="page in pagesToShow" :key="page"
        :class="{'page-item':true, 'active':page===currentPage}">
        <a class="page-link" href="#"
          @click.prevent="clickedPage(page)">
          {{page}}
        </a>
      </li>

      <!-- next arrows -->
      <li :class="{'page-item':true, 'disabled': isAtLastPage}">
        <a class="page-link" href="#"
          @click.prevent="clickedPage(currentPage+1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>

    </ul>
  </nav>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  props: {
    maxNumberOfPages: {
      type: Number,
      default: 7
    }
  },

  computed: {
    ...mapState({
      currentPage: (state) => state.currentPage,
      pages: (state) => state.totalPages
    }),
    shouldShow () {
      return this.pages > 1
    },
    isAtFirstPage () {
      return this.currentPage === 1
    },
    isAtLastPage () {
      return this.currentPage === this.pages
    },
    pagesToShow () {
      const halfMaxPages = Math.floor(this.maxNumberOfPages/2)
      let pageArray = []
      let pageCounter = Math.max(this.currentPage-halfMaxPages, 1)
      while (pageArray.length < this.maxNumberOfPages &&
        pageCounter <= this.pages) {
        pageArray.push(pageCounter)
        pageCounter++
      }
      return pageArray
    }
  },

  methods: {
    clickedPage (page) {
      this.fetchPage(page)
      this.scrollToTop()
    },
    scrollToTop () {
      window.scrollTo(0, 0)
    },
    ...mapActions({
      fetchPage: 'fetchPage'
    })
  }
}
</script>