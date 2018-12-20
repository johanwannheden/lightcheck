import { Component, OnInit } from '@angular/core';
import { Metric } from '../../model/metric.dto';
import { MetricsService } from '../../service/metrics.service';

@Component({
  selector: 'app-metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.css']
})
export class MetricComponent implements OnInit {

  public lineChartData: ChartData[] = [{ data: [], label: 'Ticks by the hour' }];
  public lineChartLabels: string[] = [
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
    '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

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
  label: string
}