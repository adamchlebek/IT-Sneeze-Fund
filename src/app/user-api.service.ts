import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { ok } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class UserAPIService {

  constructor(private httpClient: HttpClient) { }

  public getUsers(){
    // return null;
    return this.httpClient.get<User[]>('https://sneezewebapi.azurewebsites.net/api/users');
  }

  public addSneeze(user: User){
    // TODO: Add Post Method to record new sneeze count!
    // TODO: Update Variable on screen
    return ok;
  }
}
