import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-rutas-cortas',
  templateUrl: './rutas-cortas.component.html',
  styleUrls: ['./rutas-cortas.component.css'],
})
export class RutasCortasComponent implements OnInit {
  public alphabet = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  public cantidadNodos: number = 0;
  public archivo: any = {};

  constructor() {}

  ngOnInit(): void {}

  calcularRutasCortas() {
    let matriz = [];
    let tabla: any = document.getElementById('tabla');
    for (let i = 1; i < tabla.rows.length; i++) {
      let columnas: any = [];
      for (let j = 1; j < tabla.rows[i].cells.length; j++) {
        const element = tabla.rows.item(i).cells.item(j);

        if (element.innerHTML == '∞') {
          columnas.push(Infinity);
        } else {
          columnas.push(parseInt(element.innerHTML));
        }
      }
      matriz.push(columnas);
    }
    let resultado = this.floyd(matriz);
    this.reemplazarDatosTabla(resultado);
    alert('Se ha calculado las rutas cortas');
  }

  reemplazarDatosTabla(matrizResultado: any) {
    for (let i = 1; i < matrizResultado.length; i++) {
      for (let j = 1; j < matrizResultado[i].length; j++) {
        let tabla: any = document.getElementById('tabla');
        let celda: any = tabla.rows.item(i).cells.item(j);
        if (matrizResultado[i][j] == Infinity) {
          celda.innerHTML = '∞';
        } else {
          celda.innerHTML = matrizResultado[i][j];
        }
      }
    }
  }

  floyd(tabla: any) {
    var n = tabla.length;
    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          let costo = tabla[i][k] + tabla[k][j];
          if (costo < tabla[i][j]) {
            tabla[i][j] = costo;
          }
        }
      }
    }
    return tabla;
  }

  onNameChange(e: any) {
    let headers = document.getElementsByClassName(e.target.classList.value);
    for (let i = 0; i < headers.length; i++) {
      const element = headers[i];
      element.innerHTML = e.target.innerHTML;
    }
  }

  getInputNodos(event: any) {
    this.cantidadNodos = parseInt(event.target.value);
  }

  formatTable(archivo:any) {

    let encabezados:any = document.getElementById("encabezados")
    for (let i = 0; i < archivo["encabezadoNodos"].length; i++) {
      let element:any = encabezados["children"][i]
      element.innerText = archivo["encabezadoNodos"][i]
      let headers = document.getElementsByClassName(element.className);
      let header:any = headers[1] 
      if(header!== undefined){
        header.innerText = archivo["encabezadoNodos"][i]
      }
    }
    

    let nodos = archivo["nodos"];
    for (let i = 0; i < nodos.length; i++) {
      Object.keys(nodos[i]).forEach((key) => {
        let arreglo = nodos[i][key];
        for (let j = 0; j < arreglo.length; j++) {
          let id = Object.keys(nodos[i][key][j])
          let element:any = document.getElementById(id[0])
          element.innerText = nodos[i][key][j][id[0]]
        }
      });
      
    }

      


    // document.getElementById("contenido")?.querySelectorAll("tr")
    // .forEach((row: any, index) => {
    //   let nodos = archivo["nodos"];
    //   let rowData:any = document.getElementById(row.id);
    //   let cols = rowData["children"];
    //   for (let i = 0; i < nodos.length; i++) {
        
    //     cols[i].innerText = nodos[i][cols[i].id]
        
    //   }

    //   // for (let i = 0; i < cols.length; i++) {
    //   //   cols[i].innerText = nodo[cols.id];
    //   // }
    //   // document.
    //   // getElementById(row.id)?
    //   // ["children"].
    //   // forEach((element: any) => {
    //   //   element.innerText = nodo[element.id]
    //   // }):null;  
    // });
    // archivo["nodos"]
  }

  handleFile(event: any) {
    var file = event.target.files[0];
    var reader = new FileReader();

    //Carga el archivo en una variable
    reader.onload = (event) => {
      this.archivo = JSON.parse(event.target?.result?.toString() || ''); // Convierte el archivo a JSON
    };

    reader.readAsText(file); //lee el archivo como texto
    setTimeout(() => {
      let input: any = document.getElementById('cantidadNodos');
      this.cantidadNodos = this.archivo.cantidadNodos;
      input.value = this.archivo.cantidadNodos;
    }, 300);
    setTimeout(() => {
      this.formatTable(this.archivo);
    }, 300);
  }

  createFile(): any {
    let fileResult: any = {};
    fileResult['cantidadNodos'] = this.cantidadNodos;
    fileResult['encabezadoNodos'] = [];
    fileResult['nodos'] = [];
    document
      .getElementById('encabezados')
      ?.querySelectorAll('th')
      .forEach((element: any) => {
        fileResult['encabezadoNodos'].push(element.innerText.replace("\n", ""));
      });

    document
      .getElementById('tabla')
      ?.querySelectorAll('tr')
      .forEach((row: any, index) => {
        if (index != 0) {
          let obj: any = {};
          let nodo: any = {};
          nodo[row.id] = [];
          row.querySelectorAll('td').forEach((cell: any) => {
            let data: any = {};
            data[cell.id] = cell.innerHTML;
            nodo[row.id].push(data);
          });
          fileResult['nodos'].push(nodo);
        }
      });
    return fileResult;
  }

  downloadFile() {
    let file = JSON.stringify(this.createFile());
    let blob = new Blob([file], { type: 'application/json' });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'archivo.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
