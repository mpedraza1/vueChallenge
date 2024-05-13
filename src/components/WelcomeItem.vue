<template>
  <div v-if="data" class="row">
    <div v-for="(d, i) in data" :key="i" class="col-4 d-flex align-items-stretch">
      <div class="card" style="width: 18rem;">
        <h5 class="card-title">{{ d.banco.nombre }}</h5>
        <img :src="(d.banco.imagen) ? d.banco.imagen : 'https://thumbs.dreamstime.com/z/no-image-available-icon-vector-illustration-flat-design-140476186.jpg?ct=jpeg'" class="card-img-top" alt="...">
        <div class="card-body">
          <strong v-if="d.costoTotal">{{ 'Costo total: ' }}</strong><i>{{ d.costoTotal }}</i><br>
          <strong v-if="d.gastosOperacionales">{{ 'Gastos operacionales: ' }}</strong><i>{{ d.gastosOperacionales }}</i><br>
          <strong v-if="d.tasaDeInteres">{{ 'Tasa de interés: ' }}</strong><i>{{ d.tasaDeInteres }}</i><br>
          <div v-if="d.caracteristicas">
            <strong>Caracteristicas:</strong>
            <ul>
              <template v-for="(linea, index) in d.caracteristicas">
                <li v-if="index < 3">{{ linea.substring(0,50)+'..' }}</li>
                <li v-else v-show="showMore"> <!-- Mostrar solo si se hace clic en mostrar más -->
                  {{ linea.substring(0,50)+'..' }}
                </li>
              </template>
            </ul>
            <button @click="toggleShowMore" v-if="d.caracteristicas.length > 3">
              {{ showMore ? 'Mostrar menos' : 'Mostrar más' }}
            </button>
          </div>
        </div>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      showMore: false // Estado para controlar si se muestra más contenido
    };
  },
  computed: {
    ...mapGetters({
      data: 'getApiResponse'
    })
  },
  methods: {
    toggleShowMore() {
      this.showMore = !this.showMore;
    }
  }
};
</script>

<style scoped>
.card-img-top {
  max-height: 180px;
}
</style>
