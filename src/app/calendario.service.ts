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

  constructor(
    private storageService:StorageService
  ) { }

  getEvents():Observable<Event[]>{
    return this.storageService.getList("events").pipe(map(data=>{
      return data.map((event)=>{
        event.data = new Date(event.data)
        return event
      })
    }))
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

  addEvent(event :Event){
    return this.storageService.pushData("events", event)
  }
}
