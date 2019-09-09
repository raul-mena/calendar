import { Component, Output, EventEmitter, Input } from '@angular/core';
import { EventModel } from '../../models/Event.model';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent {
  //options to emit data
  @Output() getNewValues = new EventEmitter<EventModel>();
  @Output() ondeleteEvent = new EventEmitter<EventModel>();
  
  @Input() currentEvent: EventModel;
  mytime: Date = new Date();
  constructor() { }

  submitData(){
    //get all the values
    let newValues = Object.assign({}, this.currentEvent)
    //add time
    newValues.time = this.mytime;
    this.getNewValues.emit(newValues);
  }

  deleteEvent(){
    this.ondeleteEvent.emit(this.currentEvent);
  }
}
