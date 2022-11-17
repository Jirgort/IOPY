import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-multiplicacion-matrices',
  templateUrl: './multiplicacion-matrices.component.html',
  styleUrls: ['./multiplicacion-matrices.component.css']
})
export class MultiplicacionMatricesComponent implements OnInit {
  numMatrices:number=0;
  bandera:boolean=false;
  bandera2:boolean=false;
  bandera3:boolean=false;
  dimensiones:any[]=[];
  columnaAct:number=0;
  filaAct:number=0;
  contador:number=0;
  tabla:number[]=[];
  archivo:Object = {};
  objetosIndex:number[] = [];

  constructor() { }

  ngOnInit(): void {
  }
  getInputNumMatrices(event:any){
    this.numMatrices = parseInt(event.target.value);
  }
  setBandera(){
    if(this.numMatrices>0){
      this.bandera=true;
    }
  }
  setDimencionFila(numFilas:string){
    if(this.bandera3==false){
      this.filaAct=parseInt(numFilas);
      this.dimensiones.push(this.filaAct);
    }
    
    
  }
  setDimencionColumna(NumColumna:any){
    this.columnaAct=parseInt(NumColumna);
    this.dimensiones.push(this.columnaAct);
    console.log(this.dimensiones);
    this.bandera3=true;
  }
  setContador(){
    this.contador+=1;
    if(this.contador==this.numMatrices){
      this.bandera2=true;
    }
   
  }
  generarTabla2(){
    this.objetosIndex = Array(this.numMatrices).fill(0).map((x,i)=>i);
    return this.objetosIndex;
  }
  generarTabla(){
    //Verifica si se ingresaron valores numéricos
    if(isNaN(this.numMatrices)){
      alert("Ingrese valores numéricos"); 
      return; 
    }

    //Verifica si se cargó un archivo
    if(Object.keys(this.archivo).length != 0 && this.getFileInfo(this.archivo) ){
      this.bandera2=true;
      this.bandera=true;
      return;
    }

    this.objetosIndex = Array(this.numMatrices).fill(0).map((x,i)=>i);
    
    
  }
  getObjArrField(obj:Object, index:number, field:string):any{
    return this.getField(obj, "objetos")[index][field as keyof Object];
  }
  getField(obj:Object, field:string):any{
    return obj[field as keyof Object];
  }  
  getFileInfo(file:any){
    if(file.hasOwnProperty("numMatrices") && file.hasOwnProperty("dimenciones")){
      this.numMatrices = file["numMatrices"];
      this.dimensiones=file["dimenciones"]
      //Cambia el input en la vista
     
      return 0;
    }else{
      alert("El archivo no contiene la información necesaria");
      return 1;
    } 
    
  }
  showResult(matrix:number[][]){
    let ind=-0;
    let ind2=0;
    let tableRows = document.getElementById("resultTable")?.querySelectorAll("tr");
    for (let i = 1; i < matrix.length+1; i++) {
      let row = document.getElementById("resultTable")?.querySelectorAll("tr")[i];
      for (let j = 1; j < matrix[ind].length+1; j++) {
        let cell:any = row?.querySelector(`td:nth-child(${j+1})`)
        if(cell !== undefined || cell !== null){ 
          console.log(matrix[i]);
          cell.innerHTML = matrix[ind][j-1].toString();
          
          ind2++;
        }
       
      }
      ind++;
      
    }

  }
  showResultP(matrix:number[][]){
    let ind=-0;
    let ind2=0;
    let tableRows = document.getElementById("resultTableP")?.querySelectorAll("tr");
    for (let i = 1; i < matrix.length+1; i++) {
      let row = document.getElementById("resultTableP")?.querySelectorAll("tr")[i];
      for (let j = 1; j < matrix[ind].length+1; j++) {
        let cell:any = row?.querySelector(`td:nth-child(${j+1})`)
        if(cell !== undefined || cell !== null){ 
          console.log(matrix[i]);
          cell.innerHTML = matrix[ind][j-1].toString();
          
          ind2++;
        }
       
      }
      ind++;
      
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
    this.bandera2=true;
  }
  algoritmo(){
    let i=0
    let j=1;
    let k=0;
    let arr=[];
    let arrP=[];
    let arrmin=[];
    let arrminP=[];
    let cont=0;
    let minimo=0;
    for(i=0;i<this.numMatrices;i++){
      let array=new Array(this.numMatrices);
      let arrayP=new Array(this.numMatrices);
      for(j=0;j<array.length;j++){
        
        if(j>i){
          array[j]=-1;

        }else{
          if(j==i){
            arrayP[j]=0;
            array[j]=0;
          }else{
            arrayP[j]="-";
            array[j]="-";
          }
        }
        
  
      }
      
      arr.push(array);
      arrP.push(arrayP);
    }
    i=0;
    j=1;
    while(cont<this.numMatrices){
      i=0;
      j=cont+1;
      while(i<this.numMatrices){
          
        while(j<this.numMatrices){
          
          if(arr[i][j]==-1){
            k=i;
           
            while(k<j){
              console.log("mi dimencion[i]")
              console.log(this.dimensiones[i]);
              console.log("mi dimencion[j]")
              console.log(this.dimensiones[j+1]);
              console.log("mi dimencion[k]")
              console.log(this.dimensiones[k+1]);
              console.log("arr[i][k]");
              console.log(arr[i][k]);
              console.log("arr[k+1][j]");
              console.log(arr[k+1][k]);
              console.log(this.dimensiones[k+1]);
              arrmin.push(arr[i][k]+arr[k+1][j]+this.dimensiones[i]*this.dimensiones[j+1]*this.dimensiones[k+1]);
              arrminP.push(k);
              k+=1;
            }
            minimo=Math.min.apply(null,arrmin);
            for(let m=0;m<arrmin.length;m++){
                if(arrmin[m]==minimo){
                  arrP[i][j]=arrminP[m]+1;
                }
            }
            arr[i][j]=minimo;
            arrmin=[];
            arrminP=[];
          }
          j+=1
          break;
          
         
        }
        console.log("mi array")
        console.log(arr);
        i+=1;
        
  
      }

      cont+=1;
    }

    this.showResult(arr);
    this.showResultP(arrP);
    this.agrupacion(arrP);
  }
  agrupacion(matrix:number[][]){
    let i=0;
    let j=0;
    let cadena="";
    let newCadena;
    for(let m=1;m<matrix.length+1;m++){
        cadena+="A"+m.toString()+" ";
    }
    console.log(cadena);
    for(let i=0;i<matrix.length;i++){
      for(j=matrix.length;j>1;j--){
        let l=i+1;
        cadena.indexOf("A"+(i+1).toString());
        let indew="A"+l.toString();
        let indv="A"+matrix[i][j];
        let cad="("+indew;
        let cad2=indv+")";
        cadena.replace("A1","B2");
        //cadena.replace(indv.toString(),cad2.toString());
        //newCadena= "("+cadena[cadena.indexOf(indew)];
        console.log(indew);
        console.log(cadena.includes(indew));
        console.log(cadena);
       //console.log(cadena[cadena.indexOf("A"+l.toString())]);
        /*cadena.replace(cadena[cadena.indexOf("A"+l.toString())],newCadena);
        newCadena= cadena[cadena.indexOf("A"+matrix[i][j])]+")";
        cadena.replace(cadena[cadena.indexOf("A"+matrix[i][j])],newCadena);*/
      }
      
    }
  }

}
