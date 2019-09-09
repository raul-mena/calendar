import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {

  private appKey = '05f8c9f3340dd81439556059b33c6b24';
  private url = 'http://api.openweathermap.org/data/2.5/forecast?q=';
  
  constructor(
    private _http: HttpClient
  ) { }

  getDefaulweather(city){
    return this._http.get(this.url + city + '&APPID=' + this.appKey);
  }
}
