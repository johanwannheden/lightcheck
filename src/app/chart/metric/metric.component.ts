import { Component, OnInit } from '@angular/core';
import { Metric } from '../../model/metric.dto';
import { MetricsService } from '../../service/metrics.service';

const HOURS: number[] = Array.from(Array(24).keys());

@Component({
  selector: 'app-metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.css']
})
export class MetricComponent implements OnInit {

  public lineChartData: ChartData[] = [{ data: [], label: 'Impulses' }];
  public lineChartLabels: string[] = this.getLineChartLabels();

  public lineChartOptions: any = { responsive: true };

  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];

  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor(private _metricsService: MetricsService) { }

  ngOnInit() {
    this._metricsService.metricsAdded.subscribe((metric: Metric) => this.onMetricReceived(metric));
  }

  private getHoursFromNow(): number[] {
    const currentHour = new Date().getHours();
    const hoursFromMidnight = Array.from(Array(24).keys());
    const hoursFromNow = new Array<number>(24);

    hoursFromMidnight.forEach((value, index) => {
      if (index < currentHour) {
        hoursFromNow[hoursFromNow.length - (currentHour - index)] = value;
      } else {
        hoursFromNow[index - currentHour] = value;
      }
    });

    return hoursFromNow;
  }

  private getLineChartLabels(): string[] {
    return this.getHoursFromNow().map(it => this.generateLabel(it));
  }

  private onMetricReceived(metric: Metric): void {
    const hourlyValues = new Array<number>(24);
    this.getHoursFromNow().forEach((value, index) => {
      hourlyValues[index] = metric.by_hour[value];
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
    return fromHour.padStart(2, '0') + '-' + toHour.padStart(2, '0');
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}

interface ChartData {
  data: number[];
  label: string | string[];
}
