import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRegistration } from '../interfaces/iRegistration';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

//get all registrations
  getRegistraions(){
    return this.http.get<IRegistration[]>('localhost:3000/registrations');
  }

//Create a new registrant 

createRegistrant(formData:any){
  return this.http.post<IRegistration>('localhost:3000/register', formData);
}
}

//  //Get a single Task 

//  getTask(taskId: number){
//   return this.http.get<Itask>(`http://localhost:3000/tasks/${taskId}`);
// }

// //update a task
// updateTask(formData:any, taskId: number){
//   return this.http.put<Itask>(`http://localhost:3000/tasks/${taskId}`, formData);
// }

// //Delete a task

// deleteTask(taskId: number){
//   return this.http.delete<Itask>(`http://localhost:3000/tasks/${taskId}`);
// }

