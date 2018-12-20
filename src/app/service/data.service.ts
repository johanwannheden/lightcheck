import { EventEmitter, Injectable } from "@angular/core";
import { Data } from "../model/data.dto";

@Injectable()
export class DataService {
    private _data: Data[] = [];

    public dataAdded = new EventEmitter<Data>();

    public registerData(data: Data): void {
        if (data && data.stamp && data.interval && data.light) {
            this._data.push(data);
            this.dataAdded.emit(data);
        }
    }
} 