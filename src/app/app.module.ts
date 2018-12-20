import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMqttClientModule } from 'ngx-mqtt-client';
import { AppComponent } from './app.component';
import { MetricsService } from './status/metrics.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

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
