import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { IRegistration} from 'src/app/interfaces/iRegistration';
import { EventsService } from 'src/app/services/events.service';
import {RegisterService} from 'src/app/services/register.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {
  events:any[]=[];
  waiverCompleted:boolean=false;
  selectedAge:string=''
  // paymentRequired: boolean = true; // Default to true, indicating payment is required
  // precedingFieldsCompleted=false;
  register!:IRegistration[];
  userForm: FormGroup=this.fb.group({
    first_name: ['',[Validators.required]],
    last_name:['',[Validators.required]],
    age:['',[Validators.required]],
    email:['',[Validators.required, Validators.email]],
    phone_number:['',[Validators.required]],
    address:['',[Validators.required]],
    city:['',[Validators.required]],
    province:['',[Validators.required]],
    postal_code:['',[Validators.required]],
    distance_length:[''],
    event_id:['',[Validators.required]],
    gender:['',[Validators.required]],
    entry_type:[''],
    waiverCheck:[false,[Validators.required]],
  });

  onAgeChange(){
    if(this.selectedAge === 'under 13'){
      this.userForm.controls['distance_length'].setValue('1KM');
      this.userForm.controls['entry_type'].setValue('Child 12 & under Free');
      // this.userForm.controls['distance_length'].disable(); // Disable distance_length control
      // this.userForm.controls['entry_type'].disable(); // Disable entry_type control

      // const paymentForm= document.querySelector('.form-check');
      // paymentForm?.classList.remove('disabled');
    } else{
      this.userForm.controls['distance_length'].setValue('');
      this.userForm.controls['entry_type'].setValue('');
      // this.userForm.controls['distance_length'].enable(); // Enable distance_length control
      // this.userForm.controls['entry_type'].enable(); // Enable entry_type control
    
    }
  }
    
  constructor(private fb:FormBuilder, private _RegisterService:RegisterService,private _eventService:EventsService){
  

    this.userForm.get('waiverCheck')?.valueChanges.subscribe((checked: boolean) => {
      this.waiverCompleted = checked;
    });
  }

  ngOnInit(){
    this._eventService.getEvents().subscribe((data) => {
      this.events =data;
    });
  }
  
  areFieldsCompleted(): boolean {
    const fieldsToCheck = [
      this.userForm.get('first_name')?.value,
      this.userForm.get('last_name')?.value,
      this.userForm.get('age')?.value,
      this.userForm.get('email')?.value,
      this.userForm.get('phone_number')?.value,
      this.userForm.get('address')?.value,
      this.userForm.get('city')?.value,
      this.userForm.get('province')?.value,
      this.userForm.get('phone_number')?.value,
      this.userForm.get('postal_code')?.value,
      this.userForm.get('distance_length')?.value,
      this.userForm.get('event_id')?.value,
      this.userForm.get('gender')?.value,
      this.userForm.get('entry_type')?.value,
  ];
  
    // Check if all required fields have values
    return fieldsToCheck.every((field) => field !== '' && field !== null);
  }

  areFieldsAndWaiverCompleted(): boolean {
    const precedingFieldsCompleted = this.areFieldsCompleted(); // Your existing method
    return precedingFieldsCompleted && this.waiverCompleted;
  }
  
  
  createRegistrant(){
    let formData = this.userForm.value;
    console.log('test');
    this._RegisterService.createRegistrant(formData).subscribe({
      next: (result) => {
        alert('Task was created successfully.');
        this.userForm.reset(); //clear form data
      },
      error:(err) => {
        console.log(err);
        alert('something went wrong');
      }
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      this._RegisterService.createRegistrant(formData).subscribe(
        (result) => {
          alert('Registrant was created successfully.');
          this.userForm.reset();
        },
        (err) => {
          console.log(err);
          alert('Something went wrong');
        }
      );
    } else {
      alert('Form is not valid. Please check the fields.');
    }
  }
  
get first_name(){
  return this.userForm.get('first_name')!; 
}

get last_name(){
  return this.userForm.get('last_name')!; 
}

get age(){
  return this.userForm.get('age')!; 
}

get email(){
  return this.userForm.get('email')!; 
}
get phone_number(){
  return this.userForm.get('phone_number')!; 
}

get gender(){
  return this.userForm.get('gender')!; 
}
get address(){
  return this.userForm.get('address')!; 
}
get city(){
  return this.userForm.get('city')!; 
}
get postal_code(){
  return this.userForm.get('postal_code')!; 
}
get province(){
  return this.userForm.get('province')!; 
}
get distance_length(){
  return this.userForm.get('distance_length')!; 
}
get event_id(){
  return this.userForm.get('event_id')!;
}
get entry_type(){
  return this.userForm.get('entry_type')!;
}
}
