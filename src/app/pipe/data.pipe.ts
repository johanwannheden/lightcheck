import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Data } from '../model/data.dto';

@Pipe({
    name: 'appData$',
    pure: true
})
export class DataPipe implements PipeTransform {
    transform(value$: Observable<Data>): Observable<DataSummary | never> {
        if (!value$) {
            return Observable.empty();
        }
        return value$.pipe(map((data: Data) => {
            return { received: data.stamp, interval: data.interval };
        }));
    }
}

export interface DataSummary {
    received: string,
    interval: number
}