import { TestBed } from '@angular/core/testing';

import { OpenWeatherService } from './open-weather.service';
import { HttpClientModule } from '@angular/common/http';

describe('OpenWeatherService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: OpenWeatherService = TestBed.get(OpenWeatherService);
    expect(service).toBeTruthy();
  });
});
