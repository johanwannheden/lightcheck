import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { NgxMqttClientModule } from 'ngx-mqtt-client';
import { AppComponent } from './app.component';
import { MetricComponent } from './chart/metric/metric.component';
import { MetricsService } from './service/metrics.service';
import { StatusComponent } from './status/status.component';


@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    MetricComponent
  ],
  imports: [
    BrowserModule,

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
  providers: [MetricsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
