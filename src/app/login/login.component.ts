import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  errMessage;

  userForm = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.minLength(5))
  });

  ngOnInit() {
  }
  onClickLogin(form) {
    if (form.valid) {
      this.authService.login(form.value).subscribe(res => {
        this.errMessage = res.message;
        localStorage.setItem('token', res.data.token);
        this.router.navigateByUrl('');
      },
        err => {
          this.errMessage = err.json().message;
        }
      );
    }
  }
}
