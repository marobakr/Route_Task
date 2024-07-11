import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  SimpleChanges,
  OnInit,
  OnChanges,
} from '@angular/core';
import { IAllDataCustomer, ITransaction } from '../../interface';
import { SearchPipe } from '../../pipes/search.pipe';
import { DataService } from '../../services/data.service';
import { TransactionChartComponent } from '../transaction-chart/transaction-chart.component';
import { MatButtonModule } from '@angular/material/button';

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
  constructor(private _dataService: DataService) {}
  @Input({ required: true }) combinedData: IAllDataCustomer[] = [];
  searchValue: number = 0;
  selectedCustomerTransactions: ITransaction[] = [];

  ngOnChanges(): void {
    this._dataService.inputValueSubject.subscribe(
      (data) => (this.searchValue = data)
    );
  }
  selectCustomerTransactions(transactions: ITransaction[]): void {
    this.selectedCustomerTransactions = transactions;
  }
}
