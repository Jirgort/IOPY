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

  floyd(nodos:any){
    var n = nodos.nodos.length;
    let matriz = this.toMatrix(nodos.nodos);
    for (let k = 1; k < n; k++) {
      for (let i = 1; i < n; i++) {
        for (let j = 1; j < n; j++) {
          //Minimo
        }
      }   
    }
  }

  toMatrix(A:any){
    let matriz = Array(A.length).fill(A.length);
    let nodesIndex:any = {}

    // Ceros en la diagonal
    for (let i = 0; i < A.length; i++) {
      matriz[i][i] = 0;
    }

    // Objeto con los índices
    for (let i = 0; i < A.length; i++) {
      nodesIndex[A.nombre] = i;
    }

    for (let i = 0; i < A.length; i++) {
      for (let j = 0; j < A.caminos.length; j++) {
        let nodeIndex = nodesIndex[A.caminos[j].nombre]
        matriz[i][nodeIndex]
      }      
    }
    return matriz;

  }

}
