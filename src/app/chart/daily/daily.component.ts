import { Component, OnInit } from '@angular/core';
import { Metric } from '../../model/metric.dto';
import { MetricsService } from '../../service/metrics.service';
import { ChartData } from '../chart-data';

const HOURS: number[] = Array.from(Array(24).keys());

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})
export class DailyComponent implements OnInit {

  public lineChartData: ChartData[] = [{ data: [], label: 'kW' }];
  public lineChartLabels: string[] = this.getLineChartLabels();

  constructor(private _metricsService: MetricsService) { }

  ngOnInit() {
    this._metricsService.metricsAdded.subscribe((metric: Metric) => this.onMetricReceived(metric));
  }

  private getHoursFromNow(): number[] {
    const currentHour = new Date().getHours();
    const hoursFromMidnight = Array.from(Array(24).keys());

    const left = hoursFromMidnight.slice(currentHour, hoursFromMidnight.length);
    const right = hoursFromMidnight.slice(0, currentHour);

    return [...left, ...right];
  }

  private getLineChartLabels(): string[] {
    return this.getHoursFromNow().map(it => this.generateLabel(it));
  }

  private onMetricReceived(metric: Metric): void {
    const hourlyValues = new Array<number>(24);
    this.getHoursFromNow().forEach((value, index) => {
      // convert impulses to kW values: 1000 impulses correspond to 1 kWh
      hourlyValues[index] = metric.by_hour[value] / 1000;
    });

    this.lineChartData[0].data = hourlyValues;

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
}
