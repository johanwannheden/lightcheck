import { Component, OnInit } from '@angular/core';
import { Metric } from '../../model/metric.dto';
import { MetricsService } from '../../service/metrics.service';
import { Util } from '../../service/util.service';
import { ChartData } from '../chart-data';

@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.css']
})
export class HourlyComponent implements OnInit {

  public lineChartData: ChartData[] = [{ data: [], label: 'Kilo Watt minutes' }];
  public lineChartLabels: string[] = this.getLineChartLabels();

  constructor(private _metricsService: MetricsService) { }

  ngOnInit() {
    this._metricsService.metricsAdded.subscribe((metric: Metric) => this.onMetricReceived(metric));
  }

  private onMetricReceived(metric: Metric): void {
    const data: number[] = Util.rotate(metric.by_minute, new Date().getMinutes());
    data.forEach((value, index) => data[index] = data[index] / 1000);

    this.lineChartData[0].data = data;

    // recreate the data object, so that rerendering is triggered
    const clone = JSON.parse(JSON.stringify(this.lineChartData));
    this.lineChartData = clone;
  }

  private getLineChartLabels(): string[] {
    const currentMinute = new Date().getMinutes();
    const minutes = Array.from(Array(60).keys());

    return Util.rotate(minutes, currentMinute)
      .map((it: number) => it + '')
      .map((it: string) => it.padStart(2, '0'));
  }
}
