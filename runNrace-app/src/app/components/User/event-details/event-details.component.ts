import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from 'src/app/interfaces/iEvent';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit{
  eventDetails: IEvent;
  loading:boolean;

  constructor(
    private _eventService: EventsService,
    private route: ActivatedRoute
  ) 
  //used to fetch and store the data stored from the service
  {

    this.loading=true;
    this.eventDetails = {
      event_id:0,
      event_name: '',
      event_date: new Date(),
      event_location: '',
      event_description: '',
      event_image: '',
      event_location_detials: '',
    };
 }

 
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.eventDetails.event_id = params['event_id'];
      console.log('event_id', this.eventDetails.event_id);
      this._eventService.getEvent(this.eventDetails.event_id).subscribe({
        next: (result) => {
          this.eventDetails = result; //populate web form with event data
          this.loading = false;
        },
      });
    });
  }
}