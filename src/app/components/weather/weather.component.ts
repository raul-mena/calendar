import { Component, OnInit } from '@angular/core';
import { OpenWeatherService } from '../../services/open-weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  humidity: any = 0;
  pressure: any = 0;
  temp_max: any = 0;
  temp_min: any = 0;

  searcher =  'Guadalajara,MX'

  constructor(
    private weatherService: OpenWeatherService
  ) { }

  ngOnInit() {
    this.getWeather();
  }

  getWeather(){
    this.resetValues();
    this.weatherService.getDefaulweather(this.searcher).subscribe((res: any) => {
      if (res.list) {
        res.list.map((element: any) => {
          this.humidity += element.main.humidity;
          this.pressure += element.main.pressure;
          this.temp_max += element.main.temp_max;
          this.temp_min += element.main.temp_min;
        });
        this.humidity = (this.humidity / res.list.length).toFixed(2);
        this.pressure = (this.pressure / res.list.length).toFixed(2);
        this.temp_max = (this.temp_max / res.list.length).toFixed(2);
        this.temp_min = (this.temp_min / res.list.length).toFixed(2);
    }
      console.log('weather--->', res);
    })
  }

  resetValues(){
    this.humidity = 0;
    this.pressure = 0;
    this.temp_max = 0;
    this.temp_min = 0;
  }

}
