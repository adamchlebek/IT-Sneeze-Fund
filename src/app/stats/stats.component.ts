import { ChangeService } from './../change.service';
import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { UserAPIService } from './../user-api.service';
import { User } from '../user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  inUser: User;
  subscription: Subscription;

  users: User[];

  totalCost: number;
  totalSneezes: number = 0;

  count: number;

  constructor(private userApiServce: UserAPIService,
    private changeService: ChangeService) {
      this.changeService.getUser().subscribe(user => {
        let index = this.users.map(function(x) {return x.name}).indexOf(user.name);
        this.users[index].count += 1;

        this.totalSneezes = 0;
        this.totalCost = 0;

        this.users.forEach((user)=>{
          this.totalSneezes += user.count;
        });

        this.totalCost = this.totalSneezes * 0.25;
      });
    }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.userApiServce.getUsers().subscribe((data) => {
      this.users = data;

      this.users.forEach((user)=>{
        this.totalSneezes += user.count;
      });

      this.totalCost = this.totalSneezes * 0.25;
    });
  }
}
