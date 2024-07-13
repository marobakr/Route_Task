import { Pipe, PipeTransform } from '@angular/core';
import { IAllDataCustomer } from '../interface';
import { DataService } from '../services/data.service';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  private resultOfSearch: IAllDataCustomer[] = [];
  constructor(private _dataService: DataService) {}
  transform(
    userData: IAllDataCustomer[],
    searchProp: { id?: number; amount?: number }
  ): IAllDataCustomer[] {
    this.resultOfSearch = userData; // Default value
    if (searchProp.id || searchProp.amount) {
      if (searchProp.id) {
        this.resultOfSearch = userData.filter(
          (customer) => customer.id === searchProp.id
        );
      } else if (searchProp.amount) {
        this.resultOfSearch = userData.filter((customer) =>
          customer.transactions.some((x) => x.amount === searchProp.amount)
        );
      }
    }

    // Update search result for other components To update length
    this._dataService.resultOfSearch.next(this.resultOfSearch.length);
    return this.resultOfSearch;
  }
}
