import { Component } from '@angular/core';
import { CalendarioService, Event } from '../calendario.service';
import { MatDialog } from '@angular/material/dialog';
import { ShowDayDialogComponent } from '../show-day-dialog/show-day-dialog.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DialogService } from '../utils/dialog.service';
import { CreateEventDialogComponent } from '../create-event-dialog/create-event-dialog.component';

@Component({
    selector: 'app-calendario',
    templateUrl: './calendario.component.html',
    styleUrl: './calendario.component.css',
    standalone: false
})
export class CalendarioComponent {
month = new Date().getMonth()
  year = new Date().getFullYear()
  // false when there's no value in #day-event and true otherwise
  eventsShown = false

  readonly monthNames = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]

  calendarDays = []
  today = new Date ()
  monthAndYear = ""
  dateSelected = ""
  
  eventList : Event[] = []

  constructor(
    private calendarService:CalendarioService,
    private matDialog: MatDialog,
    private dialogService : DialogService
  ){}

  ngOnInit(){
      this.calendarService.getEvents().subscribe((events)=>{
        this.eventList=events 
        this.updateMonth()
        this.buildCalendar()
        console.log(this.eventList)
      })
  }

  prevMonth() {
      this.month = this.month - 1
      if (this.month < 0) {
          this.month = 11
          this.year = this.year - 1
      }
      this.updateMonth()

      this.buildCalendar()

  }

  nextMonth() {
      this.month= this.month + 1
      if(this.month > 11) {
          this.month = 0
          this.year = this.year + 1
      }
      this.updateMonth()

      this.buildCalendar()

  }
  
  updateMonth() {
      var currentMonth = this.monthNames[this.month]
      this.monthAndYear = currentMonth + " " + this.year
  }

  buildCalendar() {
      // first day of the month
      var firstDay = new Date(this.year,this.month,1)
      // last day of the month
      var lastDay = new Date(this.year,this.month+1,0)
      var numberDays = lastDay.getDate()
      var cellNumber = 42
      this.calendarDays = []
      for(var i = 0; i < cellNumber ; i++) {
          // day of month that's being written
          var currentDay = i - firstDay.getDay() + 1
          // verifying if this cell corresponds to a day in the month
          if (currentDay>=1 && currentDay<=numberDays){
            this.calendarDays.push({
              day: currentDay,
              hasEvents: this.eventList.some((event)=>{
                var eventDay = new Date(event.data)
                return eventDay.getDate() === currentDay && eventDay.getMonth() === this.month && eventDay.getFullYear() === this.year
              })
            })
          } else {
            this.calendarDays.push({day : ""})
          }
        }
  }

  openDay(day: number) {
    this.matDialog.open(ShowDayDialogComponent, {
      ...this.dialogService.getGenericDialogConfig(),
      data: {
        dia: new Date(this.year, this.month, day)
      }
    });
  }
  
  openEventCreator(){ 
    this.matDialog.open(CreateEventDialogComponent,{
      ...this.dialogService.getGenericDialogConfig(),
    })
  }
}


