import { Pipe, PipeTransform } from '@angular/core';
import { InvoiceModel } from '../models/invoiceModel';

@Pipe({
  name: 'invoice',
  standalone: true
})
export class InvoicePipe implements PipeTransform {

  transform(value: InvoiceModel[], search: string): InvoiceModel[] {
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
