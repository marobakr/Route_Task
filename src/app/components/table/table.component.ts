import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  /**
   * @param _dataService - Service to handle data operations.
   */
  constructor(
    private _dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}

  /**
   * Input property to receive combined customer and transaction data.
   */
  @Input({ required: true }) combinedData: IAllDataCustomer[] = [];

  /**
   * Search value for filtering customers.
   */
  searchValue!: number;

  /**
   * Flag to indicate if there are customers available.
   */
  itemLengthCustomers: boolean = true;

  /**
   * Array to hold transactions of the selected customer.
   */
  selectedCustomerTransactions: ITransaction[] = [];

  /**
   * @param changes - The changes object containing current and previous values.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this._dataService.inputValueSubject.subscribe((data) => {
        this.searchValue = data;
        this.cdr.detectChanges(); // Trigger change detection
      });
      this.subscribeToGetLength();
    }
  }

  /**
   * Method to set the transactions of the selected customer.
   * @param transactions - Array of transactions for the selected customer.
   */
  selectCustomerTransactions(transactions: ITransaction[]): void {
    this.selectedCustomerTransactions = transactions;
  }

  /**
   * Subscribes to the result of search to update item length visibility.
   */
  subscribeToGetLength(): void {
    this._dataService.resultOfSearch.subscribe((data) => {
      this.itemLengthCustomers = data > 0;
    });
  }
}
