import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Event{
  id: number;
  data:number;
  titulo:string;
  descricao:string;
  tipo:number;
}

export interface EventType{
  name:string;
  color:string;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  eventTypes:EventType[] = [
    {
      name:"Convívio",
      color:"#00ff00"
    },
    {
      name:"Reunião",
      color:"#0000ff"
    },
    {
      name:"Prazo",
      color:"#ff0000"
    },
    {
      name:"Jantar de Curso",
      color:"#00ffff"
    }] 

  mockEvents:Event[] = [
    {
      id:1,
      data:Date.UTC(2025,7,2,17,0),
      titulo:"evento mockado",
      descricao:"descrição mockada do evento mockado",
      tipo:0
    },
    {
      id:2,
      data:Date.UTC(2025,7,3,18,0),
      titulo:"evento mockadissimo",
      descricao:"descrição mockadissima do evento mockadissimo",
      tipo:1
    }
  ]

  constructor() { }

  getEvents():Observable<Event[]>{
    return of(this.mockEvents)
  }

  getEvent(id) :Observable<Event> {
    var foundEvent = this.mockEvents.find((value:Event)=>{
      return value.id === id
    })
    return of(foundEvent)
  }

  getEventsForDay(date:Date) :Observable<Event[]> {
    var eventsForDay = this.mockEvents.filter((value:Event)=>{
      var eventDate = new Date(value.data)
      return eventDate.getDate() === date.getDate() && eventDate.getMonth() === date.getMonth() && eventDate.getFullYear() === date.getFullYear()
    })
    return of(eventsForDay)
  }

  getEventType(id): EventType{
    return this.eventTypes[id]
  }
}