<template>
  <div>
    <FilePond
      name="test"
      ref="pond"
      label-idle="Arrastrar y Soltar Archivos <span class='filepond--label-action'> Explorar </span>"
      allow-multiple="true"
      v-bind:files="myFiles"
      v-on:init="handleFilePondInit"
    />
  </div>
</template>
<script>


import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

export default {
  name: "FileInput",
  props: [],
  components: {
    FilePond: vueFilePond(FilePondPluginImagePreview)
  },
  data() {
    return {
      myFiles: []
    };
  },
  methods: {
    handleFilePondInit: function() {
      console.log("FilePond has initialized");
      this.$refs.pond.getFiles();
    }
  },

  computed: {},

  watch: {},

  created: function() {},

  mounted() {}
};
</script>
