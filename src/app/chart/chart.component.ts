import { Component, Input } from '@angular/core';
import { ChartData } from './chart-data';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  @Input('lineChartData') // tslint:disable-next-line:no-input-rename
  public lineChartData: ChartData[];

  @Input('lineChartLabels') // tslint:disable-next-line:no-input-rename
  public lineChartLabels: string[];

  public lineChartOptions: any = { responsive: true };

  public lineChartLegend = true;
  public lineChartType = 'line';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}

