import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';


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
  ],
  exports: [
  	DashboardComponent,
    ProgressComponent,
    Graficas1Component,
  ],
  imports: [
   	SharedModule,
    PAGES_ROUTES
  ],
  providers: [],
  bootstrap: []
})
export class PagesModule { }