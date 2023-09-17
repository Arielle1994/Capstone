import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEvent } from '../../../interfaces/iEvent';
import { EventsService } from 'src/app/services/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-event',
  templateUrl: './admin-event.component.html',
  styleUrls: ['./admin-event.component.css']
})
export class AdminEventComponent {

  @Input()AdminEvents!:IEvent;
  @Output() deleteEvent= new EventEmitter();
  deleteAction(){
    this.deleteEvent.emit(this.AdminEvents.event_id);
  }
  constructor(private fb:FormBuilder,private _eventservice:EventsService, private route:ActivatedRoute,private router:Router){
    }

    navigateToAdminEvents(){
      this.router.navigate(['/create-task']);
    }
}
