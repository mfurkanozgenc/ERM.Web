import { Pipe, PipeTransform } from '@angular/core';
import { RecipeDetailModel } from '../models/RecipeDetailModel';

@Pipe({
  name: 'recipeDetail',
  standalone: true
})
export class RecipeDetailPipe implements PipeTransform {

  transform(value: RecipeDetailModel[], search: string): RecipeDetailModel[] {
    if (search === '') return value;
    search = search.toLocaleLowerCase();
    return value.filter(product =>
        Object.values(product).some(val =>
            typeof val === 'string' && val.toLocaleLowerCase().includes(search)
        )
    );
}

}
