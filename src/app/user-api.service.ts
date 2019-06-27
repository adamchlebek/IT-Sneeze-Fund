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
  users: Observable<User[]>;
  sneezes: Observable<Sneeze[]>;
  code: Observable<string>;

  constructor(private httpClient: HttpClient) { }

  apiUsers(){
    this.users = this.httpClient.get<User[]>('https://sneezewebapi.azurewebsites.net/api/users');
  }

  apiSneezes(){
    this.sneezes = this.httpClient.get<Sneeze[]>('https://sneezewebapi.azurewebsites.net/api/sneezes');
  }

  getCode(){
    return this.code = this.httpClient.get<string>('https://sneezewebapi.azurewebsites.net/api/info/getcode');
  }

  getUsers(){
    return this.users;
  }

  getSneezes(){
    return this.sneezes;
  }

  getSneezesUser(user: User){
    return this.httpClient.get<Sneeze[]>('https://sneezewebapi.azurewebsites.net/api/sneezes/' + user.name);
  }

  addSneeze(user: User, multiplier: number){
    user.count += 1;

    let url = 'https://sneezewebapi.azurewebsites.net/api/sneezes/NewSneeze/' + user.name + '/' + multiplier*100;

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

  testSneeze(user: User){
    user.count += 1;

    //let url = 'https://sneezewebapi.azurewebsites.net/api/sneezes/NewSneeze/' + user.name;

    return this.httpClient.post('', '').subscribe((val) => {
      console.log("Success!", val);
    },
    response => {
      console.log("Error!", response);
    },
    () => {
      console.log("Complete!");
    });
  }

  delSneeze(sneeze: Sneeze){
    let url = 'https://sneezewebapi.azurewebsites.net/api/sneezes/DelSneeze/?date=' + sneeze.date + '&name=' + sneeze.name;

    return this.httpClient.get(url).subscribe((val) => {
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
