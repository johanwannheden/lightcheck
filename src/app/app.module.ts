import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { NgxMqttClientModule } from 'ngx-mqtt-client';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { DailyComponent } from './chart/daily/daily.component';
import { HourlyComponent } from './chart/hourly/hourly.component';
import { DataPipe } from './pipe/data.pipe';
import { DataService } from './service/data.service';
import { MetricsService } from './service/metrics.service';
import { StatusComponent } from './status/status.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/hourly', pathMatch: 'full' },
  { path: 'hourly', component: HourlyComponent },
  { path: 'daily', component: DailyComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    DailyComponent,
    HourlyComponent,
    DataPipe,
    ChartComponent,
  ],
  imports: [
    BrowserModule,

    RouterModule.forRoot(appRoutes),

    // ng-charts
    ChartsModule,

    // ngx-mqtt-client
    NgxMqttClientModule.withOptions({
      host: 'diskstation',
      protocol: 'ws',
      port: 9001,
      path: '/ws',
      keepalive: 5
    })
  ],
  providers: [
    DataService,
    MetricsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
