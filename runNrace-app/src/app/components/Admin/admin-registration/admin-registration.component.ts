
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { RegisterService } from '../register.service';
import { IRegistration } from 'src/app/interfaces/iRegistration';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css']
})
export class AdminRegistrationComponent implements OnInit {
  registrations: IRegistration[] =[];

  constructor(private _RegisterService:RegisterService){}

  ngOnInit(): void {
    // Call the service method to get registrants
    this._RegisterService.getRegistrants().subscribe(
      (data) => {
        this.registrations= data;
      },
      (error) => {
        console.log(error);
        alert('Error fetching registrants.');
      }
    );
  }

}
