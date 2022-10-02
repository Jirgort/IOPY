import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rutas-cortas',
  templateUrl: './rutas-cortas.component.html',
  styleUrls: ['./rutas-cortas.component.css']
})
export class RutasCortasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var a = 
    {
      nodos:[
        {
          nombre: "1", 
          caminos:[
            {nombre: "3", costo:3},
            {nombre: "4", costo:1},
          ]},
        {
          nombre: "2", 
          caminos:[
            {nombre: "1", costo:4},
            {nombre: "3", costo:1},
          ]},
        {
          nombre: "3", 
          caminos:[
            {nombre: "4", costo:5},
          ]},
        {
          nombre: "4", 
          caminos:[
            {nombre: "2", costo:6},
          ]},
      ]
    }
    this.floyd(a);
  }

  /**
   * Se encarga de calcular las rutas cortas
   * @param nodos Objeto con los nodos y sus caminos
   */
  floyd(nodos:any){
    var n = nodos.nodos.length;
    let matriz = this.obtenerMatrizCostos(nodos.nodos);
    for (let k = 1; k < n; k++) {
      for (let i = 1; i < n; i++) {
        for (let j = 1; j < n; j++) {
          let costo = matriz[i][k] + matriz[k][j];
          if(costo < matriz[i][j]){
            matriz[i][j] = costo;
          }
        }
      }   
    }
    return matriz;
  }

  /**
   * Convierte un arreglo a una matriz con los costos
   * @param A un arreglo con los nodos y sus caminos 
   * @returns una matriz con los costos de los caminos
   */
  obtenerMatrizCostos(A:any){
    //Matriz con ceros
    let matriz = new Array(A.length);
    let nodesIndex:any = [];

    //Se llena la matriz con ceros
    for (let i = 0; i < A.length; i++) {
      matriz[i] = new Array(A.length).fill(0);
    }

    // Objeto con los índices
    for (let i = 0; i < A.length; i++) {
      nodesIndex[i] = A[i].nombre;
    }

    //Recorremos la matriz
    for (let i = 0; i < A.length; i++) {
      for (let j = 0; j < A.length; j++) {
        //Si el nodo tiene un camino se coloca el costo
        //Si no existe un camino se coloca infinito
        let nodeName = nodesIndex[j];
        if(i !== j){
          let caminos = A[i].caminos;
          let caminoActual = caminos.find(({ nombre }:any) => nombre === nodeName);
          if( caminoActual != undefined){
            matriz[i][j] = caminoActual.costo;
          }else{
            matriz[i][j] = Infinity;
          }
        }
      }      
    }
    return matriz;

  }

}
