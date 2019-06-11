import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  @Input() name: string;
  @Input() count: number;

  personName: string;
  personCount: number;

  constructor() { }

  ngOnInit() {
    this.personName = this.name;
    this.personCount = this.count;
  }

}
