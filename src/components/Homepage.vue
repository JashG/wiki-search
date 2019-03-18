<template>
  <div id="homepage">
    <div class="title-container">
      <div class="text-container">
        <h2 class="title-text">wiki-</h2>
        <h2 class="title-text alternate">search</h2>
      </div>
    </div>
    
    <div class="search-bar">
      <input class="search-input" type="search" v-model="search.value" placeholder="Enter topic..."
             maxlength="50"/>
      <div class="search-btns">
        <router-link :to="{name: 'search', query: {search: search.value}}">
          <button class="btn btn-success front-page" type="submit"
                  @click="Store.setQuery(search.value)">Search</button>
        </router-link>
      </div>
    </div>

    <trends />
  </div>
</template>

<script>
import Store from '../store/index'
import TrendingList from './TrendingList'

export default {
  name: 'Hompage',

  components: {
    trends: TrendingList
  },

  data() {
    return {
      Store,
      search: {
        type: String,
        default: ''
      }
    }
  }

}
</script>

<style>

.title-container {
  margin-top: 175px;
}

.text-container {
  margin-bottom: 25px;
}

.title-text {
  display: inline;
  font-family: 'Rubik', sans-serif;
  color: white;
  font-size: 60px;
}

.title-text.alternate {
  color: rgb(10, 227, 122);
}

.search-box {
  text-align: center;
}

.search-input {
  padding-left: 10px;
  height: 42px;
  width: 500px;
  min-width: 100px;
  border: none;
  border-radius: 6px;
  box-shadow: 0px 0px 5px darkgrey;
  transition: ease-in-out 0.2s;
}

@media all and (max-width: 900px) {
  .search-input {
    max-width: 450px;
  }
}

@media all and (max-width: 767px) {
  .search-input {
    margin-left: 30px;
  }
}

@media all and (max-width: 715px) {
  .search-input {
    max-width: 350px;
  }
}

@media all and (max-width: 600px) {
  .search-input {
    max-width: 300px;
  }
}

  .search-input:hover {
    box-shadow: 0px 0px 12px darkgrey;
  }

  .search-input:focus {
    outline: none;
    background-color: rgb(75, 75, 75);
    box-shadow: none;
    color: white;
  }

.search-btns {
  margin-top: 17px;
  margin-bottom: 17px;
}

</style>
