import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './Components/principal/principal.component';
import { RutasCortasComponent } from './Components/rutas-cortas/rutas-cortas.component';
import { ProblemaMochilaComponent } from './Components/problema-mochila/problema-mochila.component';
import { ReemplazoEquiposComponent } from './Components/reemplazo-equipos/reemplazo-equipos.component';
import { ArbolesBinariosComponent } from './Components/arboles-binarios/arboles-binarios.component';
import { SeriesDeportivasComponent } from './Components/series-deportivas/series-deportivas.component';
import { MultiplicacionMatricesComponent } from './Components/multiplicacion-matrices/multiplicacion-matrices.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    RutasCortasComponent,
    ProblemaMochilaComponent,
    ReemplazoEquiposComponent,
    ArbolesBinariosComponent,
    SeriesDeportivasComponent,
    MultiplicacionMatricesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
