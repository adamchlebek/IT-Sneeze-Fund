import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { UserAPIService } from '../user-api.service';
import { User } from '../user';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
  users: User[];

  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartType = 'pie';
  public pieColors =[{
    backgroundColor: [
      'rgba(12, 173, 30, 1)',
      'rgba(239, 178, 247, 1)',
      'rgba(15, 50, 9, 1)',
      'rgba(147, 147, 147, 1)',
      'rgba(85, 206, 237, 1)'
    ]
  }];

  constructor(private userApiServce: UserAPIService) { }

  ngOnInit() {
    this.userApiServce.getUsers().subscribe((data) => {
      this.users = data;

      data.map((user) => {
        this.pieChartLabels.push(user.name);
        this.pieChartData.push(user.count);
      });

    });


  }
}
