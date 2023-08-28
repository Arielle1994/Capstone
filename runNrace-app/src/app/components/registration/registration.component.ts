import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { IRegistration} from 'src/app/interfaces/iRegistration';
import {RegisterService} from 'src/app/services/register.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  // register!:IRegistration[];
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
    race_distance:['',[Validators.required]],
    race_id:['',[Validators.required]],
    gender:['',[Validators.required]]
  });
    
  constructor(private fb:FormBuilder){ }
  // constructor(private fb:FormBuilder, private _RegisterService:RegisterService){

    // _RegisterService.getRegistraions().subscribe({
    //   next:(results) =>{
    //     this.register=results;
    //   },
    // error:(err) => {
    //   console.log(err);
    //   alert('something went wrong');
    // }
    // });
  // }
  // onSubmit(formData:any){
  //   this._RegisterService.createRegistrant(formData).subscribe()
  //   console.log(this.userForm.value);
  // }
  // onSubmit(){
  //   console.log('on submit before validation');
  //   if (this.userForm.valid){
  //   console.log('on submit after validation');

  //     let formData= this.userForm.value;
  //     this._RegisterService.createRegistrant(formData).subscribe({
  //       next:(result) => {
  //         alert('Registrant was created successfully.');
  //         this.userForm.reset();
  //       },
  //       error:(err) => {
  //         console.log(err);
  //         alert('something went wrong');
  //       },
  //     });
  //   } else{
  //     alert ('Form is not valid. please check the fields.');
  //   }
  // }
  // createRegistrant(){
  //   let formData = this.userForm.value;
  //   console.log('test');
  //   this._RegisterService.createRegistrant(formData).subscribe({
  //     next: (result) => {
  //       alert('Task was created successfully.');
  //       this.userForm.reset(); //clear form data
  //     },
  //     error:(err) => {
  //       console.log(err);
  //       alert('something went wrong');
  //     }
  //   });
  // }

  onSubmit(){
    console.log(this.userForm.value);
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
get race_distance(){
  return this.userForm.get('race_distance')!; 
}
get race_id(){
  return this.userForm.get('race_id')!;
}
}
