import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { dateObj } from '../../models/Day.model';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  

  @Input() day: any;
  @Output() onDaySelect = new EventEmitter<dateObj>();
  constructor() { }

  ngOnInit() {
  }

  // Select a day, click event
  daySelect(day) {
    console.log('day', this.day);
    this.onDaySelect.emit(day);
  }

}
