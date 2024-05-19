import { Pipe, PipeTransform } from '@angular/core';
import { ProductModel } from '../models/productModel';

@Pipe({
  name: 'product',
  standalone: true
})
export class ProductPipe implements PipeTransform {

  transform(value: ProductModel[], search: string): ProductModel[] {
    if (search === '') return value;
    search = search.toLocaleLowerCase();
    return value.filter(product =>
        Object.values(product).some(val =>
            typeof val === 'string' && val.toLocaleLowerCase().includes(search)
        )
    );
}

}
