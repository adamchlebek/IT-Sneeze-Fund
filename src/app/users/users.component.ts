import { PieComponent } from './../pie/pie.component';
import { StatsComponent } from './../stats/stats.component';
import { UserAPIService } from './../user-api.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';

import { User } from './../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  users: User[];
  modalRef: BsModalRef;
  message: string;
  user: User;

  constructor(private userApiServce: UserAPIService, private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>, user: User) {
    this.user = user;
    this.message = 'Are you sure ' + user.name + ' just sneezed?';
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.addSneeze();
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  ngOnInit() {
    this.userApiServce.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  addSneeze() {
    //You have added a sneeze!
    //this.userApiServce.addSneeze(this.user);
  }
}
