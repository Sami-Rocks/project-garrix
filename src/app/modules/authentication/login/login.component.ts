import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/localStorage/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  signUp="Sign Up"
  logIn="Log In"

  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private localStorageService:LocalStorageService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })

  }

  get email(){
    return this.loginForm.get('email')
  }

  get password(){
    return this.loginForm.get('password')
  }


  ngOnInit(): void {
    this.localStorageService.checkLocalStorage()
  }

  submit(data){
    
    if(this.loginForm.invalid){
      console.log('form values are invalid')
    }else{
      if(this.localStorageService.login(data)){
        this.router.navigateByUrl('dashboard')
      }
      
    }
  }

  signup(){
    this.router.navigateByUrl('signup')
  }

}
