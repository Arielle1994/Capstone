import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEvent } from 'src/app/interfaces/iEvent';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent {
AdminEvents!:IEvent[];

constructor(private _EventService: EventsService, private route:ActivatedRoute, private router:Router){ 
  _EventService.getEvents().subscribe({
    next:(results) => {
      this.AdminEvents=results;
    },
    error:(err) => {
      console.log(err);
      alert('something went wrong');
    }
  });
}
deleteEvent(eventId:number){
  //delete the task from the visual (browser)
  let index=this.AdminEvents.findIndex((item) =>{

    return item.event_id === eventId;
  });

  // this.events.splice(index,1);
  // //delete this task

  this._EventService.deleteEvent(eventId).subscribe({
    next:(result) =>{
      alert('Event was deleted successfully')
    }
  });
}

navigateToAdminEvents(){
  this.router.navigate(['/create-task']);
}

}

