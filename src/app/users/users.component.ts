import { StatsComponent } from './../stats/stats.component';
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
    });
  }

  addSneeze(user: User) {
    //this.statsComponent.updateTable();
    //You have added a sneeze!
    this.userApiServce.addSneeze(user);
  }

  delSneeze(user: User){
    //You have removed a sneeze!
    this.userApiServce.delSneeze(user);
  }
}
