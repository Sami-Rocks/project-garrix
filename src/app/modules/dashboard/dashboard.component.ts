import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from './../../core/localStorage/local-storage.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public calendar: CalendarDay[] = []; 

  submitBtn = "Submit"
  logoutBtn = "Logout"
  editBtn = "Edit"
  add = "Add Application"
  showForm:boolean = false
  applicationForm:FormGroup
  user
  edit_id
  edit:boolean = false
  allDays = []
  userApplications =[]
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private localStorageService:LocalStorageService
  ) { 
    this.user = this.localStorageService.getUser()

    this.applicationForm = this.formBuilder.group({
      id: Math.floor(Math.random() * 999),
      name: [this.user.name, Validators.required],
      location: [this.user.location, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      company: [this.user.company, Validators.required],
      slot: 0,
      userID: this.user.id
    })
  }

  showOrHideForm(id=null){
    if(id == null){
      this.showForm = !this.showForm
      this.edit = false
    }else{
      this.edit = true
      this.edit_id = id
      let app = []
      app = this.userApplications.filter(element => element.id == this.edit_id)
      this.title.setValue(app[0].title)
      this.description.setValue(app[0].description)
      this.company.setValue(app[0].company)
      this.slot.setValue(app[0].slot)
      this.showForm = !this.showForm
    }
  }

  ngOnInit(): void {
    this.userApplications = this.localStorageService.getUserAppointments(this.user.id)
    if(!this.localStorageService.checkIfSignedIn()){
      this.router.navigateByUrl('login')
    }

    this.generateCalendarDays();
    this.allDays = this.localStorageService.getAllDays()

    this.allDays.forEach(element => {
      element.date = new Date(element.date)
    });

  }

  private generateCalendarDays(): void {
    this.calendar = [];
    let day: Date = new Date();
    
    let startingDateOfCalendar = this.getStartDateForCalendar(day);

    let dateToAdd = startingDateOfCalendar;

    for (var i = 0; i < 14; i++) {
      this.calendar.push(new CalendarDay(new Date(dateToAdd)));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1)); 
    }

    //console.log(this.calendar)
  }

  private getStartDateForCalendar(selectedDate: Date){
    
    //let lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));
    let lastDayOfPreviousMonth = new Date(selectedDate);
    
    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;

    if (startingDateOfCalendar.getDay() != 1) {
      do {
        startingDateOfCalendar = new Date(startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1));
      } while (startingDateOfCalendar.getDay() != 1);
    }
    
    return startingDateOfCalendar;
  }

  monthNames(number){
    console.log(number)
    switch(number){
      default:
        return "Month"
    }
  }

  submit(){
    console.log(this.applicationForm.value)
    if(!this.applicationForm.invalid){
      this.showForm = !this.showForm
      this.localStorageService.addAppointment(this.applicationForm.value)
      this.ngOnInit();
    }
  }
  edit_(){
    if(!this.applicationForm.invalid){
      this.showForm = !this.showForm
      this.localStorageService.editAppointment(this.edit_id, this.applicationForm.value)
      this.ngOnInit();
    }
  }
delete_(id){
  this.localStorageService.deleteAppointment(id)
  this.ngOnInit()
}
  get name(){
    return this.applicationForm.get("name")
  }
  get title(){
    return this.applicationForm.get("title")
  }
  get description(){
    return this.applicationForm.get("description")
  }
  get location(){
    return this.applicationForm.get("location")
  }

  get company(){
    return this.applicationForm.get("company")
  }
  get slot(){
    return this.applicationForm.get("slot")
  }

  logout(){
    this.localStorageService.logout()
    this.router.navigateByUrl('home')
  }
}

class CalendarDay {
  public date: Date;
  public title: string;
  public isPastDate: boolean;
  public isToday: boolean;
  public events: Array<any>

  constructor(d: Date) {
    this.date = d;
    this.isPastDate = d.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
    this.isToday = d.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0);
    this.events =[]
  }

}

