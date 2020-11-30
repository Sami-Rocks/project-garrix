import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/localStorage/local-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  signUp="Sign Up"
  logIn="Log In"
  signupForm:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private localStorageService: LocalStorageService
  ) { 
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      location: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      id: Math.floor(Math.random() * 999)
    })
  }

  get name(){
    return this.signupForm.get('name')
  }
  get phone(){
    return this.signupForm.get('phone')
  }
  get email(){
    return this.signupForm.get('email')
  }
  get location(){
    return this.signupForm.get('location')
  }
  get password(){
    return this.signupForm.get('password')
  }


  ngOnInit(): void {
    this.localStorageService.checkLocalStorage()
  }

  submit(data){
    if(this.signupForm.invalid){
      console.log('form values are invalid')
    }else{
      if(this.localStorageService.signup(data)){
        this.router.navigateByUrl('dashboard')
      }
    }
  }

  login(){
    this.router.navigateByUrl('login')
  }

}