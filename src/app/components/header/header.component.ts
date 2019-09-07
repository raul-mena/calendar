import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() displayYear: any;
  @Input() displayMonth: any;
  //weekHead: any;
  monthsArray: any =  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  @Output() onMonthSelect = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  back() {
    // Decrementing the year if necessary
    if (this.displayMonth === 0) {
        this.displayYear--;
        this.displayMonth = 11;
    } else {
        this.displayMonth--;
    }
    this.onMonthSelect.emit({
      'year': this.displayYear,
      'month': this.displayMonth
    });
}

forward() {
    // Incrementing the year if necessary
    if (this.displayMonth === 11) {
        this.displayYear++;
        this.displayMonth = 0;
    } else {
        this.displayMonth++;
    }
    this.onMonthSelect.emit({
      'year': this.displayYear,
      'month': this.displayMonth
    });
}

}
