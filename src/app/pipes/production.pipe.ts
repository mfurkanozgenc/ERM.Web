import { Pipe, PipeTransform } from '@angular/core';
import { ProductionModel } from '../models/productionModel';

@Pipe({
  name: 'production',
  standalone: true
})
export class ProductionPipe implements PipeTransform {

  transform(value: ProductionModel[], search: string): ProductionModel[] {
    if (search === '') return value;
    search = search.toLocaleLowerCase();
    return value.filter((depot) =>
      Object.values(depot).some(
        (val) =>
          typeof val === 'string' && val.toLocaleLowerCase().includes(search)
      )
    );
  }

}
