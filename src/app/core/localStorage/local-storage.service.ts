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

  constructor() { }
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

  login(data){
    let users=[]
    users = JSON.parse(localStorage.getItem(this.usersKey))
    console.log(data.email, )
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
    console.log(users)
    localStorage.setItem(this.signedInUserKey, JSON.stringify(data))
    return true
  }

  logout(){
    localStorage.removeItem(this.signedInUserKey)
  }
}
