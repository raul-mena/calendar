import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { EventModel } from '../../models/Event.model';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent implements OnInit {
  
  @Output() getNewValues = new EventEmitter<EventModel>();
  @Output() ondeleteEvent = new EventEmitter<EventModel>();
  
  @Input() currentEvent: EventModel;
  mytime: Date = new Date();
  constructor() { }

  ngOnInit() {
  }

  submitData(){
    let newValues = Object.assign({}, this.currentEvent)
    newValues.time = this.mytime;
    this.getNewValues.emit(newValues);
  }

  deleteEvent(){
    this.ondeleteEvent.emit(this.currentEvent);
  }
}
