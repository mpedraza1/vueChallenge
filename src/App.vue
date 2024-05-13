<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>

    <div class="wrapper">
      <div class="col-4 offset-8 mt-4" >
          <h3>SIMULADOR</h3>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
h3{
  color: aliceblue;
}
</style>
