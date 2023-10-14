import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegistration } from 'src/app/interfaces/iRegistration';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseUrl='http://localhost:3000';

  constructor(private http:HttpClient) {}

  //method to fetch registratrants 

  getRegistrants(): Observable<any[]>{
    return this.http.get<IRegistration[]>(`${this.baseUrl}/registrations`)
  }
}
