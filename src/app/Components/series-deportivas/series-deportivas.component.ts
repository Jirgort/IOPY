import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-series-deportivas',
  templateUrl: './series-deportivas.component.html',
  styleUrls: ['./series-deportivas.component.css']
})
export class SeriesDeportivasComponent implements OnInit {
  numJuegos:number=0;
  numJuegosTabla:number=0;
  probaCasa:number=0;
  probaVisita:number=0;
  contadorFormato:number=0;
  formato:string[]=[];
  bandera:boolean=false;
  bandera2:boolean=false;
  tabla:number[]=[];
  constructor() { }

  ngOnInit(): void {
  }
  getInputNumJuegos(event:any){
    var x=document.getElementById("probaCasa")?.textContent;
    console.log(x);
    
    this.numJuegos = parseInt(event.target.value);
    this.numJuegosTabla=Math.floor(this.numJuegos/2)+1;
  }
  getInputProbaCasa(event:any){
   
    this.probaCasa = event.target.value;
    console.log(this.probaCasa);
  }
  getInputProbaVisita(event:any){
    this.probaVisita =event.target.value;
  }
  contJuegosC(){
    if(isNaN(this.numJuegos) || isNaN(this.probaCasa)|| isNaN(this.probaVisita)){
     
      alert("Ingrese valores numéricos"); 
      return; 
    }else{
      if(this.contadorFormato==this.numJuegos){
        alert("LLegaste el limite "); 
        this.bandera2=true;
        return;
      }
      else{
        
          this.contadorFormato+=1;
          this.formato.push("C");
          console.log(this.formato);
          console.log(this.probaCasa);
        
      }
    }
    
  }
  recortar(num:any){
    var cant=4;
    var s = num.toString()
    var l = s.length
    var decimalLength = s.indexOf('.') + 1

    if (l - decimalLength <= cant){
      return num
    }
   
    var isNeg  = num < 0
    var decimal =  num % 1
    var entera  = isNeg ? Math.ceil(num) : Math.floor(num)
    
    var decimalFormated = Math.floor(
      Math.abs(decimal) * Math.pow(10, cant)
    )
    
    var finalNum = entera + 
      ((decimalFormated / Math.pow(10, cant))*(isNeg ? -1 : 1))
    
    return finalNum
    }
  getCasaA(){
    return this.probaCasa;
  }
  getVisitaA(){
    return this.probaVisita;
  }
  getCasaB(){
    let varr=0;
    varr=this.recortar(1-this.probaCasa);
    return varr;
  }
  getVisitaB(){
    let varr=0;
    varr=this.recortar(1-this.probaVisita);
    console.log(this.recortar(0.458789));
    return varr;
  }
  setBandera(){
    if(this.bandera2){
      this.bandera=true;
    }
  }
  generarTabla(){
    this.tabla=Array(this.numJuegosTabla+1).fill(0).map((x,i)=>i);
    
    return this.tabla;

  }
  showResult(matrix:number[][]){
    let ind=0;
    let ind2=0;
    let tableRows = document.getElementById("resultTable")?.querySelectorAll("tr");
    for (let i = 1; i < matrix.length+1; i++) {
      let row = document.getElementById("resultTable")?.querySelectorAll("tr")[i];
      for (let j = 1; j < matrix[ind].length; j++) {
        let cell:any = row?.querySelector(`td:nth-child(${j+2})`)
        if(cell !== undefined || cell !== null){ 
          console.log(matrix[i]);
          cell.innerHTML = matrix[ind][j].toString();
          
          ind2++;
        }
       
      }
      ind++;
      
    }

  }
algoritmo2(){
  let arr=[];
  let i=0;
  let j=0;
  let diferencia=0;
  let dif=0;
  let dif2=0;
  let arrayTrivial=new Array(this.numJuegosTabla+1);

  for(i=1;i<arrayTrivial.length;i++){
    arrayTrivial[i]=1;
  }
  arr.push(arrayTrivial);
 

  for(i=1;i<this.numJuegosTabla+1;i++){
    let array=new Array(this.numJuegosTabla);

    for(j=0;j<array.length;j++){
      array[j]=0;

    }
    arr.push(array)
  }
  for(i=1;i<this.numJuegosTabla+1;i++){
    dif=this.numJuegosTabla-i;
    for(j=1;j<this.numJuegosTabla+1;j++){
      dif2=this.numJuegosTabla-j;
      diferencia=dif+dif2;
      if(this.formato[diferencia]=="C"){
        let calculo=0;
        calculo=this.recortar(this.getCasaB()*arr[i][j-1]+this.probaCasa*arr[i-1][j]);
        console.log("posicionDerecha");
        console.log(arr[i][j-1]);
        console.log("PrbaVisita");
        console.log(this.getCasaB());
        console.log("posicionArriba");
        console.log(arr[i-1][j]);
        console.log("PrbaCasa");
        console.log(this.probaCasa);
        console.log("Calculo");
        console.log(calculo);
        arr[i][j]=calculo;

      }else{
        if(this.formato[diferencia]=="V"){
            let calculo=0;
            calculo=this.recortar(this.getVisitaB()*arr[i][j-1]+this.getVisitaA()*arr[i-1][j]);
            arr[i][j]=calculo;
        }
      }
      
    }
  }
  console.log(arr);
  this.showResult(arr);
  
}




  algoritmo(){
    let arr=[];
    let pr=[];
    let i=0;
    let cont=0;
    

    let j=0;
   while(cont<this.numJuegos){
    let array2=new Array(this.numJuegosTabla);
    let array =new Array(this.numJuegosTabla);
    let array3=new Array(this.numJuegosTabla);
    for(i=1;i<this.numJuegos;i++){
      console.log("que esta pas");
      array[i]=1;
      console.log(array);
      
    }
    arr.push(array);
    console.log("primer push")
    console.log(arr);
    for(i=1;i<array2.length;i++){
      for(j=0;j<array2.length;j++){
        array2[j]=0;
      }
      arr.push(array2);
      
    }

    console.log("Total")
    console.log(arr);
    cont+=1;

   }
   
   /*
    
  
    console.log("Total")
    console.log(arr);
    
   for(i=1;i<array.length;i++){
      arr[0][1]=1;
    }
    console.log("Total")
    console.log(arr);
    let dif=0;
    let dif2=0;
    let diferencia=0;
    for(i=0;i<array2.length;i++){
      dif=this.numJuegosTabla-i;
      for(j=0;j<array2.length;j++){
        
        dif2=this.numJuegosTabla-j;
        diferencia=dif+dif2;
        console.log("formato");
        console.log(this.formato);
        console.log(diferencia);
        console.log(this.formato[diferencia]);
        
          if(this.formato[diferencia]=="C"){
            let calculo=0;
            calculo=this.probaVisita*arr[i][j-1]+this.probaCasa*arr[i-1][j];
            console.log("calculo");
            console.log(calculo);
            //arr[i][j]=calculo;
            const newData=arr[i][j].map((x:any)=>({
              estado: x.estado===0 ? calculo: x.estado===1 ? 1:1
            }))
            //array3[j]=calculo;
            console.log(arr);
          }else{
            let calculo=0;
            calculo=this.getCasaB()*arr[i][j-1]+this.getVisitaA()*arr[i-1][j];
            const newData=arr[i][j].map((x:any)=>({
              estado: x.estado===0 ? calculo: x.estado===1 ? 1:1
            }))
            //arr[i][j]=calculo;
            //array3[j]=calculo;
          }
          //console.log(newData);


       
        

      }
      pr.push(array3);
      
      
    }
    console.log("ultimo");*/
    
    
    

    

  }
  contJuegosV(){
    if(isNaN(this.numJuegos) || isNaN(this.probaCasa)|| isNaN(this.probaVisita) ){
    
      alert("Ingrese valores numéricos"); 
      return; 
    }else{
      if(this.contadorFormato==this.numJuegos){
        this.bandera2=true;
        alert("LLegaste el limite "); 
        return;
      }
      else{
        
        this.contadorFormato+=1;
        this.formato.push("V");
      }
    }
    
  }
  getFormato(){
    return this.formato;
  }

}
