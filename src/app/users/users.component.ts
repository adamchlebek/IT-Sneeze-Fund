import { ChangeService } from './../change.service';
import { PieComponent } from './../pie/pie.component';
import { StatsComponent } from './../stats/stats.component';
import { UserAPIService } from './../user-api.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, Output, EventEmitter, TemplateRef, HostListener } from '@angular/core';

import { User } from './../user';
import { Sneeze } from '../sneeze';

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
  counter: number = 0;
  testing: boolean = false;

  curUser: User;

  @Output() valueChange = new EventEmitter<User>();

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-sm'
  };

  constructor(private userApiServce: UserAPIService,
    private modalService: BsModalService,
    private changeService: ChangeService) { }


  openModal(template: TemplateRef<any>, user: User) {
    this.user = user;
    this.message = 'Are you sure ' + user.name + ' just sneezed?';
    this.modalRef = this.modalService.show(template, this.config);
  }

  confirm(): void {
    this.hide = false;
    //this.addSneeze();
  }

  checkCode(user: User){
    document.getElementById("confirmation").classList.remove("shake");

    if((<HTMLInputElement>document.getElementById("code")).value == "sneeze"){
      this.addSneeze(user);
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

  addSneeze(user: User) {
    //this.changeService.toggle();
    this.modalRef.hide();
    this.hide = true;
    //You have added a sneeze!
    this.createSneeze(user);
    this.changeService.updateUser(user);
    this.userApiServce.addSneeze(this.user);
  }

  testSneeze(user: User){
    this.createSneeze(user);
    this.changeService.updateUser(user);
    this.userApiServce.testSneeze(this.user);
  }

  createSneeze(user: User){
    var thisSneeze: Sneeze = new Sneeze();

    thisSneeze.name = user.name;
    thisSneeze.date = new Date();

    this.changeService.addSneeze(thisSneeze);
  }
}
