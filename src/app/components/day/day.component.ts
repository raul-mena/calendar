import { Component, Output, Input, EventEmitter } from '@angular/core';
import { dateObj } from '../../models/Day.model';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent {
  
  @Input() day: any;
  @Output() onDaySelect = new EventEmitter<dateObj>();
  @Output() onViewDate = new EventEmitter<dateObj>();

  constructor() {}
  
  // Select a day, click event
  daySelect(day) {
    this.onDaySelect.emit(day);
  }

  openModalWithComponent(eventSelected) {
    /* this is how we open a Modal Component from another component */
    this.onViewDate.emit(eventSelected)
  }
}
