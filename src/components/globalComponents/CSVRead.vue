<template>
  <div>
    <v-row>
      <v-col>
        <input
          type="file"
          id="csv_file"
          name="csv_file"
          class="form-control"
          @change="loadCSV($event)"
        />
        <v-btn small @click="testEvent">Normal</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="parse_csv">
      <v-col>
        <v-data-table
          locale="es"
          :headers="parse_header"
          :items="parse_csv"
          :items-per-page="25"
          outlined
          :footer-props="{
    'items-per-page-options': [10, 25, 50, 100]
  }"
        ></v-data-table>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      channel_name: "",
      channel_fields: [],
      channel_entries: [],
      parse_header: [],
      parse_csv: [],
      sortOrders: {},
      sortKey: "",
      yea123: [],
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "ID CARGA",
        },
        { text: "Calories", value: "NUMERO REGISTRO" },
        { text: "Fat (g)", value: "NUMERO ERROR" },
        { text: "Carbs (g)", value: "DESCRIPCION ERROR" },
        { text: "Protein (g)", value: "SQL ERROR\r" },
      ],
    };
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },

  methods: {
    sortBy: function (key) {
      var vm = this;
      vm.sortKey = key;
      vm.sortOrders[key] = vm.sortOrders[key] * -1;
    },
    csvJSON(csv) {
      let vm = this,
        lines = csv.split("\n"),
        result = [],
        headers = lines[0].split(","),
        headerArray = lines[0].split(",");
      lines[0].split(",").forEach(function (key) {
        vm.sortOrders[key] = 1;
      });

      for (const items of headerArray) {
        let newObject = new Object();
        newObject.value = items;
        newObject.text = items;
        this.parse_header.push(newObject);
      }

      lines.map(function (line, indexLine) {
        if (indexLine < 1) return; // Jump header line
        let obj = {},
          currentline = line.split(",");
        headers.map(function (header, indexHeader) {
          obj[header] = currentline[indexHeader];
        });
        result.push(obj);
      });
      result.pop(); // remove the last item because undefined values
      return result; // JavaScript object
    },
    loadCSV(e) {
      var vm = this;
      if (window.FileReader) {
        var reader = new FileReader();
        reader.readAsText(e.target.files[0]);
        // Handle errors load
        reader.onload = function (event) {
          var csv = event.target.result;
          console.log(csv);
          vm.parse_csv = vm.csvJSON(csv);
        };
        reader.onerror = function (evt) {
          if (evt.target.error.name == "NotReadableError") {
            alert("Canno't read file !");
          }
        };
      } else {
        alert("FileReader are not supported in this browser.");
      }
    },

    testEvent() {
      let vsgTExt = `ID CARGA,NUMERO REGISTRO,NUMERO ERROR,DESCRIPCION ERROR,SQL ERROR
282,1,1,El numero de BSG 1909310000400000266190 ingresado ya se encuentra registrado para la novedad AP,N/A
282,2,2,No es posible almacenar la direccion CARRERA 90 39A 09 en nuestro sistema; ya que el departamento ANTIOQUIA no se encuentra relacionada en nuestra base de datos.,N/A
282,2,3,El numero de BSG 1909310000400000266208 ingresado ya se encuentra registrado para la novedad AP,N/A
282,3,4,No es posible almacenar la direccion KR 43 B 82 122 en nuestro sistema; ya que el departamento ATLANTICO no se encuentra relacionada en nuestra base de datos.,N/A
282,3,5,El numero de BSG 1910020200300000266222 ingresado ya se encuentra registrado para la novedad AP,N/A
282,4,6,No es posible almacenar la direccion CALLE 89 12 14 AP 303 en nuestro sistema; ya que el departamento BOGOTA D.C. no se encuentra relacionada en nuestra base de datos.,N/A
282,4,7,El numero de BSG 1910010200200000266203 ingresado ya se encuentra registrado para la novedad AP,N/A`;
      this.parse_csv = this.csvJSON(vsgTExt);
    },
  },
};
</script>
