import { StatsComponent } from './stats/stats.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import { Sneeze } from './sneeze';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class UserAPIService {
  public users: Observable<User[]>;
  public sneezes: Observable<Sneeze[]>;

  constructor(private httpClient: HttpClient) { }

  public apiUsers(){
    this.users = this.httpClient.get<User[]>('https://sneezewebapi.azurewebsites.net/api/users');
  }

  public apiSneezes(){
    this.sneezes = this.httpClient.get<Sneeze[]>('https://sneezewebapi.azurewebsites.net/api/sneezes');
  }

  public getUsers(){
    return this.users;
  }

  public getSneezes(){
    return this.sneezes;
  }

  public addSneeze(user: User){
    user.count += 1;

    let url = 'https://sneezewebapi.azurewebsites.net/api/sneezes/NewSneeze/' + user.name;

    return this.httpClient.post(url, '').subscribe((val) => {
      console.log("Success!", val);
    },
    response => {
      console.log("Error!", response);
    },
    () => {
      console.log("Complete!");
    });
  }
}
