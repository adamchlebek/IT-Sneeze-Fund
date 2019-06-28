import { UserAPIService } from './../user-api.service';
import { Component, OnInit } from '@angular/core';

import { Sneeze } from '../sneeze';
import { User } from '../user';
import { ChangeService } from '../change.service';

@Component({
  selector: 'app-spd',
  templateUrl: './spd.component.html',
  styleUrls: ['./spd.component.css']
})

export class SpdComponent implements OnInit {
  sneezes: Sneeze[];
  users: User[];

  selectedUser: User;

  monday: number = 0;
  tuesday: number = 0;
  wednesday: number = 0;
  thursday: number = 0;
  friday: number = 0;

  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: [], label: 'Sneezes'}
  ];

  chartLabels = ['Saturday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'];

  constructor(private userApiServce: UserAPIService, private changeService: ChangeService) {
    this.changeService.getSneeze().subscribe(sneeze => {
      this.sneezes.unshift(sneeze);
    });
  }

  ngOnInit() {
    this.userApiServce.getUsers().subscribe((data) => {
      this.users = data;
    });

    this.userApiServce.getSneezes().subscribe((data) => {
      this.sneezes = data;

      data.forEach((sneeze) => {
        var date = new Date(sneeze.date.toString());
        let day: number = date.getDay();

        switch(day){
          case 1:{
            this.monday += 1;
            break;
          }
          case 2:{
            this.tuesday += 1;
            break;
          }
          case 3:{
            this.wednesday += 1;
            break;
          }
          case 4:{
            this.thursday += 1;
            break;
          }
          case 5:{
            this.friday += 1;
            break;
          }
        }

        this.chartData[0].data = [0, this.monday, this.tuesday, this.wednesday, this.thursday, this.friday, 0]
      });
    });
  }

  changeUser(user: User){
    if (user == null){
      this.changeGraphAllUsers();
      this.selectedUser = null;
    }else{
      this.selectedUser = user;
      this.changeGraph(user);
    }
  }

  changeGraphAllUsers(){
    let data = this.sneezes;

    data.forEach((sneeze) => {
      var date = new Date(sneeze.date.toString());
      let day: number = date.getDay();

      switch(day){
        case 1:{
          this.monday += 1;
          break;
        }
        case 2:{
          this.tuesday += 1;
          break;
        }
        case 3:{
          this.wednesday += 1;
          break;
        }
        case 4:{
          this.thursday += 1;
          break;
        }
        case 5:{
          this.friday += 1;
          break;
        }
      }

      this.chartData[0].data = [0, this.monday, this.tuesday, this.wednesday, this.thursday, this.friday, 0]
    });
  }

  changeGraph(user: User){
    this.monday = 0;
    this.tuesday = 0;
    this.wednesday = 0;
    this.thursday = 0;
    this.friday = 0;

    this.userApiServce.getSneezesUser(user).subscribe((data) => {

      data.forEach((sneeze) => {
        var date = new Date(sneeze.date.toString());
        let day: number = date.getDay();

        switch(day){
          case 1:{
            this.monday += 1;
            break;
          }
          case 2:{
            this.tuesday += 1;
            break;
          }
          case 3:{
            this.wednesday += 1;
            break;
          }
          case 4:{
            this.thursday += 1;
            break;
          }
          case 5:{
            this.friday += 1;
            break;
          }
        }

        this.chartData[0].data = [0, this.monday, this.tuesday, this.wednesday, this.thursday, this.friday, 0]
      });
    })
  }

  getBar(){
    alert(event);
  }
}
