import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor() { }
  clean(){
    window.localStorage.clear();
  }
  public saveUser(user :string, role:string){
    window.localStorage.removeItem('userToken');
    window.localStorage.removeItem('role');
    window.localStorage.setItem('userToken', JSON.stringify(user));
    window.localStorage.setItem('role', JSON.stringify(role));

  }
  public getUser(){
    const token = window.localStorage.getItem('userToken');
    const role = window.localStorage.getItem('role');

    if(token && role){
      return {token:JSON.parse(token),role: JSON.parse(role) };
    }
    return null;
  }
  public isLoggedIn(){
    const user = window.localStorage.getItem('userToken');
    if(user){
      return true;
    }
    return false;
  }
}
