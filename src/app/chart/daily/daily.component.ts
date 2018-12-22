import { Component, OnInit } from '@angular/core';
import { Metric } from '../../model/metric.dto';
import { MetricsService } from '../../service/metrics.service';
import { Util } from '../../service/util.service';
import { ChartData } from '../chart-data';

const HOURS: number[] = Array.from(Array(24).keys());

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})
export class DailyComponent implements OnInit {

  public lineChartData: ChartData[] = [{ data: [], label: 'Kilo Watt hours' }];
  public lineChartLabels: string[] = this.getLineChartLabels();

  constructor(private _metricsService: MetricsService) { }

  ngOnInit() {
    this._metricsService.metricsAdded.subscribe((metric: Metric) => this.onMetricReceived(metric));
  }

  private onMetricReceived(metric: Metric): void {
    const data: number[] = Util.rotate(metric.by_hour, new Date().getHours() + 1);
    data.forEach((value, index) => data[index] = data[index] / 1000);

    this.lineChartData[0].data = data;

    // recreate the data object, so that rerendering is triggered
    const clone = JSON.parse(JSON.stringify(this.lineChartData));
    this.lineChartData = clone;
  }

  private generateLabel(hour: number): string {
    if (hour === 23) {
      return '23-00';
    }
    const fromHour: string = hour + '';
    const toHour: string = hour + 1 + '';
    return fromHour.padStart(2, '0') + ':00 - ' + toHour.padStart(2, '0') + ':00';
  }

  private getLineChartLabels(): string[] {
    const currentHour = new Date().getHours();
    const minutes = Array.from(Array(24).keys());

    return Util.rotate(minutes, currentHour + 1)
      .map(it => this.generateLabel(it));
  }
}
