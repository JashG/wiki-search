import axios from 'axios'
import ep from '../store/endpoint'
import pr from '../store/pagerank'

var store = {}

export default store

// User's query
store.query = ''
// Data about articles returned from open query
store.pages = []
// Trending articles
store.trending = []


// State of our application

// Has the open search request completed?
store.searchComplete = false
// Has the page rank calculation completed?
store.pageRankComplete = true
// Has the request for trending articles completed?
store.trendingComplete = false

store.setQuery = function(query) {
  store.query = query.trim()
}

store.makeOpenSearch = function(query) {
  store.searchComplete = false

  if (store.pages.length > 0) {
    store.pages = []
  }

  if (query.length <= 0 || query.length > 50) {
    return
  }

  var queryEndpoint = ep.query + store.query

  return axios.get(queryEndpoint).then(response => {
    store.parseQueryResponse(response)
  }).catch(rejection => {
    console.log(rejection)
  })
}

store.parseQueryResponse = function(response) {
  var data = response.data
  for (var i = 0; i < data[1].length; i++) {
    store.pages[i] = {
      title: data[1][i],
      description: data[2][i],
      link: data[3][i],
    }
  }
}

store.getPageLinks = function() {
  store.pages.forEach(page => {
    var linksEndpoint = ep.links + page.title

    axios.get(linksEndpoint).then(response => {
      page.links = response.data.parse.links
    }).catch(rejection => {
      console.log(rejection)
    })
  })
}

store.initPageRank = function() {
  pr.initMatrices(store.pages.length)
  pr.generateAdjacencyMatrix(store.pages)
  pr.generateStochasticMatrix()
}

store.hasArticles = function() {
  return store.pages.length > 0
}

store.getLatestTrendingArticles = function() {
  var yesterday = store.yesterday()
  var query = ep.trends + yesterday

  return axios.get(query).then(response => {
    try {
      // Get up to the top 50 trending articles
      store.trending = response.data.items[0].articles.slice(0, 50)
    } catch {
      console.log('No trending articles available')
    }
  }).catch(rejection => {
    console.log(rejection)
  })
}

store.yesterday = function() {
  var yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  var year = yesterday.getFullYear()
  // In js, months are 0-indexed
  var month = yesterday.getMonth() + 1
  var day = yesterday.getDate()

  if (month < 10) {
    month = '0' + month.toString()
  }
  if (day < 10) {
    day = '0' + day.toString()
  }

  return year + '/' + month + '/' + day 
}

store.hasTrendingArticles = function() {
  return store.trending.length > 0
}