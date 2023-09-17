import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEvent } from '../../../interfaces/iEvent';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  @Input()event!:IEvent;
  @Output() deleteEvent= new EventEmitter();
  deleteAction(){
    this.deleteEvent.emit(this.event.event_id);
  }
}