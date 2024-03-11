<template>
  <div class="black-background content">
    <NavBar />
  </div>
  <router-view />
</template>

<script>
import NavBar from './components/NavBar.vue'
export default {
  components: {
    NavBar
  }
}
</script>
<style>
.black-background{
  position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, #1d1c1c 0%, #000000 100%);
      z-index: -1;
    
}
body {
  margin: 0;
  font: normal 75% Arial, Helvetica, sans-serif;
}

canvas {
  display: block;
  vertical-align: bottom;
}

#particles-js {
  position: fixed;
  width: 100%;
  height: 100vh !important;
  background-position: 50% 50%;
}

.count-particles {
  background: #000022;
  position: absolute;
  top: 48px;
  left: 0;
  width: 80px;
  font-size: .8em;
  text-align: left;
  text-indent: 4px;
  line-height: 14px;
  padding-bottom: 2px;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: bold;
}

.js-count-particles {
  font-size: 1.1em;
}

#stats,
.count-particles {
  -webkit-user-select: none;
  margin-top: 5px;
  margin-left: 5px;
}

#stats {
  border-radius: 3px 3px 0 0;
}

.count-particles {
  border-radius: 0 0 3px 3px;
}


</style>