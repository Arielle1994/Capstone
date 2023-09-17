import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-component-login',
  templateUrl: './component-login.component.html',
  styleUrls: ['./component-login.component.css'],
})
export class ComponentLoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _loginService: LoginService,
    private router:Router
  ) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  login() {
    let formData = this.loginForm.value;
  
    this._loginService.loginUser(formData).subscribe({
      next: (result) => {
        localStorage.setItem('currentUser', JSON.stringify(result)); // Store user data
        this.router.navigate(['/admin']); // Redirect to the admin page
      },
      error: (err) => {
        alert(err.error);
        console.log(err);
      },
    });
  }
}
