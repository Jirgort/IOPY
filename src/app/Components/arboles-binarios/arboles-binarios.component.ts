import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arboles-binarios',
  templateUrl: './arboles-binarios.component.html',
  styleUrls: ['./arboles-binarios.component.css']
})
export class ArbolesBinariosComponent implements OnInit {

  cantidadNodos:number=0; //cantidad de nodos ingresados
  objetos:number = 0;
  objetosIndex:number[] = [];
  archivo:Object = {}; //archivo leído

  cantidadItemsTopL:number[] = []; //array del 0 hasta el cantidadNodos
  cantidadItemsTop:number[] = []; //array del 0 hasta el cantidadNodos
  cantidadItemsTopV:number[] = []; //array del 1 hasta cantidadNodos+1
  listaObjetos:any[] = []; //lista de las key, sus nombres y pesos

  matrizA:number[][] = []; //matrices a imprimir
  matrizR:number[][] = [];
  indexesAuxiliarR:number[] = []; //auxiliar para ayudar a llenar la matriz R

  cantidadTotalPeso:number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  //obtiene la cantidad de nodos del input y los guarda en variable
  getInputCantidadNodos(event:any){
    this.cantidadNodos = parseInt(event.target.value)+1;
  }

  /**
   * Genera un array desde el 0 hasta el cantidadNodos
   */
  generarCantidadItemsTop() {
    this.cantidadItemsTop = [];
    this.cantidadItemsTopV = [];
    this.cantidadItemsTopL = []; //array del 0 hasta el cantidadNodos
    for (let index = 0; index < this.cantidadNodos; index++) {
      this.cantidadItemsTop.push(index);
      this.cantidadItemsTopV.push(index+1);
      this.cantidadItemsTopL.push(index+1);
    }
  }

  //inicializa las matrices A y R del tamaño dela cantidad de nodos
  inicializarMatrizAR(indexPar:number) { 
    if (indexPar == 1){
      this.matrizA = [];
    } else {
      this.matrizR = [];
    }
    for (let index = 0; index < this.cantidadNodos; index++) {
      let lista = [];
      for (let jindex = 0; jindex < this.cantidadNodos; jindex++) {
        if (index == jindex-1 && indexPar == 1) {
          lista.push(parseFloat((this.listaObjetos[index]["peso"]/this.cantidadTotalPeso).toFixed(4))); //busca el objeto index y saca su peso y lo mete aquí
        } else{
          if (index == jindex-1) {
            lista.push(jindex);
          } else {
            lista.push(0);
          }
          
        }
      } 
      if (indexPar == 1) {
        this.matrizA.push(lista);
      } else {
        this.matrizR.push(lista);
      }
    }
  }

  //genera la lista de objetos que se van a desplegar en el top y los ordena alfanumericamente
  generarListaObjetos() {
    this.listaObjetos = [];
    this.cantidadTotalPeso = 0;
    document.getElementById("tabla")?.querySelectorAll("tr").forEach((row:any, index) => {
      if(index != 0){
        let obj:any = {};
        obj["nombre"] = row.querySelector("td:nth-child(1)")?.innerText;
        obj["peso"] = parseInt(row.cells[1].children[0].value);
        this.cantidadTotalPeso += parseInt(row.cells[1].children[0].value)
        this.listaObjetos.push(obj);
      }
    });
    this.listaObjetos.sort(function (a, b) {
      // A va primero que B
      if (a["nombre"] < b["nombre"])
          return -1;
      // B va primero que A
      else if (a["nombre"] > b["nombre"])
          return 1;
      // A y B son iguales
      else 
          return 0;
    });
  }

  generarTabla(){
    //Verifica si se ingresaron valores numéricos
    if(isNaN(this.cantidadNodos)){
      alert("Ingrese valores numéricos"); 
      return; 
    }

    //Verifica si se cargó un archivo
    if(Object.keys(this.archivo).length != 0 && this.getFileInfo(this.archivo) ){
      return;
    }
    this.generarCantidadItemsTop();
    this.objetosIndex = Array(this.cantidadNodos-1).fill(0).map((x,i)=>i);
    this.cantidadItemsTopL.pop();
  }

  getObjArrField(obj:Object, index:number, field:string):any{
    return this.getField(obj, "objetos")[index][field as keyof Object];
  }

  getField(obj:Object, field:string):any{
    return obj[field as keyof Object];
  }  
  
  getFileInfo(file:any){
    if(file.hasOwnProperty("cantidadNodos") && file.hasOwnProperty("objetos")){
      this.cantidadNodos = file["cantidadNodos"];
      this.objetos = file["objetos"].length;
      //Cambia el input en la vista
      document.getElementById("cantidadNodos")?.setAttribute("value", this.cantidadNodos.toString());

      return 0;
    }else{
      alert("El archivo no contiene la información necesaria");
      return 1;
    } 
    
  }

  handleFile(event:any){
    var file = event.target.files[0];
    var reader = new FileReader();

    //Carga el archivo en una variable
    reader.onload = (event) => {
      this.archivo = JSON.parse(event.target?.result?.toString() || ""); // Convierte el archivo a JSON
    }

    reader.readAsText(file); //lee el archivo como texto
  }

  //###############################################################


  handleCalculate(){
    
    this.generarListaObjetos(); // obtenemos la lista de objetos y los ordenamos
    this.inicializarMatrizAR(1); // inicializamos la matriz A
    this.inicializarMatrizAR(2); //inicializamos la matriz R
    this.generateMatrizResultado();
  } 

  //###############################################################

  //cambia cada uno de los campos de la matriz A y R con el algoritmo visto en clases
  generateMatrizResultado () {
    let cantidadMax = this.objetosIndex.length;
    for (let index = 0; index < cantidadMax-1; index++) {
      let i = 0;
      let j = 2+index;
      while (j < cantidadMax+1) {
        this.matrizA[i][j] = this.minLista(this.listaRango(i, j-1));
        this.matrizR[i][j] = this.indexesAuxiliarR[this.listaRango(i, j-1).indexOf(this.minLista(this.listaRango(i, j-1)))];
        i++;
        j++;
      }
    }
  }

  //obtiene el numero menor de una lista
  minLista(lista:number[]) {
    while(lista.length > 1){
      if(lista[0] < lista[1]) {
        lista.splice(1,1);
      } else {
        lista.shift();
      }
    }
    return lista[0];
  }

  //crea una lista con el algoritmo de arboles explicado en clase en un rango
  listaRango (indexPar:number, jindexPar:number) {
    let listaRes = [];
    let listaIndexes = [];
    let probas = this.buscarProbabilidades(indexPar,jindexPar);
    for (let index = indexPar; index <= jindexPar; index++) {
      let A1 = (this.matrizA[indexPar][index] + this.matrizA[index+1][jindexPar+1] + probas).toFixed(3);
      listaIndexes.push(index+1);
      listaRes.push(parseFloat(A1));
    }
    this.indexesAuxiliarR = listaIndexes;
    return listaRes;
  }

  //busca las probabilidades en un rango 
  buscarProbabilidades(indexPar:number, jindexPar:number){
    let res = 0;
    for (let index = indexPar; index+1 <= jindexPar+1; index++) {
      res += this.listaObjetos[index]["peso"];
    }
    return res/this.cantidadTotalPeso;
  }

  //###############################################################

  /**
   * Genera un archivo json con la información de la tabla
   * @returns Objeto con la información de la tabla
   */
   createFile():any{
    let fileResult:any = {}
    fileResult["cantidadNodos"] = this.cantidadNodos;
    fileResult["objetos"] = [];
    document.getElementById("tabla")?.querySelectorAll("tr").forEach((row:any, index) => {
      if(index != 0){
        let obj:any = {};
        obj["nombre"] = row.querySelector("td:nth-child(1)")?.innerText;
        obj["peso"] = parseInt(row.cells[1].children[0].value);
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
}
