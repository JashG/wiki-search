<template>
  <div id="trending-list">
    <div class="square-bg translucent">
      <!-- <div style="display:inline-block; padding-top: 30px;">
        <h3 class="light block" id="h3-block-1">Top</h3>
        <select class="selector" v-model="selected">
          <option class="selected" value="5">5</option>
          <option class="selected" value="10">10</option>
          <option class="selected" value="25">25</option>
          <option class="selected" value="50">50</option>
        </select>
      </div> -->
      <div style="display:inline-block; padding: 30px 0 10px 0;">
        <span>
          <h3 class="dark block" id="h3-block-2">Trending Articles from the past 24 hours</h3>
        </span>
      </div>
      <div v-if="Store.hasTrendingArticles() && Store.trendingComplete">
        <div style="display: inline-block;">
          <button @click="prevPage()"> Left </button>
        </div>
        <div class="list-group" id="trending-block" style="display: inline-block;">
          <a v-for="(article, idx) in getTrendingPaginated" :key="idx" class="list-group-item">
            <trending :rank="article.rank" :title="article.article" :views="article.views"/>
          </a>
        </div>
        <div style="display: inline-block;">
          <button @click="nextPage()"> Right </button>
        </div>
      </div>

      <div v-else>
        <p style="color: white;">No articles found!</p>
      </div>
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
      currentPage: 0,
      perPage: 5,
      selected: 5,
      totalArticles: {
        type: Number,
        default: 0
      }
    }
  },

  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage += 1
      }
    },

    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage -= 1
      }
    }
  },

  computed: {
    getTrendingPaginated: function() {
      var startIdx = this.currentPage * this.perPage
      console.log(startIdx)
      return Store.trending.slice(startIdx, startIdx + 5)
    },

    totalPages: function() {
      return Math.ceil(this.totalArticles / this.perPage)
    }
  },

  created() {
    try {
      Store.getLatestTrendingArticles().then(response => {
        Store.trendingComplete = true
        this.totalArticles = Store.trending.length
      })
    } catch {
      Store.trendingComplete = true
    }
  }
}
</script>

<style>

#trending-list {
  padding-bottom: 20px;
  text-align: center;
  background-color: white;
}

.square-bg {
  display: inline-block;
  padding: 0 10px 10px 10px;
}

h3.light {
  color: white;
}

h3.dark {
  color: rgb(75, 75, 75);
}

h3.block {
  display: inline-block;
}

#h3-block-1 {
  padding-right: 10px;
}

#h3-block-2 {
  padding-left: 10px;
}

.selector {
  width: 55px;
  height: 30px;
  border-radius: 0;
  border: none;
  background-color: transparent;
  color: white;
  font-size: 23.8px;
}

.list-group {
  display: inline-block;
  padding-top: 10px;
}

#trending-block { 
  width: 550px;
}

@media all and (max-width: 600px) {
  #trending-block {
    width: 450px;
  }
}

@media all and (max-width: 500px) {
  #trending-block {
    width: 350px;
  }
}

.list-group-item {
  text-align: left;
}

</style>
