import { Component, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from 'src/app/interfaces/iEvent';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-admin-event-edit',
  templateUrl: './admin-event-edit.component.html',
  styleUrls: ['./admin-event-edit.component.css']
})
export class AdminEventEditComponent {

  eventForm:FormGroup;
  isEdit:boolean = false;
  editId: number= 0;
  events!:IEvent[]; 
  selectedEvent:{event_id:number};
  
  
  constructor(private fb: FormBuilder, private _EventService:EventsService, private route:ActivatedRoute){
    this .selectedEvent={event_id: 0};
    this.eventForm= fb.group({
      // event_id:['', [Validators.required]],
      event_name:['', [Validators.required]],
      event_description:['', [Validators.required]],
      event_date:['', [Validators.required]],
      event_location:['', [Validators.required]],
      event_location_details:['', [Validators.required]],
      event_image: ['', [Validators.required, Validators.pattern(/https?:\/\/.+\.(png|jpg|jpeg|gif|bmp|svg)/i)]],
});
      

  

    //Get the task ID from URL

    let eventId= this.route.snapshot.paramMap.get('event_id');
   
    if(eventId !== null){
      //edit mode
      this.isEdit= true;
      this.editId= parseInt(eventId);

      //Get the data of the task to edit 

      this._EventService.getEvent(this.editId).subscribe({
      next: (result) => {
        this.eventForm.patchValue(result); //populate web form with task data
      }
    });
  }
}

  onSubmit(){
    if(this.isEdit){
      this.editEvent();
    } else{
      this.createEvent();
    }
  }

  //create methods 
  createEvent(){

    let formData = this.eventForm.value;
    this._EventService.createEvent(formData).subscribe({
      next: (result) => {
        alert('Task was created successfully.');
        this.eventForm.reset(); //clear form data
      },

      error:(err) => {
        console.log(err);
        alert('something went wrong');
      }
    });
  }
 
  editEvent(){
    let formData = this.eventForm.value;
    this._EventService.updateEvent(formData, this.editId).subscribe({
      next: (result) => {
        alert('Task was updated successfully.');
      },

      error:(err) => {
        console.log(err);
        alert('something went wrong');
      }
    });

  }
  ///task_date form Control
  get event_date(){
    return this.eventForm.get('event_date')!;
  }

  deleteEvent(event_id:number) {
    this._EventService.deleteEvent(event_id).subscribe(
      response => {
        console.log(response);
      },
    
    error => {
      console.error(error);
    }
    );
    
  }
}

