import { StatsComponent } from './stats/stats.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAPIService {
  public users: Observable<User[]>;

  constructor(private httpClient: HttpClient) { }

  public apiUsers(){
    this.users = this.httpClient.get<User[]>('https://sneezewebapi.azurewebsites.net/api/users');
  }

  public getUsers(){
    return this.users;
  }

  public addSneeze(user: User){
    //this.stats.updateTable();
    // TODO: Add Post Method to record new sneeze count!
    user.count += 1;

    return user;
  }

  public delSneeze(user: User){
    // TODO: Add Post Method to record new sneeze count!
    user.count -= 1;

    return user;
  }
}
