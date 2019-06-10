import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserAPIService {

  constructor(private httpClient: HttpClient) { }

  public getUsers(){
    return this.httpClient.get<User[]>('https://sneezewebapi.azurewebsites.net/api/users');
  }
}
