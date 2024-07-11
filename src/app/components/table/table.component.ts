import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  SimpleChanges,
  OnInit,
  OnChanges,
} from '@angular/core';
import { IAllDataCustomer } from '../../interface';
import { SearchPipe } from '../../pipes/search.pipe';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, SearchPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnChanges {
  constructor(private _dataService: DataService) {}
  searchValue: number = 0;
  @Input({ required: true }) combinedData: IAllDataCustomer[] = [];

  ngOnChanges(): void {
    this._dataService.inputValueSubject.subscribe(
      (data) => (this.searchValue = data)
    );
    console.log(this.searchValue);
  }
}
