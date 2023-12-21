
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { RegisterService } from '../register.service';
import { IRegistration } from 'src/app/interfaces/iRegistration';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css']
})
export class AdminRegistrationComponent implements OnInit {
  registrations: IRegistration[] =[];

  constructor(private _RegisterService:RegisterService, private http:HttpClient){}

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

  exportToCSV() {
    this._RegisterService.exportRegistrantsToCSV().subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'registration_data.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error exporting data:', error);
        // Handle the error (e.g., show an error message to the user)
      }
    );

    }
}
