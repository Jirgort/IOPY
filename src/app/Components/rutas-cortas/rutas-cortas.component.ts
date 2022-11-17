import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-rutas-cortas',
  templateUrl: './rutas-cortas.component.html',
  styleUrls: ['./rutas-cortas.component.css']
})
export class RutasCortasComponent implements OnInit {

  public alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  public cantidadNodos:number =  0;
  constructor() { }


  ngOnInit(): void {

  }

  calcularRutasCortas(){
    let matriz = [];
    let tabla:any = document.getElementById('tabla');
    for (let i = 1; i < tabla.rows.length; i++) {
      let columnas:any = [];
      for (let j = 1; j < tabla.rows[i].cells.length; j++) {
        const element = tabla.rows.item(i).cells.item(j);

        if (element.innerHTML == "∞"){
          columnas.push(Infinity);
        } else{
          columnas.push(parseInt(element.innerHTML));
        }
      }
      matriz.push(columnas);
    }
    let resultado = this.floyd(matriz);
    this.reemplazarDatosTabla(resultado);
    alert("Se ha calculado las rutas cortas");
  }

  reemplazarDatosTabla(matrizResultado:any){
    for (let i = 1; i < matrizResultado.length; i++) {
      for(let j = 1; j < matrizResultado[i].length; j++){
        let tabla:any = document.getElementById('tabla')
        let celda:any = tabla.rows.item(i).cells.item(j);
        if (matrizResultado[i][j] == Infinity){
          celda.innerHTML = "∞";
        } else{
          celda.innerHTML = matrizResultado[i][j];
        }
      }
    }
  }

  floyd(tabla:any){
    var n = tabla.length;
    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          let costo = tabla[i][k] + tabla[k][j];
          if(costo < tabla[i][j]){
            tabla[i][j] = costo;
          }
        }
      }   
    }
    return tabla;
  }

  onNameChange(e:any){
    let headers = document.getElementsByClassName(e.target.classList.value)
    for (let i = 0; i < headers.length; i++) {
      const element = headers[i];
        element.innerHTML = e.target.innerHTML;
    }
  }

  getInputNodos(event:any){
    this.cantidadNodos = parseInt(event.target.value);
  }

  handleFile(e:any){
    let file = e.target.files[0];
    let reader = new FileReader();
  
  }

  createFile():any{
    let fileResult:any = {}
    fileResult["cantidadNodos"] = this.cantidadNodos;
    fileResult["encabezadoNodos"] = [];
    fileResult["nodos"] = [];
    document.getElementById('tabla')?.querySelectorAll('th').forEach((element:any) => {
      fileResult["encabezadoNodos"].push(element.innerHTML);
    });
    document.getElementById("tabla")?.querySelectorAll("tr").forEach((row:any, index) => {
      if(index != 0){
        let obj:any = {};
        let nodo:any = {}
        nodo[row.id] = [];
        row.querySelectorAll("td").forEach((cell:any) => {
          let data:any = {}
          data[cell.id] = cell.innerHTML;
          nodo[row.id].push(data);
        });
        fileResult["nodos"].push(nodo);
      }
    });
    return fileResult;
  }

  downloadFile(){
    let file = JSON.stringify(this.createFile()); 
    let blob = new Blob([file],{type:'application/json'});
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'archivo.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
