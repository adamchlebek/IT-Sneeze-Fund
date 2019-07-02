import { Component, OnInit } from '@angular/core';
import { Sneeze } from '../sneeze';
import { User } from '../user';
import { UserAPIService } from '../user-api.service';
import { ChangeService } from '../change.service';

@Component({
  selector: 'app-sneeze-pollen-graph',
  templateUrl: './sneeze-pollen-graph.component.html',
  styleUrls: ['./sneeze-pollen-graph.component.scss']
})
export class SneezePollenGraphComponent implements OnInit {
  sneezes: Sneeze[];
  users: User[];

  selectedUser: User;

  am79: number = 0;
  am911: number = 0;
  am111: number = 0;
  pm13: number = 0;
  pm35: number = 0;
  pm57: number = 0;
  pm79: number = 0;
  other: number = 0;

  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: [], label: 'Sneezes'}
  ];

  chartLabels = ['7am-9am', '9am-11am', '11am-1pm', '1pm-3pm', '3pm-5pm', '5pm-7pm' , '7pm-9pm', 'No Time Documented'];

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
        let hours: number = date.getHours();

        switch(true){
          case hours >= 19:
            this.pm79 += 1;
            break;
          case hours >= 17:
            this.pm57 += 1;
            break;
          case hours >= 15:
            this.pm35 += 1;
            break;
          case hours >= 13:
            this.pm13 += 1;
            break;
          case hours >= 11:
            this.am111 += 1;
            break;
          case hours >= 9:
            this.am911 += 1;
            break;
          case hours >= 7:
            this.am79 += 1;
            break;
          case hours >= 0:
            this.other += 1;
            break;
          default:
            break;
        }

        this.chartData[0].data = [this.am79, this.am911, this.am111, this.pm13, this.pm35, this.pm57, this.pm79, this.other]
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
      let hours: number = date.getHours();

      switch(true){
        case hours >= 19:
          this.pm79 += 1;
          break;
        case hours >= 17:
          this.pm57 += 1;
          break;
        case hours >= 15:
          this.pm35 += 1;
          break;
        case hours >= 13:
          this.pm13 += 1;
          break;
        case hours >= 11:
          this.am111 += 1;
          break;
        case hours >= 9:
          this.am911 += 1;
          break;
        case hours >= 7:
          this.am79 += 1;
          break;
        case hours >= 0:
          this.other += 1;
          break;
        default:
          break;
      }

      this.chartData[0].data = [this.am79, this.am911, this.am111, this.pm13, this.pm35, this.pm57, this.pm79, this.other]
    });
  }

  changeGraph(user: User){
    this.am79 = 0;
    this.am911 = 0;
    this.am111 = 0;
    this.pm13 = 0;
    this.pm35 = 0;
    this.pm57 = 0;
    this.pm79 = 0;
    this.other = 0;

    this.userApiServce.getSneezesUser(user).subscribe((data) => {

      data.forEach((sneeze) => {
        var date = new Date(sneeze.date.toString());
        let hours: number = date.getHours();

        switch(true){
          case hours >= 19:
            this.pm79 += 1;
            break;
          case hours >= 17:
            this.pm57 += 1;
            break;
          case hours >= 15:
            this.pm35 += 1;
            break;
          case hours >= 13:
            this.pm13 += 1;
            break;
          case hours >= 11:
            this.am111 += 1;
            break;
          case hours >= 9:
            this.am911 += 1;
            break;
          case hours >= 7:
            this.am79 += 1;
            break;
          case hours >= 0:
            this.other += 1;
            break;
          default:
            break;
        }

        this.chartData[0].data = [this.am79, this.am911, this.am111, this.pm13, this.pm35, this.pm57, this.pm79, this.other]
      });
    })
  }
}
