import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-problema-mochila',
  templateUrl: './problema-mochila.component.html',
  styleUrls: ['./problema-mochila.component.css']
})

export class ProblemaMochilaComponent implements OnInit {

  capacidad:number = 0;
  objetos:number = 0;
  objetosIndex:number[] = [];

  archivo:Object = {};

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Genera la tabla al presionar el botón
   * @returns void
   */
  generarTabla(){
    //Verifica si se ingresaron valores numéricos
    if(isNaN(this.objetos) || isNaN(this.capacidad)){
      alert("Ingrese valores numéricos"); 
      return; 
    }

    //Verifica si se cargó un archivo
    if(Object.keys(this.archivo).length != 0 && this.getFileInfo(this.archivo) ){
      return;
    }

    this.objetosIndex = Array(this.objetos).fill(0).map((x,i)=>i);

  }

  /**
   * Maneja el evento de cambio de valor en un input
   * @param event Evento al ingresar un valor en el input
   */
  getInputCapacidad(event:any){
    this.capacidad = parseInt(event.target.value);
  }

  /**
   * Maneja el evento de cambio de valor en un input
   * @param event Evento al ingresar un valor en el input
   */
  getInputObjetos(event:any){
    this.objetos = parseInt(event.target.value);
  }

  /**
   * Menaja el evento de carga de archivo
   * @param event Evento obtenido al seleccionar un archivo
   */
  handleFile(event:any){
    var file = event.target.files[0];
    var reader = new FileReader();

    //Carga el archivo en una variable
    reader.onload = (event) => {
      this.archivo = JSON.parse(event.target?.result?.toString() || ""); // Convierte el archivo a JSON
    }

    reader.readAsText(file); //lee el archivo como texto
  }

  /**
   * Obtiene y validad la información del archivo
   * @param file Archivo en formato JSON
   * @returns 0 si el archivo no pudo leerse, 1 si el archivo no tiene la estructura correcta, 2 si el archivo no tiene la información correcta
   */
  getFileInfo(file:any){
    if(file.hasOwnProperty("capacidad") && file.hasOwnProperty("objetos")){
      this.capacidad = file["capacidad"];
      this.objetos = file["objetos"].length;

      //Cambia el input en la vista
      document.getElementById("capacidad")?.setAttribute("value", this.capacidad.toString());
      document.getElementById("objetos")?.setAttribute("value", this.objetos.toString());
      return 0;
    }else{
      alert("El archivo no contiene la información necesaria");
      return 1;
    } 
  }

  /**
   * Retorna el valor de una llave de un objeto
   * @param obj Objeto JSON
   * @param field campo a obtener
   * @returns el campo especificado del objeto
   */
  getField(obj:Object, field:string):any{
    return obj[field as keyof Object];
  }  

  /**
   * Obtiene el array de objetos
   * @param obj   Objeto JSON
   * @param index Indice del objeto
   * @param field campo a obtener
   * @returns El array de objetos
   */
  getObjArrField(obj:Object, index:number, field:string):any{
    return this.getField(obj, "objetos")[index][field as keyof Object];
  }

  /**
   * Genera un archivo json con la información de la tabla
   * @returns Objeto con la información de la tabla
   */
  createFile():any{
    let fileResult:any = {}
    fileResult["capacidad"] = this.capacidad;
    fileResult["objetos"] = [];
    document.getElementById("tabla")?.querySelectorAll("tr").forEach((row:any, index) => {
      if(index != 0){
        let obj:any = {};
        obj["nombre"] = row.querySelector("td:nth-child(1)")?.innerText;
        obj["peso"] = parseInt(row.cells[1].children[0].value);
        obj["valor"] = parseInt(row.cells[2].children[0].value);
        fileResult["objetos"].push(obj);
      }
    });
    return fileResult;
  }

  /**
   * Descarga el archivo con la información de la tabla
   */
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

  /**
   * Obtiene los valores de los objetos de la tabla
   * @returns valores de los objetos
   */
  getValor():any{
    let valores:any = [];
    document.getElementById("tabla")?.querySelectorAll("tr").forEach((row:any, index) => {
      if(index != 0){
        valores.push(parseInt(row.cells[1].children[0].value));
      }
    });
    return valores;
  }

  /**
   * Obtiene el peso de los objetos de la tabla
   * @returns pesos de los objetos
   */
  getPesos(){
    let pesos:any = [];
    document.getElementById("tabla")?.querySelectorAll("tr").forEach((row:any, index) => {
      if(index != 0){
        pesos.push(parseInt(row.cells[2].children[0].value));
      }
    }); 
    return pesos;
  }

  /**
   * Genera una matriz con las ganancias de cada objeto, el resultado esta en la última fila y columan
   * @param capacidad Capacidad de la mochila
   * @param pesos     Arreglo con los pesos de los objetos
   * @param valores   Valore de los objetos
   * @param n         Cantidad de objetos
   * @returns Una matriz con el resultado de la mochila
   */
  knapSack(capacidad:number, pesos:number[], valores:number[], n:number)
  {
      let i, w;
      let K = new Array(n + 1);

      for (i = 0; i <= n; i++)
      {
          K[i] = new Array(capacidad + 1);
          for (w = 0; w <= capacidad; w++)
          {
              if (i == 0 || w == 0)
                  K[i][w] = 0;
              else if (pesos[i - 1] <= w)
                  K[i][w]
                      = Math.max(valores[i - 1]
                       + K[i - 1][w - pesos[i - 1]],
                       K[i - 1][w]);
              else
                  K[i][w] = K[i - 1][w];
          }
      }

      return K;
  }
   
  /**
   * Muestra el resultdo en la tabla de resultados
   * @param matrix Matriz con los valores obtenidos del algoritmo
   */
  showResult(matrix:number[][]){
    let tableRows = document.getElementById("resultTable")?.querySelectorAll("tr");
    for (let i = 1; i < matrix.length; i++) {
      let row = document.getElementById("resultTable")?.querySelectorAll("tr")[i];
      for (let j = 1; j < matrix.length; j++) {
        let cell:any = row?.querySelector(`td:nth-child(${j+1})`)
        if(cell !== undefined || cell !== null){ 
          cell.innerHTML = matrix[i][j].toString();
        }
      }
      
    }

  }

  /**
   * Ejecuta el algoritmo de la mochila
   */
  handleCalculate(){
    let valores = this.getValor();
    let pesos = this.getPesos();
    let knpasackMatrix = this.knapSack(this.capacidad, pesos, valores, this.objetos);
    this.showResult(knpasackMatrix);
  } 

  /**
   * Array con los nombres de los objetos
   * @returns Arreglo con los nombres obtenidos de la tabla
   */
  getObjectNames(){
    let nombres:any = []
    document.getElementById("tabla")?.querySelectorAll("tr").forEach((row:any, index) => {
      if(index != 0){
        let obj:any = {};
        nombres.push(row.querySelector("td:nth-child(1)")?.innerText.replace("\n",""));
      }
    });
    return nombres;
  }

  /**
   * Retorna un array que va desde 0 al tamaño de la mochila
   * @returns la escala del problema
   */
  getScale(){
    return Array.from(Array(this.capacidad)).map((x, i) => i )
  }
}
