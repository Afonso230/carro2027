import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CalendarioService, Event } from '../calendario.service';

export interface EventDialogData {
  dia : Date;
}

@Component({
  selector: 'app-show-day-dialog',
  templateUrl: './show-day-dialog.component.html',
  styleUrl: './show-day-dialog.component.css'
})
export class ShowDayDialogComponent {
  
  events : Event[] 
  
  constructor(
    public dialogRef : MatDialogRef<ShowDayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : EventDialogData,
    private calendarioService : CalendarioService
  ){}

  ngOnInit(){
    this.calendarioService.getEventsForDay(this.data.dia).subscribe((value:Event[])=>{
      this.events = value
    })
  }
}
