import { UserAPIService } from './../user-api.service';
import { Component, OnInit } from '@angular/core';

import { Sneeze } from '../sneeze';
import { User } from '../user';

@Component({
  selector: 'app-spd',
  templateUrl: './spd.component.html',
  styleUrls: ['./spd.component.css']
})

export class SpdComponent implements OnInit {
  sneezes: Sneeze[];
  users: User[];

  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: [], label: 'Account A' }
  ];

  chartLabels = [];

  constructor(private userApiServce: UserAPIService) { }

  ngOnInit() {
    this.userApiServce.getSneezes().subscribe((data) => {
      this.sneezes = data;

      data.forEach((sneeze) => {

      });
    });
  }

}
