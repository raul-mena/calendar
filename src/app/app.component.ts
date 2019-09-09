import { Component, ViewChild, TemplateRef } from '@angular/core';
import * as moment from 'moment';
import * as _ from "lodash";
import { dateObj } from './models/Day.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EventModel } from './models/Event.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    //modal elements
    @ViewChild('template') template: TemplateRef<any>
    modalRef: BsModalRef;
    //this array will save all the events, in case switch of the month, don't lose the events
    dataPersist: Array<dateObj> = [];

    selectedDate: number = moment().date();
    currentDay: any;
    currentEvent: any;
    
    displayYear: number = moment().year();
    displayMonth: number = moment().month();
    
    dateArray: Array<dateObj> = []; // Array for all the days of the month
    weekArray = []; // Array for each row of the calendar
    lastSelect: number = 0; // Record the last clicked location
    //calendar head
    weekHead: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    constructor(
        private modalService: BsModalService,
    ) {
        this.createMonth(this.displayYear, this.displayMonth);
    }

    createMonth(year: number, month: number) {
        this.dateArray = []; // Clear last month's data
        this.weekArray = []; // Clear week data
        let firstDay = moment({ year: year, month: month, date: 1 }).day();
        // The day of the week on the first day of the current month of
        // selection determines how many days to take out last month. Sunday
        // does not show last month, Monday shows the previous month, Tuesday
        // shows the last two days
        let preMonthDays; // The number of days for the previous month
        let monthDays; // The number of days for the month
        let weekDays: Array<dateObj> = [];
        // The number of days last month
        if (month === 0) {
            preMonthDays = moment({ year: year - 1, month: 11 }).daysInMonth();
        } else {
            preMonthDays = moment({ year: year, month: month - 1 }).daysInMonth();
        }
        // The number of days this month
        monthDays = moment({ year: year, month: month }).daysInMonth();
        // PREVIOUS MONTH
        // Add the last few days of the previous month to the array
        if (firstDay !== 7) { // Sunday doesn't need to be shown for the previous month
            let lastMonthStart = preMonthDays - firstDay + 1; // From the last few months start
            for (let i = 0; i < firstDay; i++) {
                this.dateArray.push(this.getBasicStructure(year, 11, lastMonthStart + i));
            }
        }
        //CURRENT MONTH
        // Add the numeral for this month to the array
        for (let i = 0; i < monthDays; i++) {
            this.dateArray.push(this.getBasicStructure(year,month, i + 1, true));
        }
        //mark current day
        if (this.displayYear === year && this.displayMonth === month) {
            let todayIndex = _.findIndex(this.dateArray, {
                year: this.displayYear,
                month: this.displayMonth,
                date: this.selectedDate,
                isThisMonth: true
            })
            this.dateArray[todayIndex].isToday = true;
        }
        //REST OF DAYS FOR THE NEXT MONTH
        // Add the number of days next month to the array, with some months showing 6 weeks and some months showing 5 weeks
        if (this.dateArray.length % 7 !== 0) {
            let nextMonthAdd = 7 - this.dateArray.length % 7
            for (let i = 0; i < nextMonthAdd; i++) {
                this.dateArray.push(this.getBasicStructure(year, 0, i + 1));
            }
        }

        // All date data is now added to the dateArray array
        // Insert the date data into the new array every seven days
        for (let i = 0; i < this.dateArray.length / 7; i++) {
            for (let j = 0; j < 7; j++) {
                weekDays.push(this.dateArray[i * 7 + j]);
            }
            this.weekArray.push(weekDays);
            weekDays = [];
        }
    }

    checkIfThereIsEvents(day: dateObj){
        const item:any = this.dataPersist.find(x => (x.date == day.date && x.month == day.month && day.year == x.year));
        if(item){ day = item };
        return day;
    }
    //build basic days structure
    getBasicStructure(year, month, date, isThisMonth = false){
        let day:dateObj = {
            year: year,
            month: month,
            date: date,
            isThisMonth: isThisMonth,
            isToday: false,
            isSelect: false,
            hasEvent: [],
        }
        return this.checkIfThereIsEvents(day);
    }

    daySelect(i, j) {
        // First clear the last click status
        this.dateArray[this.lastSelect].isSelect = false;
        // Store this clicked status
        this.lastSelect = i * 7 + j;
        this.dateArray[i * 7 + j].isSelect = true;
    }

    deleteEv(eve){
        //find event will be deleted
        let item = this.currentDay.hasEvent.find(x => x.id = eve.id);
        const indexEvent = this.currentDay.hasEvent.indexOf(item);
        //delete item
        this.currentDay.hasEvent.splice(indexEvent, 1);
        //then close the modal
        this.modalRef.hide();
    }

    setEvent(eventUpd){
        //get current day position
        const index = this.dateArray.indexOf(this.currentDay);

        if(eventUpd.id){
            //if we found some id, update the event
            let item = this.currentDay.hasEvent.find(x => x.id = eventUpd.id);
            const indexEvent = this.currentDay.hasEvent.indexOf(item);
            item = Object.assign(item, eventUpd);
            this.currentDay.hasEvent[indexEvent] = item;
            this.currentDay.hasEvent = this.sortByDate(this.currentDay.hasEvent);
        }else{
            //if we don't found some id, we created an id and push tjhe event into the current day
            eventUpd.id = new Date().getTime();
            this.currentDay.hasEvent.push(eventUpd);
            this.currentDay.hasEvent = this.sortByDate(this.currentDay.hasEvent);
            this.dateArray[index] = { ...this.currentDay };
        }
        //save date
        this.storageData({ ...this.currentDay });
        //then close the modal
        this.modalRef.hide();
    }
    //save day reference
    openModal(elements: any) {
        this.currentDay = {...elements.day};
        this.currentEvent = elements.event ? {...elements.event} : new EventModel();
        this.modalRef = this.modalService.show(this.template);
    }

    sortByDate(arr){
        return arr.sort((a,b) => {
            return a.time.getTime() - b.time.getTime();
        })
    }

    storageData(day: dateObj){
        //search the day
        const item = this.dataPersist.find(x => (x.date == day.date && x.month == day.month && day.year == x.year));
        //if we found some element, replace hasEvent to save the new info
        if(item){
            const index = this.dataPersist.indexOf(item);
            item.hasEvent = [...day.hasEvent];
            this.dataPersist[index] = item;
        }else {
            this.dataPersist.push(day);
        }
    }
}
