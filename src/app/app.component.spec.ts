import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DayComponent } from './components/day/day.component';
import { HeaderComponent } from './components/header/header.component';
import { FormModalComponent } from './components/form-modal/form-modal.component';
import { WeatherComponent } from './components/weather/weather.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { EventModel } from './models/Event.model';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ModalModule.forRoot(),
        TimepickerModule.forRoot(),
        RouterTestingModule
      ],
      declarations: [
        AppComponent, 
        DayComponent,
        HeaderComponent,
        FormModalComponent,
        WeatherComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have month array', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const comp = fixture.componentInstance;
    expect(comp.dateArray.length).toBeGreaterThanOrEqual(10);
  });

  it('should save event on month day array', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const comp = fixture.componentInstance;
    const day = {...comp.dateArray[0]};
    let dummyData = {
      day,
      event: day.hasEvent
    }
    comp.openModal(dummyData);
    dummyData.event = new EventModel('Test', 'Arandas', '#fff', new Date())
    comp.setEvent(dummyData.event);
    expect(comp.dateArray[0].hasEvent[0].reminder).toEqual(dummyData.event.reminder);
  });

});
