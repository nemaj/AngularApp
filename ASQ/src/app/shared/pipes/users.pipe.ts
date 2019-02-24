import { Pipe, PipeTransform } from '@angular/core';

export interface Users {
  name: string;
}

@Pipe({
  name: 'usersFilter'
})
export class UsersPipe implements PipeTransform {
  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => {
      const i = item.lastName.toLowerCase();
      return i.indexOf(filter.toLowerCase()) !== -1;
    });
  }
}
