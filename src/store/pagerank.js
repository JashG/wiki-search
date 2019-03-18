import math from 'mathjs'
var pagerank = {}

export default pagerank

// Probability that, at any step, a user will continue to click on an outgoing link
pagerank.dampingFactor = 0.75
// Network of links between each page in our query (1 = link; 0 = no link)
pagerank.adjacencyMatrix = math.matrix()
// Each row adds up to 1
pagerank.stochasticMatrix = math.matrix()

pagerank.initAdjacencyMatrix = function(size) {
  pagerank.adjacencyMatrix = math.zeros(size, size)
}

pagerank.initStochasticMatrix = function(size) {
  pagerank.stochasticMatrix = math.zeros(size, size)
}

pagerank.initMatrices = function(size) {
  pagerank.initAdjacencyMatrix(size)
  pagerank.initStochasticMatrix(size)
}

/**
 * Parameter represents articles in the form of an array of JSON objects; 
 * each object contains an array of incoming links ('links')
 */
pagerank.generateAdjacencyMatrix = function(articles) {
  var size = articles.length

  for (var i = 0; i < size / 2; i++) {
    for (var j = 0; j < size / 2; j++) {
      var titleToCheck = articles[i].title
      var links = articles[j].links

      if (links === undefined) {
        continue
      }

      var hasLink = pagerank.parseIncomingLinks(links, titleToCheck)

      if (hasLink) {
        pagerank.adjacencyMatrix.subset(math.index(j, i), 1)
      }
    }
  }
}

pagerank.generateStochasticMatrix = function() {
  var rowLen = pagerank.adjacencyMatrix.size()[0]
  var pFactor = (1 - pagerank.dampingFactor) / rowLen

  var rowTotal = []

  for (var i = 0; i < rowLen; i++) {
    rowTotal.push(0)
    for (var j = 0; j < rowLen; j++) {
      rowTotal[i] += pagerank.adjacencyMatrix.get([i, j])
    }
  }

  for (var i = 0; i < rowLen; i++) {
    for (var j = 0; j < rowLen; j++) {
      if (rowTotal[i] > 0) {
        pagerank.stochasticMatrix.subset(
          math.index(j, i), pagerank.adjacencyMatrix.get([i, j]) / rowTotal[i] + pFactor)
      } else {
        pagerank.stochasticMatrix.subset(
          math.index(j, i), 1/rowLen + pFactor)
      }
    }
  }
}

pagerank.parseIncomingLinks = function(incomingLinks, title) {
  for (let element of incomingLinks) {
    // '*' is used as the key for the value that represents an article's title
    if (element['*'] === title) {
      // console.log('Match. Title: ' + title)
      return true
    }
  }

  return false
}

