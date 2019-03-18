<template>
  <div id="search-results">

    <div class="search-bar results container">
      <div class="row justify-content-end">
        <div class="text-container results col-sm-3">
          <h2 class="title-text results">wiki-</h2>
          <h2 class="title-text alternate results">search</h2>
        </div>
        <div class="col-sm-6">
          <input class="search-input dark search-icon" type="search" v-model="Store.query" placeholder="Enter topic..."
                 maxlength="50"/>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>

    <div class="articles">
      <div v-if="Store.searchComplete && Store.query.length > 0" class="articles-container">
        <div v-show="!Store.pageRankComplete">
          <h3>Gathering articles...</h3>
        </div>
        <div v-show="Store.pageRankComplete">
          <div v-if="!Store.hasArticles()">
            <h3 style="color: white;">No articles found :(</h3>
          </div>
          <div v-else>
            <p style="color: white;">Articles found!</p>
            <div v-for="page in displayedPosts" :key="page.title" class="col-md-6 offset-md-3 articles-list">
              <a :href="page.link" class="results-title"><p v-text="page.title"></p></a>
              <p class="results-text green" v-text="page.link"></p>
              <p class="results-text" v-text="page.description"></p>
              <hr style="background-color: rgb(75, 75, 75);"/>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="articles-container">
        <div v-if="Store.query.length > 0">
          <div class="spinner-border text-success" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <span class="text-success" style="padding-left: 10px;">Searching for articles...</span>
        </div>
        <div v-else>
          <span class="text-success">Try searching for a topic!</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Store from '../store/index'

export default {
  name: 'SearchResults',

  data() {
    return {
      Store,
      query: {
        type: String,
        default: ''
      },
      page: {
        type: Number,
        default: 1
      },
      perPage: {
        type: Number,
        default: 10
      },
      pageNums: {
        type: Array,
        default: []
      }
    }
  },

  methods: {
    setPages () {
      let numPages = Math.ceil(Store.pages.length / this.perPage);
      for (let index = 1; index <= numPages; index++) {
        this.pageNums.push(index);
      }
    },

    paginate(articles) {
      if (articles.length === 0) {
        return
      }
      let page = this.page.default;
      let perPage = this.perPage.default;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return articles.slice(from, to);
    }
  },

  computed: {
    displayedPosts() {
      return this.paginate(Store.pages)
    }
  },

  created() {
    try {
      Store.makeOpenSearch(Store.query).then(response => {
        Store.searchComplete = true
      })
    } catch {
      Store.searchComplete = true
    }
  }

}
</script>

<style>

.search-bar.results {
  margin-top: 20px;
  display: inline-block;
  text-align: center;
  width: 100%;
}

.text-container.results {
  display: inline-block;
}

.text-container.results > .title-text {
  font-size: 26px;
  overflow: hidden;
  white-space: nowrap;
}

.search-input.dark {
  background-color: rgb(75, 75, 75);
  box-shadow: none;
  border: solid 1px transparent;
  color: white;
  width: 600px;
}

  .search-input.dark:active,
  .search-input.dark:focus {
    border: solid 1px white;
  }

.col {
  display: inline-block;
}

.articles-list {
  text-align: left;
  padding-bottom: 20px;
}

a.results-title {
  text-decoration: underline;
  color: white;
  font-size: 26px;
}

  a.results-title:hover {
    text-decoration: underline;
    color: rgb(10, 227, 122);
  }

  .results-title > p {
    margin: 0;
  }

  .results-title > p:hover {
    text-decoration: underline;
    color: white;
  }

.results-text {
  color: white;
}

.results-text.green {
  color: rgb(7, 148, 80);
  margin-bottom: 2px;
}

</style>
