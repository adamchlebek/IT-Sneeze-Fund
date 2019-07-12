import { Component, OnInit } from '@angular/core';
import { Sneeze } from '../sneeze';
import { User } from '../user';
import { UserAPIService } from '../user-api.service';
import { ChangeService } from '../change.service';
import { Pollen } from '../pollen';

@Component({
  selector: 'app-sneeze-pollen-graph',
  templateUrl: './sneeze-pollen-graph.component.html',
  styleUrls: ['./sneeze-pollen-graph.component.scss']
})
export class SneezePollenGraphComponent implements OnInit {
  dateCount: Map<Date, number> = new Map<Date, number>();
  pollenToDate: Map<Date, number>;

  sneezes: Sneeze[];
  users: User[];
  pollen: Pollen[];

  selectedUser: User;

  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: [10, 20, 30, 50], label: 'Sneezes'},
    { data: [5.4, 15, 3.2, 15], label: 'Pollen', type: 'line'}
  ];

  chartLabels = ['1', '2', '3', '4',];

  constructor(private userApiServce: UserAPIService, private changeService: ChangeService) {
    this.changeService.getSneeze().subscribe(sneeze => {
      this.sneezes.unshift(sneeze);
    });
  }

  ngOnInit() {
    this.userApiServce.getSneezes().subscribe((data) => {
      this.sneezes = data;
      this.userApiServce.getPollen().subscribe((data) => {
        this.pollen = data;
        this.fillDict();
      });
    });
  }

  fillDict(){
    this.sneezes.forEach(element => {
      var month = element.date.getMonth;
      var date = element.date.getDate;
      var year = element.date.getUTCFullYear;

      let newDate = year + "/" + month + "/" + date;

      let thisdate = new Date("2008/10/28");

      if (this.dateCount.has(thisdate)){
        var val = this.dateCount.get(thisdate);
        this.dateCount.set(thisdate, val + 1);
      }else{
        this.dateCount.set(thisdate, 1);
      }
    });

    console.log(this.dateCount);
  }
}
