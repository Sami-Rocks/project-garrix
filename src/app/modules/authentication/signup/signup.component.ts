import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private formBuilder:FormBuilder
  ) { 
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
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
  get password(){
    return this.signupForm.get('password')
  }


  ngOnInit(): void {
  }

  submit(data){
    if(this.signupForm.invalid){
      console.log('form values are invalid')
    }else{
      console.log(data.name)
      console.log(data.phone)
      console.log(data.email)
      console.log(data.password)
    }
  }

}