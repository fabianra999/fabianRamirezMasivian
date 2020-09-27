<template>
  <div>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-icon small v-on="on" @click="seePDF(dialogPdfDataComp)">print</v-icon>
      </template>
      <span>Imprimir Póliza.</span>
    </v-tooltip>

    <v-tooltip left>
      <v-icon small @click="seePDF(dialogPdfDataComp)">print</v-icon>
      <span>Imprimir Póliza.</span>
    </v-tooltip>
    <v-dialog v-model="dialogPdf" width="80%">
      <v-card>
        <v-card-title class="headline lighten-2" primary-title>{{labelTitle}}</v-card-title>
        <v-card-text v-if="stateSeePdf">
          <object
            type="application/pdf"
            :data="'data:application/pdf;base64, ' + pdfData + '#zoom=100&scrollbar=1&toolbar=1&navpanes=1'"
            trusted="yes"
            application="yes"
            style="width: 100%;   min-height: 60vh;"
          ></object>
          <!-- <pdf :src="'data:application/pdf;base64, ' + pdfData"></pdf> -->
        </v-card-text>
        <!-- <p><pre>{{$store.state.pdfGenerateStore.temporaryPDF.pdfData}}</pre></p> -->
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="sbs" text @click="downloadPDF(pdfData, 'test.pdf')">Descargar PDF</v-btn>
          <!-- <v-btn color="sbs" text @click="stateSeePdf = true">Ver PDF</v-btn> -->
          <v-btn color="sbs" text @click="dialogPdf = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { createHelpers } from "vuex-map-fields";
import { mapState } from "vuex";
import store from "@/store";
import pdf from "vue-pdf";
import pdfMixins from "@/mixins/pdf_mixins.js";

const { mapFields } = createHelpers({
  getterType: "pdfGenerateStore/getField",
  mutationType: "pdfGenerateStore/updateField",
});

export default {
  name: "DialogsPDF",

  props: {
    labelTitleComp: {
      type: String,
      default: "Poliza PDF",
    },
    dialogPdfDataComp: {
      type: Object,
    },
  },

  components: {
    pdf,
  },
  data() {
    return {
      dialogPdf: false,
      stateSeePdf: false,
      labelTitle: this.labelTitleComp,
      dialogPdfData: this.dialogPdfDataComp,
    };
  },

  computed: {
    ...mapFields({
      pdfData: "temporaryPDF.pdfData"
    })
  //  pdfData(){
  //    return store.state.pdfGenerateStore.temporaryPDF.pdfData;
  //  }
   
  },
  methods: {},
  watch: {},
  created: function () {},
  mounted() {
    this.$emit("inputValuess", this.dialogPdfData);
  },

  mixins: [pdfMixins],
};
</script>

<style lang="scss" scoped>
/****** layouts ******/
//@import "~@/assets/styles/layouts/form";
</style>
