import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { forkJoin } from 'rxjs';
import { TableComponent } from '../table/table.component';
import { ICustomer, ITransaction } from '../../interface';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent {
  constructor(private dataService: DataService) {}

  combinedData: any[] = [];

  ngOnInit(): void {
    this.loadData();
    console.log(this.combinedData);
  }

  loadData(): void {
    forkJoin({
      customers: this.dataService.getCustomers(),
      transactions: this.dataService.getTransactions(),
    }).subscribe(
      ({ customers, transactions }) => {
        this.combinedData = this.mergeData(customers, transactions);
      },
      (error: Error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  mergeData(customers: ICustomer[], transactions: ITransaction[]): any[] {
    console.log(customers);

    return customers.map((customer) => ({
      ...customer,

      transactions: transactions.filter((x) => x.customer_id == customer.id),
    }));
  }
}
