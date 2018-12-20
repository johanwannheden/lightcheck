import { Component, OnInit } from '@angular/core';
import { ConnectionStatus, MqttService, SubscriptionGrant } from 'ngx-mqtt-client';
import { Metric } from './model/metric.dto';
import { MetricsService } from './status/metrics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public status: string[] = [];

  constructor(
    private _mqttService: MqttService,
    private _metricsService: MetricsService
  ) {
    this._mqttService.status().subscribe((s: ConnectionStatus) => {
      const status = s === ConnectionStatus.CONNECTED ? 'CONNECTED' : 'DISCONNECTED';
      this.status.push(`Mqtt client connection status: ${status}`);
    });
  }

  private _subscribe(): void {
    this._mqttService.subscribeTo<Metric>('light/metrics')
      .subscribe({
        next: (msg: SubscriptionGrant | Metric) => {
          if (msg instanceof SubscriptionGrant) {
            this.status.push('Subscribed to light/metrics topic!');
          } else {
            this._metricsService.registerData(msg);
          }
        },
        error: (error: Error) => {
          this.status.push(`Something went wrong: ${error.message}`);
        }
      });
  }

  public ngOnInit(): void {
    this._subscribe();
  }
}
