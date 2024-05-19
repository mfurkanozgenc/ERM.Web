import { Pipe, PipeTransform } from '@angular/core';
import { RecipeModel } from '../models/RecipeModel';

@Pipe({
  name: 'recipe',
  standalone: true
})
export class RecipePipe implements PipeTransform {

  transform(value: RecipeModel[], search: string): RecipeModel[] {
    if (search === '') return value;
    search = search.toLocaleLowerCase();
    return value.filter(product =>
        Object.values(product).some(val =>
            typeof val === 'string' && val.toLocaleLowerCase().includes(search)
        )
    );
}

}
