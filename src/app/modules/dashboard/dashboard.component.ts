import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { events } from './../../../assets/data.json'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public calendar: CalendarDay[] = []; 

  submitBtn = "Submit"
  add = "Add Application"
  showForm:boolean = false
  applicationForm:FormGroup

  constructor(
    private formBuilder:FormBuilder
  ) { 
    this.applicationForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ''
    })
  }

  showOrHideForm(id=null){
    if(id == null){
      console.log('no id')
      this.showForm = !this.showForm
    }else{
      this.showForm = !this.showForm
    }
  }

  ngOnInit(): void {
    this.generateCalendarDays();
    const events_:Array<any> = events
    events_.forEach(event => {
      var date = new Date();
      date = new Date(date.setDate(date.getDate() + Math.floor(Math.random() * 20)))
      const dateIndex = this.calendar.findIndex((object => object.date.getDate() == date.getDate())) 
      this.calendar[dateIndex].events.push(event)
    });

  }

  private generateCalendarDays(): void {
    this.calendar = [];
    let day: Date = new Date();
    
    let startingDateOfCalendar = this.getStartDateForCalendar(day);

    let dateToAdd = startingDateOfCalendar;

    for (var i = 0; i < 42; i++) {
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

  submit(data){
    if(!this.applicationForm.invalid){
      this.showForm = !this.showForm
      console.log(data)
    }
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
  get date(){
    return this.applicationForm.get("date")
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
// class Events {
//   public date: Date;
//   public title: string;
//   public content: string;

// }

