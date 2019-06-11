import { Component, OnInit } from '@angular/core';
import { Sneeze } from '../sneeze';
import { UserAPIService } from '../user-api.service';
import { User } from '../user';

@Component({
  selector: 'app-sneezes',
  templateUrl: './sneezes.component.html',
  styleUrls: ['./sneezes.component.css']
})
export class SneezesComponent implements OnInit {
  sneezes: Sneeze[];
  users: User[];

  constructor(private userApiServce: UserAPIService) { }

  ngOnInit() {
    this.userApiServce.getSneezes().subscribe((data) => {
      this.sneezes = data;
    });

    this.userApiServce.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
