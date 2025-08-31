import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { StorageService } from './storage.service';


export interface Evento{
  id?: string;
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

  getEvents():Observable<Evento[]>{
    return this.storageService.getData("events").pipe(map(data=>{
      var eventsToReturn:Evento[] = [] 
      for(var id in data){
        var eventToAdd = data[id]
        eventToAdd["id"] = id
        eventsToReturn.push(eventToAdd)
      }
      return eventsToReturn
    }))
  }

  getEventsForDay(date:Date) :Observable<Evento[]> {
    return this.getEvents().pipe(map(events=>{
      var eventsForDay = events.filter((value:Evento)=>{
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

  addEvent(event :Evento){
    return this.storageService.pushData("events", event)
  }

  deleteEvent(event :Evento){
    return this.storageService.deleteData(`events/${event.id}`)
  }
}
