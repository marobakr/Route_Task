import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataService } from '../../services/data.service';

/**
 * Header component for the application.
 */
@Component({
  selector: 'app-headr',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './headr.component.html',
  styleUrl: './headr.component.scss',
})
export class HeadrComponent implements OnInit {
  /**
   * Form control for the search input.
   */
  searchControl!: FormControl;

  /**
   * Constructor to inject necessary services.
   * @param _dataService - Service to handle data operations.
   */
  constructor(private _dataService: DataService) {}

  /**
   * Used to initialize the form control.
   */
  ngOnInit(): void {
    this.createControl();
  }

  /**
   * Method to create and configure the search form control.
   */
  createControl(): void {
    this.searchControl = new FormControl();
    this.searchControl.valueChanges.subscribe((value) => {
      /* Check If Input Not number  */
      if (isNaN(value)) {
        const newValue = value.replace(/[a-zA-Z]/g, '');
        this.searchControl.setValue(newValue, { emitEvent: false });
      }
    });
  }

  /**
   * Method to handle input changes and update the data service with the new value.
   */
  onInputChange(): void {
    this._dataService.inputValueSubject.next(this.searchControl.value);
  }
  /**
   * Method to reset the search input and update the data service.
   */
}
