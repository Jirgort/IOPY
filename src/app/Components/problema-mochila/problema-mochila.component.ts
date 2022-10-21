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

  toArray(obj:any){
    return Array(obj);
  }

  getField(obj:Object, field:string):any{
    return obj[field as keyof Object];
  }  

  getObjArrField(obj:Object, index:number, field:string):any{
    return this.getField(obj, "objetos")[index][field as keyof Object];
  }

  createFile():any{
    let fileResult:any = {}
    fileResult["capacidad"] = this.capacidad;
    fileResult["objetos"] = [];
    document.getElementById("tabla")?.querySelectorAll("tr").forEach((row:any, index) => {
      if(index != 0){
        let obj:any = {};
        obj["nombre"] = row.querySelector("td:nth-child(1)")?.innerHTML;
        obj["peso"] = parseInt(row.cells[1].children[0].value);
        obj["valor"] = parseInt(row.cells[2].children[0].value);
        fileResult["objetos"].push(obj);
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
