import { Sneeze } from './sneeze';
import { UserAPIService } from './user-api.service';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from './user';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeService {
  private user = new Subject<User>();
  private sneeze = new Subject<Sneeze>();

  constructor() { }

  updateUser(user: User){
    this.user.next(user);
  }

  getUser(): Observable<User>{
    return this.user.asObservable();
  }

  getSneeze(): Observable<Sneeze>{
    return this.sneeze.asObservable();
  }

  addSneeze(sneeze: Sneeze){
    this.sneeze.next(sneeze);
  }
}
