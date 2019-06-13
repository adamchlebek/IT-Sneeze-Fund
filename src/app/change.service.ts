import { UserAPIService } from './user-api.service';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from './user';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeService {
  private user = new Subject<User>();

  constructor() { }

  updateUser(user: User){
    this.user.next(user);
  }

  getUser(): Observable<User>{
    return this.user.asObservable();
  }
}
