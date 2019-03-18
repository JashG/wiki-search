<template>
  <div id="trending-list">
    <span>
      <h3 style="color: white;">Trending Articles from the past 24 hours</h3>
    </span>
    <div style="display: inline;">
      <span>
        <a style="color: white;">Number of articles to display:  </a>
      </span>
      <select v-model="selected">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>
    </div>
    <div v-if="Store.hasTrendingArticles() && Store.trendingComplete">
      <div class="list-group">
        <a v-for="(article, idx) in getTrendingPaginated" :key="idx" class="list-group-item">
          <trending :rank="article.rank" :title="article.article" :views="article.views"/>
        </a>
      </div>
    </div>

    <div v-else>
      <p style="color: white;">No articles found!</p>
    </div>
  </div>
</template>

<script>
import Store from '../store/index'
import TrendingArticle from './TrendingArticle'

export default {
  name: 'TrendingList',

  components: {
    trending: TrendingArticle
  },

  data() {
    return {
      Store,
      articles: {
        type: Array,
        default: []
      },
      currentPage: 1,
      perPage: 5,
      selected: 5
    }
  },

  methods: {
    nextPage() {
      if (this.currentPage < totalPages()) {
        this.currentPage += 1
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage =- 1
      }
    }
  },

  computed: {
    getTrendingPaginated() {
      return Store.trending.slice(0, this.selected)
    },
    
    totalPages() {
      return Store.trending.length / this.perPage
    },

    totalArticles() {
      return this.currentPage * this.perPage
    }
  },

  created() {
    try {
      Store.getLatestTrendingArticles().then(response => {
        Store.trendingComplete = true
      })
    } catch {
      Store.trendingComplete = true
    }
  }
}
</script>

<style>

#trending-list {
  margin-top: 65px;
}

.list-group {
  display: inline-block;
  padding-top: 10px;
}

.list-group-item {
  text-align: left;
}

</style>
