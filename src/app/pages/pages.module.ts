import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';

//ng2-charts
import { ChartsModule } from 'ng2-charts';




//Modulos
import { SharedModule } from '../shared/shared.module';

//Rutas
import { PAGES_ROUTES } from './pages.routes';

@NgModule({
  declarations: [
    PagesComponent,
 		DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficoDonaComponent
  ],
  exports: [
  	DashboardComponent,
    ProgressComponent,
    Graficas1Component,
  ],
  imports: [
   	SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: []
})
export class PagesModule { }