import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProfileComponent } from './profile/profile.component';

import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

//ng2-charts
import { ChartsModule } from 'ng2-charts';


//Pipes
import { PipesModule } from '../pipes/pipes.module';


//Modulos
import { SharedModule } from '../shared/shared.module';

//Rutas
import { PAGES_ROUTES } from './pages.routes';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
  declarations: [
    PagesComponent,
 		DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficoDonaComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent

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
    ChartsModule,
    PipesModule,
    CommonModule
  ],
  providers: [],
  bootstrap: []
})
export class PagesModule { }