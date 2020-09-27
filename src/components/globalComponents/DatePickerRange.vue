<template>
  <div>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
      :return-value.sync="date"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="computedDateFormatted"
          :label="labelName"
          :hint="hintText"
          :error="errors"
          :error-messages="errorMsg"
          @input="errorMessage;"
          persistent-hint
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" range no-title locale="es" color="sbs">
        <v-spacer></v-spacer>
        <v-btn text color="sbs" @click="menu = false">Cancelar</v-btn>
        <v-btn text color="sbs" @click="$refs.menu.save(date), $emit('eventDate', computedDateFormatted)">Bien</v-btn>
      </v-date-picker>
    </v-menu>
  </div>
</template>
<script>
import { createHelpers } from "vuex-map-fields";
import { mapState } from "vuex";
import store from "@/store";
import DatePickers from "@/components/globalComponents/DatePickers.vue";

const { mapFields } = createHelpers({
  getterType: "formPropertyStore/getField",
  mutationType: "formPropertyStore/updateField"
});

export default {
  name: "DatePickerRange",
  props: [
    "labelName",
    "hintText",
    "inputValue",
    "inputValueDate",
    "requiredInput",
    "inputNameSync"
  ],

  components: {
    DatePickers
  },

  data: vm => ({
    date: [],
    // date: ["2019-09-10", "2019-09-20"],
    // date: ["15/04/2020", "20/04/2020"],
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu: false,
    errors: false,
    errorMsg: ""
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    errorMessage() {
      if (this.requiredInput != true) {
        this.errors = false;
        this.errorMsg = "";
        return false;
      } else {
        this.errorMsg = "El campo es requerido.";
        this.errors = true;
        return true;
      }
    }
  },

  watch: {
    date(val) {
      // this.dateFormatted = this.formatDate(this.date);
      this.$emit("inputValueDate", this.dateFormatted);
    }
  },

  methods: {
    formatDate(date) {
      if (!date) return null;
      if (Array.isArray(date)) {
        let dataArray = [];
        date.sort();
        for (let item in date) {
          const [year, month, day] = date[item].split("-");
          dataArray.push(`${day}/${month}/${year}`);
        }
        return dataArray.join(" ~ ");
      }
    },
    parseDate(date) {
      if (!date) return null;
      if (Array.isArray(date)) {
        let dataArray = [];

        for (let item in date) {
          const [day, month, year] = date.split("/");
          dataArray.push(
            `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
          );
        }
        return dataArray;
      }
    }
  },
  created: function() {
    // this.date = this.parseDate(this.inputValue);
    this.dateFormatted = this.formatDate(this.date);
  },

  mounted() {
    this.$emit("inputValue", this.date);
  }
};
</script>

<style lang="scss" scoped>
/****** layouts ******/
//@import "~@/assets/styles/layouts/form";
</style>
