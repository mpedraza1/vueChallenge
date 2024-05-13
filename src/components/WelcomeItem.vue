<template>
  <div v-if="data" class="row">
    <div v-for="(d, i) in data" :key="i" class="col-4 d-flex align-items-stretch">
      <div class="card mt-4" style="width: 18rem;">
        <img :src="d.banco && d.banco.imagen ? d.banco.imagen : 'https://thumbs.dreamstime.com/z/no-image-available-icon-vector-illustration-flat-design-140476186.jpg?ct=jpeg'" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">{{ d.banco && d.banco.nombre ? d.banco.nombre : 'Nombre del Banco No Disponible' }}</h5>
          <p class="card-text">
            <strong v-if="d.costoTotal">{{ 'Costo total: ' }}</strong><i>{{ d.costoTotal }}</i><br>
            <strong v-if="d.gastosOperacionales">{{ 'Gastos operacionales: ' }}</strong><i>{{ d.gastosOperacionales }}</i><br>
            <strong v-if="d.tasaDeInteres">{{ 'Tasa de interés: ' }}</strong><i>{{ d.tasaDeInteres }}</i><br>
          </p>
      </div>
      <div v-if="d.caracteristicas" class="mb-2">
          <ul class="list-group list-group-flush">
              <template v-if="Array.isArray(d.caracteristicas)">
                <li class="list-group-item"v-for="(linea, index) in d.caracteristicas.slice(0, 1)" :key="index">{{ linea }}</li>
              </template>
              <template v-else>
                <li class="list-group-item">{{ d.caracteristicas }}</li>
              </template>
            </ul>
          </div>
          <a @click="$emit('calcularPorBanco', (d.tasaDeInteres) ? d.tasaDeInteres : null)" class="btn btn-primary">Calcular con {{ d.banco && d.banco.nombre ? d.banco.nombre : 'Banco' }}</a>
      
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  emits: ['calcularPorBanco'],
  data() {
    return {
   
    };
  },
  computed: {
    ...mapGetters({
      data: 'getApiResponse'
    })
  },
  methods: {

  }
};
</script>

<style scoped>
.card-img-top {
  max-height: 180px;
}

</style>
