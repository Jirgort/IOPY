import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import{PrincipalComponent}from "./Components/principal/principal.component"
import{RutasCortasComponent} from "./Components/rutas-cortas/rutas-cortas.component"
import{AppComponent}from "../app/app.component"
import{ProblemaMochilaComponent} from "./Components/problema-mochila/problema-mochila.component"
import{ReemplazoEquiposComponent} from "./Components/reemplazo-equipos/reemplazo-equipos.component"
import{ArbolesBinariosComponent} from "./Components/arboles-binarios/arboles-binarios.component"
import{SeriesDeportivasComponent}from "./Components/series-deportivas/series-deportivas.component"
import{MultiplicacionMatricesComponent}from "./Components/multiplicacion-matrices/multiplicacion-matrices.component"

const routes: Routes = [
  {
  path:'',
  component: PrincipalComponent
},
{path:'rutas-mas-cortas',
component: RutasCortasComponent
},
{
  path:'problema-mochila',
  component:ProblemaMochilaComponent
},
{
  path:'reemplazo-equipos',
  component:ReemplazoEquiposComponent
},
{
  path:'arboles-binarios-de-busqueda',
  component:ArbolesBinariosComponent
},
{
  path:'series-deportivas',
  component:SeriesDeportivasComponent
},
{
  path:'multiplicacion-de-matrices',
  component:MultiplicacionMatricesComponent
}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
