import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { IAllDataCustomer, ITransaction } from '../../interface';
import { SearchPipe } from '../../pipes/search.pipe';
import { DataService } from '../../services/data.service';
import { TransactionChartComponent } from '../transaction-chart/transaction-chart.component';
import { MatButtonModule } from '@angular/material/button';

/**
 * Table component to display customers and their transactions.
 */
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    SearchPipe,
    TransactionChartComponent,
    MatButtonModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnChanges {
  /**
   * Input property to receive combined customer and transaction data.
   */
  @Input({ required: true }) combinedData: IAllDataCustomer[] = [];

  /**
   * Search value for filtering customer.
   */
  searchValue: number = 0;

  /**
   * Array to hold transactions of the selected customer.
   */
  selectedCustomerTransactions: ITransaction[] = [];

  /**
   * @param _dataService - Service to handle data operations.
   */
  constructor(private _dataService: DataService) {}

  /**
   * Used to subscribe to search value changes from the data service.
   */
  ngOnChanges(): void {
    this._dataService.inputValueSubject.subscribe(
      (data) => (this.searchValue = data)
    );
  }

  /**
   * Method to set the transactions of the selected customer.
   * @param transactions - Array of transactions for the selected customer.
   */
  selectCustomerTransactions(transactions: ITransaction[]): void {
    this.selectedCustomerTransactions = transactions;
  }
}
