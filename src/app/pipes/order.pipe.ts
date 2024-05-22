import { Pipe, PipeTransform } from '@angular/core';
import { OrderModel } from '../models/orderModel';

@Pipe({
  name: 'order',
  standalone: true
})
export class OrderPipe implements PipeTransform {

  transform(value: OrderModel[], search: string): OrderModel[] {
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
