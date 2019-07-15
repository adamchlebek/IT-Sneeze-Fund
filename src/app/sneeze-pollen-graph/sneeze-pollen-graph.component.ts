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
  dateCount: Map<string, number> = new Map<string, number>();
  pollenToDate: Map<Date, number>;

  sneezes: Sneeze[];
  users: User[];
  pollen: Pollen[];

  selectedUser: User;

  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: [], label: 'Sneezes'},
    { data: [], label: 'Pollen', type: 'line'}
  ];

  chartLabels = [];

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
    this.pollen.forEach(element => {
      let el = new Date(element.date);
      let elMon = el.getMonth() + 1;
      let elementDate = elMon + '/' + el.getDate().toString() + '/' +  el.getFullYear().toString();
      this.dateCount.set(elementDate.toString(), 0);

      this.sneezes.forEach(sneeze => {
        let sn = new Date(sneeze.date);
        let snMon = sn.getMonth() + 1;
        let sneezeDate = snMon + '/' + sn.getDate().toString() + '/' +  sn.getFullYear().toString();
        if (elementDate === sneezeDate){
          let val = this.dateCount.get(elementDate);
          this.dateCount.set(elementDate, val + 1);
        }
      });

      this.chartData[1].data.push(element.index);
    });

    for(let item of Array.from(this.dateCount)){
      this.chartLabels.push(item[0]);
      this.chartData[0].data.push(item[1]);
    }

  }
}
