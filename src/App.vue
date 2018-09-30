<template>
  <div id="app">
    <header>
      <h1>The Picture Gallery Grid</h1>
      <h3>Author - Shamil Magomadov</h3>
    </header>
    <section>
      <article>
        <PictureGallery></PictureGallery>
        <!-- Scalable Test 
        <div v-for="i in 9" :key="i.id">
          <PictureGallery></PictureGallery>
        </div>-->
        <h2>It also has a responsive loading icon</h2>
        <Loader></Loader>
      </article>
    </section>
  </div>
</template>

<script>
import PictureGallery from "./components/PictureGallery.vue"
import Pictures from "./services/api/Pictures"
import Loader from "./components/Loader.vue"
export default {
  name: 'app',
  data () {
    return { 

    }
  },
  components: {
    PictureGallery,
    Loader
  },
}
</script>
m,
<style>
#app {
  text-align:center;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
#app header {
  border-bottom: 1px solid black;
  line-height: 50px;
  margin-bottom: 50px;
}
#app section article h2 {
  font-size: 2.5vw;
  margin: 50px;

}
body {
  background-color:whitesmoke;
}



</style>
