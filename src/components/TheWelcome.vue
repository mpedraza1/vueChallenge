<template>
  <div class="col-12">
    <form  id="app"
          @submit="checkForm"
          novalidate="true">
      <div class="row">
        <div class="col-6">
          <label>Valor de la Propiedad</label>
          <div class="input-group mb-3">
            <input  type="text" 
                    v-model="form.propertyValue" 
                    class="form-control" 
                    placeholder="Recipient's username" 
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2">
            <div class="input-group-append">
              <span class="input-group-text" id="basic-addon2"><strong>UF</strong></span>
            </div>
          </div>
        </div>
        <div class="col-6">
          <label>Pie</label>
          <div class="input-group mb-3">
            <input  type="text" 
                    v-model="form.at" 
                    class="form-control" 
                    placeholder="Recipient's username" 
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2">
            <div class="input-group-append">
              <span class="input-group-text" id="basic-addon2"><strong>UF</strong></span>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <label>Tasa de interés (% Anual)</label>
          <div class="input-group mb-3">
            <input type="text" 
                    v-model="form.interest" 
                    class="form-control" 
                    placeholder="Recipient's username" 
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2">
            <div class="input-group-append">
              <span class="input-group-text" id="basic-addon2"><strong>%</strong></span>
            </div>
          </div>
        </div>
        <div class="col-6">
          <label>Plazo de pago (Años)</label>
          <select class="form-select" v-model="form.selectedYear" aria-label="Default select example">
            <option disabled value="">Seleccionar periodo</option>
            <option v-for="year in form.years" :key="year" :value="year">
              {{ year + ' Años' }}
            </option>
          </select>
        </div>
      </div>
      <div>
        <div class="row" v-if="(monthly && income)">
    <hr/>
    <div class="col-4">
        <strong>Dividendo mensual : {{ new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(monthly) }}</strong>
    </div>
    <div class="col-4 offset-2">
        <strong>Renta mínima : {{ new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(income) }}</strong>
    </div>
    <hr/>
</div>

      </div>
      <div class="col-auto">
      <button type="submit"  class="btn btn-primary mb-3"
      v-bind:disabled="isLoading"> <i>Calcular dividendo</i>   
      </button>      
      <p v-if="errors.length">
          <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
      </p>
  <span class="loader push-right" v-if="isLoading"></span>
  <WelcomeItem @calcularPorBanco="calcularPorBanco"/>
  </div>
    </form>
  </div>

</template>
<script>
import { computed } from 'vue';
import { mapActions, mapGetters } from 'vuex'
import WelcomeItem from './WelcomeItem.vue'

export default {
  data() {
    return {
      // Definición de las variables vinculadas a los campos de entrada del formulario
      form:{
        propertyValue:"",
        at:"",
        interest:5,
        selectedYear:"",
        years: [
          "5",
          "10",
          "15",
          "20",
          "25",
          "30"
        ]
      },
      errors: [],
      monthly:null,
      income:null,
      monthsPeerYear:12,
      ufValue:38000
    };
  },
  computed: {
    ...mapGetters({
      isLoading:"getIsLoading",
      data:"getApiResponse"
    })
    
  },
  methods: {
    calcularPorBanco(interest){
      console.log(typeof interest, "type")
      let porcentaje_sin_porcentaje = interest.replace('%', ''); // Eliminar el símbolo "%"
      let porcentaje_numero = parseFloat(porcentaje_sin_porcentaje);

      let valorFinalPropiedad = parseInt(this.form.propertyValue) - parseInt(this.form.at)
      console.log(valorFinalPropiedad); 
      let valorEnPesos = valorFinalPropiedad * this.ufValue
      console.log(valorEnPesos);
      let cuotas = parseInt(this.form.selectedYear) * 12
      console.log(cuotas);
      let dividendoSinIntereses = valorEnPesos / cuotas
      console.log(dividendoSinIntereses);
      let tasa = (dividendoSinIntereses * parseInt(porcentaje_numero)) / 100
      console.log(tasa);
      this.monthly = dividendoSinIntereses + tasa    
      
      this.income = this.monthly * 4
    },
    calcularDividendo(){
      let valorFinalPropiedad = parseInt(this.form.propertyValue) - parseInt(this.form.at)
      console.log(valorFinalPropiedad); 
      let valorEnPesos = valorFinalPropiedad * this.ufValue
      console.log(valorEnPesos);
      let cuotas = parseInt(this.form.selectedYear) * 12
      console.log(cuotas);
      let dividendoSinIntereses = valorEnPesos / cuotas
      console.log(dividendoSinIntereses);
      let tasa = (dividendoSinIntereses * parseInt(this.form.interest)) / 100
      console.log(tasa);
      this.monthly = dividendoSinIntereses + tasa    
      
      this.income = this.monthly * 4
      this.api(this.form)
    },
    ...mapActions({
    api : 'apiCall'
  }),
  checkForm: function (e) {
    e.preventDefault();
      this.errors = [];
      if (!this.form.propertyValue) {
        this.errors.push("El nombre valor de la propiedad es obligatorio.");
      }
      if (!this.form.at) {
        this.errors.push('El pie es obligatorio.');
      } else if (!this.form.interest) {
        this.errors.push('El interés debe ser válido.');
      } else if (!this.form.selectedYear) {
        this.errors.push('El plazo es obligatorio.');
      }
  
      if (!this.errors.length) {
        this.calcularDividendo()
        return true;
      }    
    }
  },
  components: {
    WelcomeItem
  },

}
</script>

<style>
.loader {
    width: 48px;
    height: 48px;
    border: 5px solid #0064bb;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
</style>