import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-reemplazo-equipos',
  templateUrl: './reemplazo-equipos.component.html',
  styleUrls: ['./reemplazo-equipos.component.css']
})
export class ReemplazoEquiposComponent implements OnInit {

  costoInicial:number=0;
  plazoProyecto:number=0;
  objetos:number = 0;
  vidaUtil:number=0;
  objetosIndex:number[] = [];
  archivo:Object = {};
  optima:number[]=[];
  


  constructor() { }

  ngOnInit(): void {
  }

  getInputCostoInicial(event:any){
    this.costoInicial = parseInt(event.target.value);
  }

  getInputPlazoProyecto(event:any){
    this.plazoProyecto=parseInt(event.target.value);
  }
  getInputVidaUtil(event:any){
    this.vidaUtil=parseInt(event.target.value);
  }
  generarTabla(){
    //Verifica si se ingresaron valores numéricos
    if(isNaN(this.costoInicial) || isNaN(this.plazoProyecto)|| isNaN(this.vidaUtil)){
      alert("Ingrese valores numéricos"); 
      return; 
    }

    //Verifica si se cargó un archivo
    if(Object.keys(this.archivo).length != 0 && this.getFileInfo(this.archivo) ){
      return;
    }

    this.objetosIndex = Array(this.vidaUtil).fill(0).map((x,i)=>i);

  }
  getFileInfo(file:any){
    if(file.hasOwnProperty("costoInicial") && file.hasOwnProperty("plazo")&& file.hasOwnProperty("vidaUtil") ){
      this.costoInicial = file["costoInicial"];
      this.vidaUtil=file["vidaUtil"];
      this.objetos = file["objetos"].length;
      this.plazoProyecto=file["plazo"];
      //Cambia el input en la vista
      document.getElementById("costoInicial")?.setAttribute("value", this.costoInicial.toString());
      document.getElementById("vidaUtil")?.setAttribute("value", this.vidaUtil.toString());
      document.getElementById("plazo")?.setAttribute("value", this.plazoProyecto.toString());
      document.getElementById("objetos")?.setAttribute("value", this.objetos.toString());
      return 0;
    }else{
      alert("El archivo no contiene la información necesaria");
      return 1;
    } 
    
  }
  getField(obj:Object, field:string):any{
    return obj[field as keyof Object];
  }  
  createFile():any{
    let fileResult:any = {}
    fileResult["costoInicial"] = this.costoInicial;
    fileResult["plazo"] = this.plazoProyecto;
    fileResult["vidaUtil"] = this.vidaUtil;
    fileResult["objetos"] = [];
    document.getElementById("tabla")?.querySelectorAll("tr").forEach((row:any, index) => {
      if(index != 0){
        let obj:any = {};
        obj["ano"] = row.querySelector("td:nth-child(1)")?.innerText;
        obj["mantenimiento"] = parseInt(row.cells[1].children[0].value);
        obj["reventa"] = parseInt(row.cells[2].children[0].value);
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
  getObjArrField(obj:Object, index:number, field:string):any{
    return this.getField(obj, "objetos")[index][field as keyof Object];
  }

  getPlan(){
    return this.optima;
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
  showResult(matrix:number[][]){
    let ind=-0;
    let ind2=0;
    let tableRows = document.getElementById("resultTable")?.querySelectorAll("tr");
    for (let i = 1; i < matrix.length; i++) {
      let row = document.getElementById("resultTable")?.querySelectorAll("tr")[i];
      for (let j = 1; j < matrix[ind].length; j++) {
        let cell:any = row?.querySelector(`td:nth-child(${j+1})`)
        if(cell !== undefined || cell !== null){ 
          console.log(matrix[i]);
          cell.innerHTML = matrix[ind][j].toString();
          
          ind2++;
        }
       
      }
      ind++;
      
    }

  }
  calculate(){
    
    let valsMante=this.getValoresMante();
    let valVenta=this.getValoresVenta();
    let diff=this.diff(this.vidaUtil,this.plazoProyecto,valsMante,valVenta,this.costoInicial);
    let algoritmo=this.algoritmo(diff,this.plazoProyecto);
    this.showResult(algoritmo);
    let opitima=this.optimo(algoritmo);
    this.optima=opitima;
  }
  optimo(soluciones:any[]){
    let rev=soluciones.reverse();
    let i=0;
    var band=true;
    let sol=[];
    var ini=this.plazoProyecto;
    for(i;i<=rev.length-1;i++){
      if(ini==this.plazoProyecto&& band==true){
        band=false;
        sol.push(ini)
      }else{
        if(rev[i][2]==ini){
          sol.push(rev[i][0]);
         
          ini=rev[i][0];
        }


      }
      
    }
    console.log("solucion:-----");
    let ruta=sol.reverse();
    console.log(ruta);
    return ruta;
  }
  getObjectNames(){
    let vida=[];
    let i=0;
    for(i=0;i<=this.plazoProyecto;i++){
      vida.push(i);
    }
    return vida;
  }
  algoritmo(diff:any[],plazo:number){
    let cont;
    let i;
    let m=0;
    let dif=0;
    
    let vari=plazo-1;
    let suma=0;
    cont=vari+1
    let arrMin=[];
    let arr=[];
    let vida=0;
    let arrAux=new Array(2);
    arrAux[0]=plazo;
    arrAux[1]=0
    let numProx=[];
    arr.push(arrAux);
   
    while(vari>=0){
      for(i=0;i<arr.length;i++){
        let arraux2=new Array(3);
        let numP=new Array(2);
        if(vari<0){
          break;
        }
        if(cont>plazo||vida>this.vidaUtil){
 
          console.log("minimo: ");
          
          suma=Math.min.apply(null,arrMin);
          console.log("numero proximo: ");
          console.log(numProx);
          console.log(numProx[0][1]);
          for(m=0;m<numProx.length;m++){
            if(suma==numProx[m][1]){
              arraux2[2]=numProx[m][0];
            }

          }
          console.log(suma);
          console.log("lista arrmin:  ");
          console.log(arrMin);
          arraux2[0]=vari;
          arraux2[1]=suma;
          arr.push(arraux2);
          vari=vari-1;
          cont=vari+1;
          arrMin=[];
          vida=0;
          numProx=[];
        }
        if(arr[i][0]==cont){
          if(vida==this.vidaUtil){
            cont++;
            console.log("contadorrrrrrrrrrrrrrr");
          }else{
            suma=0;
          
          dif=Math.abs(cont-vari);
          suma+=diff[dif-1]+arr[i][1];
          console.log("variii");
          console.log(vari);
          console.log("contador");
          console.log(cont);
          console.log(diff[dif-1]);
          console.log(arr[i][1]);
          
          console.log("Guado: ");
          //console.log(arraux2);
          console.log(suma);

          arrMin.push(suma);
          numP[0]=cont;
          numP[1]=suma;
          numProx.push(numP);
         
          vida++;
          cont++;
          }
          

        }
      }
    }
    let reversa=arr.reverse();
    console.log(reversa);
    return reversa;
   
  }

  diff(vidaUtil:number,plazoProyecto:number,valsMante:number[],valVenta:number[],costoInicial:number){
    let dif,i,r;
    let suma=0;
    let w=0;
    let arr=new Array(vidaUtil+1);
    for(i=0;i<=vidaUtil-1;i++){
      
        let l=0;
        let suma2=0;
        while(l<=i){
          suma2+=valsMante[l];
          //console.log(valsMante[l]);
          
          l++;
        }
        //console.log(suma2);
        arr[i]=costoInicial+suma2-valVenta[i];
        
      
      
     //arr[i]=costoInicial+
      

    }
    /*for(r=0;r<arr.length-1;r++){
      console.log(arr[r]);
    }*/
    return arr;



  }
  getVidaUtil():any{
    let años:any = [];

    document.getElementById("tabla")?.querySelectorAll("tr").forEach((row:any, index) => {
      if(index != 0){
        años.push(parseInt(row.cells[1].children[0].value));
      }
    });
    return años;

  }

  getValoresMante():any{
    let mantenimientos:any = [];

    document.getElementById("tabla")?.querySelectorAll("tr").forEach((row:any, index) => {
      if(index != 0){
        mantenimientos.push(parseInt(row.cells[1].children[0].value));
      }
    });
    return mantenimientos;
  }
  getValoresVenta():any{
    let ventas:any = [];

    document.getElementById("tabla")?.querySelectorAll("tr").forEach((row:any, index) => {
      if(index != 0){
        ventas.push(parseInt(row.cells[2].children[0].value));
      }
    });
    return ventas;
  }



}
