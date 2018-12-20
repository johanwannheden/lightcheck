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
  public lineChartLabels: string[] = HOURS.map(it => this.generateLabel(it));

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

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  constructor(private _metricsService: MetricsService) { }

  ngOnInit() {
    this._metricsService.metricsAdded.subscribe((metric: Metric) => this.onMetricReceived(metric));
  }

  private onMetricReceived(metric: Metric): void {
    this.lineChartData[0].data = metric.by_hour.slice();

    let clone = JSON.parse(JSON.stringify(this.lineChartData));
    this.lineChartData = clone;
  }

  private generateLabel(hour: number): string {
    if (hour == 0) {
      return '23-00';
    }
    const fromHour: string = hour - 1 + '';
    const toHour: string = hour + '';
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
  data: number[],
  label: string | string[]
}