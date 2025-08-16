import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { StorageService } from './storage.service';


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

  constructor(
    private storageService:StorageService
  ) { }

  getEvents():Observable<Event[]>{
    return this.storageService.getData("events").pipe(map(data=>{
      return data.map((event)=>{
        event.data = new Date(event.data)
        return event
      })
    }))
  }

  getEvent(id) :Observable<Event> {
    var foundEvent = this.mockEvents.find((value:Event)=>{
      return value.id === id
    })
    return of(foundEvent)
  }

  getEventsForDay(date:Date) :Observable<Event[]> {
    return this.getEvents().pipe(map(events=>{
      var eventsForDay = events.filter((value:Event)=>{
        var eventDate = new Date(value.data)
        return eventDate.getDate() === date.getDate() && eventDate.getMonth() === date.getMonth() && eventDate.getFullYear() === date.getFullYear()
      })
      return eventsForDay
    }))

  }

  getEventType(id): EventType{
    return this.eventTypes[id]
  }

  getEventTypes(){
    return this.eventTypes
  }
}
