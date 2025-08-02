import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Event{
  id: number;
  data:number;
  titulo:string;
  descricao:string;
  tipo:number;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {
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
}
