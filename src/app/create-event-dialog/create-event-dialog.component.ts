import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventDialogData } from '../show-day-dialog/show-day-dialog.component';
import { CalendarioService, Evento, EventType } from '../calendario.service';
import { MatTimepicker } from '@angular/material/timepicker';
import { MatDatepickerControl, MatDatepickerPanel } from '@angular/material/datepicker';
import { sequence } from '@angular/animations';
import { stringify } from 'querystring';

@Component({
    selector: 'app-create-event-dialog',
    templateUrl: './create-event-dialog.component.html',
    styleUrl: './create-event-dialog.component.css',
    standalone: false
})

export class CreateEventDialogComponent {
  eventTypes: EventType[] = [];
  eventTime: Date
  titulo : string
  tipo : any
  descricao : string

  constructor(
    public dialogRef : MatDialogRef<CreateEventDialogComponent>,
    private calendarioService : CalendarioService,
  ){
  }

  ngOnInit(){
      this.eventTypes = this.calendarioService.getEventTypes().map((event,index)=>{
        event['id']=index
        return event
      })
      this.tipo= '0'
      this.eventTime = new Date()
    }

  fecharDialogo(): void {
    this.dialogRef.close();
  }

  addEvent(){
    if(!this.titulo || this.titulo===""){
      alert("Obrigatório preencher o título");
      return;
    } else if(!this.descricao || this.descricao==="") {
      this.descricao = "Sem descrição"
    } 
    var randomId = Math.floor(Math.random() * 1000000 );
    var eventToAdd : Evento ={
      id : randomId,
      data : this.eventTime.getTime(),
      descricao : this.descricao,
      tipo : this.tipo,
      titulo : this.titulo
    }
    this.calendarioService.addEvent(eventToAdd).then((value)=>{
      this.dialogRef.close()
    })
  }
}
