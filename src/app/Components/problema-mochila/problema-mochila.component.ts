import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-problema-mochila',
  templateUrl: './problema-mochila.component.html',
  styleUrls: ['./problema-mochila.component.css']
})
export class ProblemaMochilaComponent implements OnInit {

  capacidad:number = 5;
  objetos:number = 0;
  objetosIndex:number[] = [];
  archivo:Object = {};

  constructor() { }

  ngOnInit(): void {
  }

  generarTabla(){
    if(isNaN(this.objetos) || isNaN(this.capacidad)){
      alert("Ingrese valores numéricos"); 
      return; 
    }

    this.objetosIndex = Array(this.objetos).fill(0).map((x,i)=>i);

  }

  getInputCapacidad(event:any){
    this.capacidad = parseInt(event.target.value);
  }

  getInputObjetos(event:any){
    this.objetos = parseInt(event.target.value);
  }

  handleFile(event:any){
    let file = event.target.files[0];
    let reader = new FileReader();
    let result = null;
    reader.onload = (e) => {result = e.target?.result;};
    console.log(result);
  }
}
