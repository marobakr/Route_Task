import { Pipe, PipeTransform } from '@angular/core';
import { IAllDataCustomer } from '../interface';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(
    userData: IAllDataCustomer[],
    searchProp: { id?: number; amount?: number }
  ): IAllDataCustomer[] {
    if (searchProp.id && searchProp.id <= 5) {
      return userData.filter((customer) => customer.id == searchProp.id);
    } else if (searchProp.amount) {
      return userData.filter((customer) =>
        customer.transactions.some((x) => x.amount == searchProp.amount)
      );
    } else return userData;
  }
}
