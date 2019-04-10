<template>
   <div id="navbar">
     <nav class="navbar navbar-expand-lg navbar-light navbar-fixed-top nav-white">
      <a class="navbar-brand">wiki-tools</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <router-link :to="{name: 'default'}">
            <li class="nav-item active">
              <a class="nav-link main">
                Search <span class="sr-only">(current)</span></a>
            </li>
          </router-link>
        </ul>
        <ul class="navbar-nav">
          <router-link :to="{name: 'discover'}">
            <li class="nav-item active">
              <a class="nav-link main">
                Discover <span class="sr-only">(current)</span></a>
            </li>
          </router-link>
        </ul>
      </div>
    </nav>
   </div>
</template>

<script>
export default {
  name: 'TheNavbar',

  data() {
    return {

    }
  }

}
</script>

<style>

a {
  color: #2c3e50;
}

  a:hover {
    text-decoration: none;
  }

/** Applied to navbar text when that page is active */
.router-link-exact-active > li.nav-item > a.nav-link.main {
  font-weight: 600;
  color: rgb(10, 227, 122);
}

.router-link-exact-active > li.nav-item > a.nav-link.main:hover {
  text-decoration: none;
}

.navbar.navbar-expand-lg.navbar-light.nav-white {
  background-color: white;
}

.nav-link.main {
    text-decoration: none; 
    position: relative;
  }   

  .nav-link.main:after {
    position: absolute;
    content: '';
    height: 3px;
    bottom: 2px; 
    margin: 0 auto;
    left: 0;
    right: 0;
    width: 50%;
    -o-transition:0.3s;
      -ms-transition:0.3s;
      -moz-transition:0.3s;
      -webkit-transition:0.3s;
      transition:0.3s;
  }

  @media all and (max-width: 991px) {
    .nav-link.main:after {
      width: 15%;
    }
  }

  .nav-link.main:hover:after {
    width: 80%;
    background: rgb(10, 227, 122);
  }

  /** When menu shrinks, relative width of underline should shrink as well */
  @media all and (max-width: 991px) {
    .nav-link.main:hover:after {
      width: 5%;
      background: rgb(10, 227, 122);
    }
  }

</style>
