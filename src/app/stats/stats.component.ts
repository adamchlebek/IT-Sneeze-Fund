import { Component, OnInit } from '@angular/core';
import { UserAPIService } from './../user-api.service';
import { User } from '../user';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  users: User[];

  constructor(private userApiServce: UserAPIService) { }

  ngOnInit() {
    this.userApiServce.getUsers().subscribe((data) => {
      this.users = data;
      console.log(data);
    });
  }

  updateTable(){

  }

}
