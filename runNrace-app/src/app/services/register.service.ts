import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRegistration } from '../interfaces/iRegistration';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl='http://localhost:3000';

  constructor(private http:HttpClient) { }

 
//Create a new registrant 

createRegistrant(formData:any): Observable<any>{
  const url= `${this.apiUrl}/register`;
  return this.http.post<IRegistration>('http://localhost:3000/register', formData);
}
registerAll(registrants:IRegistration[]): Observable <any> {
  const url= `${this.apiUrl}/register/batch`;
  return this.http.post<IRegistration>('http://localhost:3000/register/batch', registrants);
}
}
