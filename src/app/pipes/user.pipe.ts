import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../models/userModel';

@Pipe({
  name: 'user',
  standalone: true
})
export class UserPipe implements PipeTransform {

  transform(value: UserModel[], search: string): UserModel[] {
    if (search === '') return value;
    search = search.toLocaleLowerCase();
    return value.filter(product =>
        Object.values(product).some(val =>
            typeof val === 'string' && val.toLocaleLowerCase().includes(search)
        )
    );
}

}
