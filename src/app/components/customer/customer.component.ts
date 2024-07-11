import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { forkJoin } from 'rxjs';
import { TableComponent } from '../table/table.component';
import { ICustomer, ITransaction } from '../../interface';

/**
 * Component to display customers and their transactions.
 */
@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent implements OnInit {
  /**
   * Combined data of customers and their respective transactions.
   */
  combinedData: any[] = [];

  /**
   * Constructor to inject necessary services.
   * @param dataService - Service to fetch customer and transaction data.
   */
  constructor(private dataService: DataService) {}

  /**
   * Used to load the customer and transaction data.
   */
  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Method to load customer and transaction data using forkJoin to handle parallel requests.
   */
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

  /**
   * Method to merge customers and transactions data.
   * @param customers - Array of customer objects.
   * @param transactions - Array of transaction objects.
   * @returns Array of merged customer and transaction data.
   */
  mergeData(customers: ICustomer[], transactions: ITransaction[]): any[] {
    return customers.map((customer) => ({
      ...customer,
      transactions: transactions.filter((x) => x.customer_id == customer.id),
    }));
  }
}
