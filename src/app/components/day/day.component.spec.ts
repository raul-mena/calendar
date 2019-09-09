import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayComponent } from './day.component';
import { CommonModule } from '@angular/common';

describe('DayComponent', () => {
  let component: DayComponent;
  let fixture: ComponentFixture<DayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule
      ],
      declarations: [ DayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayComponent);
    component = fixture.componentInstance;
    component.day = {
        year: 2019,
        month: 9,
        date: 5,
        isThisMonth: false,
        isToday: false,
        isSelect: false,
        hasEvent: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
