<template>
  <div id="trending-article">
    <div class="big-list">
      <a class="list-header"> {{ rank + '. ' + formatTitle(title) }} </a>
      <br/>
      <a class="list-text link" v-bind:href="'//' + this.getLink()" target="_blank">Link</a>
      <a class="list-text" id="list-text-1">Views: {{ views }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrendingArticle',

  data() {
    return {
      // none
    }
  },

  props: {
    rank: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    views: {
      type: Number,
      default: 0
    },
    link: {
      type: String,
      default: 'en.wikipedia.org/wiki/'
    }
  },

  methods: {
    getLink() {
      return this.link + this.title
    },

    formatTitle(title) {
      return title.replace(/_/g, " ");
    }
  }

}
</script>

<style>

.list-header {
  font-size: 20px;
  color: #2c3e50;
}

.list-text {
  color: #2c3e50;
}

.list-text.link {
  text-decoration: underline;
}

  .list-text.link:hover {
    color: rgb(10, 227, 122);
  }

#list-text-1 {
  padding-left: 60px;
}

</style>
