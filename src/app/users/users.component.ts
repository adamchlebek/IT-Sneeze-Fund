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
  hide: boolean;

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-sm'
  };

  constructor(private userApiServce: UserAPIService, private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>, user: User) {
    this.user = user;
    this.message = 'Are you sure ' + user.name + ' just sneezed?';
    this.modalRef = this.modalService.show(template, this.config);
  }

  confirm(): void {
    this.hide = false;
    //this.addSneeze();
  }

  checkCode(){
    document.getElementById("confirmation").classList.remove("shake");

    if((<HTMLInputElement>document.getElementById("code")).value == "sneeze"){
      this.addSneeze();
    }else{
      document.getElementById("confirmation").classList.add("shake");
      document.getElementById("code").classList.add("error");
    }
  }

  decline(): void {
    this.modalRef.hide();
    this.hide = true;
  }

  ngOnInit() {
    this.hide = true;
    this.userApiServce.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  addSneeze() {
    this.modalRef.hide();
    this.hide = true;
    //You have added a sneeze!
    this.userApiServce.addSneeze(this.user);
  }
}
