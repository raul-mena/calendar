import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DayComponent } from './components/day/day.component';
import { HeaderComponent } from './components/header/header.component';
import { FormModalComponent } from './components/form-modal/form-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpenWeatherService } from './services/open-weather.service';
import { HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from './components/weather/weather.component';

@NgModule({
  declarations: [
    AppComponent,
    DayComponent,
    HeaderComponent,
    FormModalComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  providers: [ OpenWeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
