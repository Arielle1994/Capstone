import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/User/registration/registration.component';
import { EventsComponent } from './components/User/events/events.component';
import{ ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/User/home/home.component';
import { EventComponent } from './components/User/event/event.component';
import { EventDetailsComponent } from './components/User/event-details/event-details.component';
import { AdminEventComponent } from './components/Admin/admin-event/admin-event.component';
import { AdminEventEditComponent } from './components/Admin/admin-event-edit/admin-event-edit.component';
import { AdminEventsComponent } from './components/Admin/admin-events/admin-events.component';
import { ComponentLoginComponent } from './components/login/component-login.component';
import { AuthgaurdService } from './services/authgaurd.service';
import { AdminRegistrationComponent } from './components/Admin/admin-registration/admin-registration.component';
// import { PaymentComponent } from './components/User/payment/payment.component';
import { NgxStripeModule } from 'ngx-stripe';



@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    EventsComponent,
    HomeComponent,
    EventComponent,
    EventDetailsComponent,
    AdminEventComponent,
    AdminEventEditComponent,
    AdminEventsComponent,
    ComponentLoginComponent,
    AdminRegistrationComponent,
    // PaymentComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot()
  ],
  providers: [AuthgaurdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
