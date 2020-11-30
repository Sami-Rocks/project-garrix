import { Injectable } from '@angular/core';
import { events } from './../../../assets/data.json';
import { users } from './../../../assets/data.json';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  usersKey = "users"
  eventsKey = "events"
  signedInUserKey = "signedInUser"

  constructor(
  ) { }
  events_ = events
  users_ = users
  checkLocalStorage(){
    if(localStorage.length>0){
      return true
    }else{
      localStorage.setItem(this.usersKey, JSON.stringify(this.users_))
      localStorage.setItem(this.eventsKey, JSON.stringify(this.events_))
      return true
    }
  }

  checkIfSignedIn(){
    let user;
    user = JSON.parse(localStorage.getItem(this.signedInUserKey))
    if(user == null){
      return false
    }else{
      return true
    }
  }
  getAllApplications(){
    let events = []
    events = JSON.parse(localStorage.getItem(this.eventsKey))
    return events
  }

  getUserApplications(id){
    let events =[] 
    events = JSON.parse(localStorage.getItem(this.eventsKey))
    let app = events.filter(el => el.userID == id)
    return app
  }

  getUser(){
    let user = JSON.parse(localStorage.getItem(this.signedInUserKey))
    return user
  }

  login(data){
    let users=[]
    users = JSON.parse(localStorage.getItem(this.usersKey))
    if(users.some(e=>e.email == data.email)){
      let index = users.findIndex(i => i.email === data.email);
      if(users[index].password === data.password){
        localStorage.setItem(this.signedInUserKey, JSON.stringify(users[index]))
        return true
      }else{
        return false
      }
    }else{
      return false
    }
  }

  signup(data){
    let users = []
    users = JSON.parse(localStorage.getItem(this.usersKey))
    users.push(data)
    localStorage.setItem(this.usersKey, JSON.stringify(users))
    localStorage.setItem(this.signedInUserKey, JSON.stringify(data))
    return true
  }

  logout(){
    localStorage.removeItem(this.signedInUserKey)
  }

  addApplication(data){
    let events = []
    events = JSON.parse(localStorage.getItem(this.eventsKey))
    events.push(data)
    localStorage.setItem(this.eventsKey, JSON.stringify(events))
  }

  editApplication(id, data){
    let events = []
    events = JSON.parse(localStorage.getItem(this.eventsKey))
    console.log(events)
    let app = events.filter(element => element.id == id)
    events = events.filter(element => element.id != id)
    let newArray = { id: app[0].id, name: app[0].name, userID: app[0].userID, title: data.title, description: data.description, date: data.date, location: data.location }
    events.push(newArray)
    localStorage.setItem(this.eventsKey, JSON.stringify(events))

  }
}
