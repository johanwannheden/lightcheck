import { EventEmitter, Injectable } from '@angular/core';
import { Metric } from '../model/metric.dto';

@Injectable()
export class MetricsService {

  private _metrics: Metric[] = [];

  public metricsAdded = new EventEmitter<Metric>();

  public registerData(metric: Metric): void {
    if (metric) {
      this._metrics.push(metric);
      this.metricsAdded.emit(metric);
    }
  }

}