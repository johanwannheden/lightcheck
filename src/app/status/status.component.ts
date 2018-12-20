import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConnectionStatus, MqttService } from 'ngx-mqtt-client';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Data } from '../model/data.dto';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit, OnDestroy {

  public state$: Observable<string>;
  public data$: Observable<Data>;

  private _destroy$ = new Subject<void>();

  constructor(
    private _mqttService: MqttService,
    private _dataService: DataService) { }

  ngOnInit() {
    this.state$ = this._mqttService.status()
      .pipe(
        map((s: ConnectionStatus) => s === ConnectionStatus.CONNECTED ? 'Connected' : 'Disconnected')
      );
    this.data$ = this._dataService.dataAdded
      .pipe(
        map((data: Data) => data)
      );
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
  }
}
