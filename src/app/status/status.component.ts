import { Component, OnInit } from '@angular/core';
import { ConnectionStatus, MqttService } from 'ngx-mqtt-client';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  public state: Observable<string>;

  constructor(private _mqttService: MqttService) { }

  ngOnInit() {
    this.state = this._mqttService.status()
      .pipe(
        map((s: ConnectionStatus) => s === ConnectionStatus.CONNECTED ? 'Connected' : 'Disconnected')
      );
  }

}
