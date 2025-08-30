import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CalendarioService, Evento } from '../calendario.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateEventDialogComponent } from '../create-event-dialog/create-event-dialog.component'; //euuuuuuuuuu
import { DialogService } from '../utils/dialog.service';


export interface EventDialogData {
  dia : Date;
}

@Component({
    selector: 'app-show-day-dialog',
    templateUrl: './show-day-dialog.component.html',
    styleUrl: './show-day-dialog.component.css',
    standalone: false
})
export class ShowDayDialogComponent {
  
  events : Evento[] 

  constructor(
    public dialogRef : MatDialogRef<ShowDayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : EventDialogData,
    private calendarioService : CalendarioService,
    private matDialog: MatDialog,
    private dialogService: DialogService
  ){}

  ngOnInit(){
    this.calendarioService.getEventsForDay(this.data.dia).subscribe((value:Evento[])=>{
      this.events = value
    })
  }

  fecharDialogo(): void {
    this.dialogRef.close();
  }

  getColorForEvent(event:Evento){
    return this.calendarioService.getEventType(event.tipo).color
  }

  
}
