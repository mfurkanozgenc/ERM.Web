import { Pipe, PipeTransform } from '@angular/core';
import { OrderDetailModel } from '../models/orderDetailModel';

@Pipe({
  name: 'orderDetail',
  standalone: true
})
export class OrderDetailPipe implements PipeTransform {

  transform(value: OrderDetailModel[], search: string): OrderDetailModel[] {
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
