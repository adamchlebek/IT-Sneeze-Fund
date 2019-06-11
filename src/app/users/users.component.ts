import { UserAPIService } from './../user-api.service';
import { Component, OnInit } from '@angular/core';

import { User } from './../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];

  constructor(private userApiServce: UserAPIService) { }

  ngOnInit() {
    this.userApiServce.getUsers().subscribe((data) => {
      this.users = data;
      console.log(data);
    });
  }

  addSneeze(user: User) {
    this.userApiServce.addSneeze(user);
  }
}
