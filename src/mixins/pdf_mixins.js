import store from "@/store";
export default {
  methods: {
    downloadPDF(pdf, name = "file.pdf") {
      const linkSource = `data:application/pdf;base64,${pdf}`;
      const downloadLink = document.createElement("a");
      const fileName = name;

      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    },


    seePDF(item) {
      this.$emit("inputValuess", this.dialogPdfData);
      store
        .dispatch("pdfGenerateStore/generateHeaderPolicyPDF", {
          data: item
        })
        .then(
          response => {
            this.dialogPdf = true;
            this.stateSeePdf = false;

            setTimeout(() => {
              this.stateSeePdf = true;
            }, 1000);

            //  this.pdfData = store.pdfGenerateStore.headerPolicyList.pdf;
          },
          error => {
            this.$swal({
              position: "center",
              icon: "error",
              title: "Muy mal Error: " + error.data.status.code,
              text: error.data.status.message,
              showConfirmButton: false,
              timer: 2000
            });
          }
        );
    },

  },

};
