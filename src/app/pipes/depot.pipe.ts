import { Pipe, PipeTransform } from '@angular/core';
import { DepotModel } from '../models/depotModel';

@Pipe({
  name: 'depot',
  standalone: true
})
export class DepotPipe implements PipeTransform {

  transform(value: DepotModel[], search: string): DepotModel[] {
    if (search === '') return value;
    search = search.toLocaleLowerCase();
    return value.filter(depot =>
        Object.values(depot).some(val =>
            typeof val === 'string' && val.toLocaleLowerCase().includes(search)
        )
    );
}

}
