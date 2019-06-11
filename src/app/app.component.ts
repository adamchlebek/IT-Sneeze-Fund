import { Component } from '@angular/core';
import { UserAPIService } from './user-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'IT Sneeze Fund';

  constructor(private userAPI: UserAPIService){
  }

  ngOnInit() {
    this.userAPI.apiUsers();
    this.userAPI.apiSneezes();
  }
}
