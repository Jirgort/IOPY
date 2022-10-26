import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reemplazo-equipos',
  templateUrl: './reemplazo-equipos.component.html',
  styleUrls: ['./reemplazo-equipos.component.css']
})
export class ReemplazoEquiposComponent implements OnInit {

  parametros:any = {
    costoInicial: 0,
    plazo: 0,
    vidaUtil: 0
  }

  constructor() { }
  
  ngOnInit(): void {
  }

  /**
   * Cambia el valor de los parámetros según su id
   * @param event evento que se dispara al cambiar el valor del input
   */
  handleInput(event: any) {
    let id:string = event.target.id;                  // id del elemento que dispara el evento
    let value:number = parseInt(event.target.value);  // valor del elemento que dispara el evento 
    
    this.parametros[id] = value;                      // actualiza el valor del objeto inputVariable
  }


  generarArchivo():JSON{
    let archivo:any = {
      "costoInicial": this.parametros.costoInicial,
      "plazo": this.parametros.plazo,
      "vidaUtil": this.parametros.vidaUtil
    }
    let unidadesTiempo = [];

    //Obtiene los valores de los inputs de la tabla
    for (let i = 1; i <= this.parametros.vidaUtil; i++) {
      let unidadTiempo:any = {};                                                       // Unidad de tiempo de la fila i
      let valorMantenimiento:any = document.getElementById("mantenimiento-"+i)    // Valor de  mantenimiento de la fila i
      let valorVenta:any = document.getElementById("venta-"+i)                    // Valor de venta de la fila i

      unidadTiempo["mantenimiento"] = valorMantenimiento.value;                   // Asigna el valor de mantenimiento a la unidad de tiempo
      unidadTiempo["venta"] = valorVenta.value;                                   // Asigna el valor de venta a la unidad de tiempo

      unidadesTiempo.push(unidadTiempo);                                          // Agrega la unidad de tiempo al arreglo de unidades de tiempo
    }

    archivo["unidadesTiempo"] = unidadesTiempo;
    return archivo;
  }


  /**
   * Generar una arreglo para iterar en la interfaz
   * @param number numero entero
   * @returns un arreglo de tamaño n
   */
  range(number:number){return new Array(number);}
}
