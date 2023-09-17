import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEvent } from '../interfaces/iEvent';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private apiUrl ='http://localhost:3000/events';

  constructor(private http: HttpClient) {}

  //Get all events from db

  deleteEvent(event_id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${event_id}`);
  }

  getEvents() {
    return this.http.get<IEvent[]>('http://localhost:3000/events');
  }

  //Create new task
  createEvent(formData: any) {
    return this.http.post<IEvent>('http://localhost:3000/events', formData);
  }

  //Get a single event
  getEvent(event_id: number) {
    return this.http.get<IEvent>(`http://localhost:3000/events/${event_id}`);
  }
  //update a event
  updateEvent(formData: any, event_id: number) {
    return this.http.put<IEvent>(
      `http://localhost:3000/events/${event_id}`,
      formData
    );
  }




}
