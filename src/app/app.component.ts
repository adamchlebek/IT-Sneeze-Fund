import { Component } from '@angular/core';
import { UserAPIService } from './user-api.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'IT Sneeze Fund';
  public clickedEvent: User;

  constructor(private userAPI: UserAPIService){
  }

  ngOnInit() {
    this.userAPI.apiUsers();
    this.userAPI.apiSneezes();
  }

  displayCounter(count){
    console.log(count);
  }

  childEventClicked(user: User){
    this.clickedEvent = user;
  }
}
