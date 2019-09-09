import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModalComponent } from './form-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { EventModel } from 'src/app/models/Event.model';

describe('FormModalComponent', () => {
  let component: FormModalComponent;
  let fixture: ComponentFixture<FormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        TimepickerModule.forRoot()
      ],
      declarations: [ FormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModalComponent);
    component = fixture.componentInstance;
    component.currentEvent = new EventModel();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
