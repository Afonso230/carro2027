import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventDialogData } from '../show-day-dialog/show-day-dialog.component';
import { CalendarioService, EventType } from '../calendario.service';

export interface CreateEventDialogData {
  dia : Date;
}

@Component({
    selector: 'app-create-event-dialog',
    templateUrl: './create-event-dialog.component.html',
    styleUrl: './create-event-dialog.component.css',
    standalone: false
})
export class CreateEventDialogComponent {
  eventTypes: EventType[] = [];

  constructor(
    public dialogRef : MatDialogRef<CreateEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : CreateEventDialogData,
    private calendarioService : CalendarioService,
  ){
  }

  ngOnInit(){
      this.eventTypes =this.calendarioService.getEventTypes()
    }

  fecharDialogo(): void {
    this.dialogRef.close();
  }

}
