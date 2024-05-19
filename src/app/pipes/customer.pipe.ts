import { Pipe, PipeTransform } from '@angular/core';
import { CustomerModel } from '../models/customerModel';

@Pipe({
  name: 'customer',
  standalone: true
})
export class CustomerPipe implements PipeTransform {

  transform(value: CustomerModel[], search: string): CustomerModel[] {
    if (search === '') return value;
    search = search.toLocaleLowerCase();
    return value.filter(customer =>
        Object.values(customer).some(val =>
            typeof val === 'string' && val.toLocaleLowerCase().includes(search)
        )
    );
}
}
