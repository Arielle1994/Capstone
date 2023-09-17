import { Component } from '@angular/core';
import { IEvent } from 'src/app/interfaces/iEvent';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  events!:IEvent[];

  constructor(private _EventService: EventsService){
    _EventService.getEvents().subscribe({
      next:(results) => {
        this.events=results;
      },
      error:(err) => {
        console.log(err);
        alert('something went wrong');
      }
    });
  }
  deleteEvent(eventId:number){
    //delete the task from the visual (browser) takes eventID as a paramater 
    let index=this.events.findIndex((item) =>{

      return item.event_id === eventId;
    });

    // //delete this task

    this._EventService.deleteEvent(eventId).subscribe({
      next:(result) => {
        alert('Event was deleted successfully')
      }
    });
  }
}
