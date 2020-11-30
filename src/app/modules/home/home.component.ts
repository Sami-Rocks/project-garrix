import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  logIn = "Log In"
  signUp = "Sign Up"

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.router.navigateByUrl('login')
  }
  signup(){
    this.router.navigateByUrl('signup')
  }
}
