import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './components/User/events/events.component';
import { HomeComponent } from './components/User/home/home.component';
import { RegistrationComponent } from './components/User/registration/registration.component';
import { EventDetailsComponent } from './components/User/event-details/event-details.component';
import { AdminEventsComponent } from './components/Admin/admin-events/admin-events.component';
import { AdminEventEditComponent } from './components/Admin/admin-event-edit/admin-event-edit.component';
import { ComponentLoginComponent } from './components/login/component-login.component';
import { AuthgaurdService } from './services/authgaurd.service';


const routes: Routes = [
  {path:'events',component: EventsComponent},
  {path:'home',component: HomeComponent},
  {path:'registration', component:RegistrationComponent},
  {path:'events/:event_id', component:EventDetailsComponent},
  {path:'admin', component:AdminEventsComponent, canActivate:[AuthgaurdService]},
  {path:'edit-event/:event_id', component:AdminEventEditComponent, canActivate:[AuthgaurdService]},
  {path:'create-task', component:AdminEventEditComponent,canActivate:[AuthgaurdService] },
  {path:'login', component:ComponentLoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
