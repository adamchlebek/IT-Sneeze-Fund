import { ChangeService } from './../change.service';
import { PieComponent } from './../pie/pie.component';
import { StatsComponent } from './../stats/stats.component';
import { UserAPIService } from './../user-api.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, Output, EventEmitter, TemplateRef, HostListener } from '@angular/core';

import { User } from './../user';
import { Sneeze } from '../sneeze';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  users: User[];
  modalRef: BsModalRef;
  message: string;
  user: User;
  hide: boolean;
  oldVersion: boolean;
  counter: number = 0;
  code: string;
  multiplier: number;
  generated: boolean = false;

  //-----------//
  testing: boolean = false;
  //----------//

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

    this.userApiServce.getCode().subscribe(data => {
      this.code = data;

      if((<HTMLInputElement>document.getElementById("code")).value == this.code){
        this.getMultiplier(user);
      }else{
        document.getElementById("confirmation").classList.add("shake");
        document.getElementById("code").classList.add("error");
      }
    });
  }

  decline(): void {
    this.modalRef.hide();
    this.hide = true;
    this.generated = false;
  }

  ngOnInit() {
    this.hide = true;
    this.oldVersion = false;
    this.userApiServce.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  getMultiplier(user: User){
    //Set Multiplier Value
    let multiplier: number = 1;
    this.message = "Your multiplier is...";
    this.hide = true;
    this.generated = true;

    let rnd: number = Math.floor((Math.random() * 100) + 1);

    switch(true){
      case (rnd < 6):
        this.multiplier = .25;
        break;
      case (rnd < 26):
        this.multiplier = .5;
        break;
      case (rnd < 76):
        this.multiplier = 1;
        break;
      case (rnd < 96):
        this.multiplier = 2;
        break;
      default:
        this.multiplier = 4;
        break;
    }

    //this.generated = false;
    this.addSneeze(user, this.multiplier);
  }

  addSneeze(user: User, multiplier: number) {
    //this.changeService.toggle();
    //You have added a sneeze!
    this.createSneeze(user);
    this.changeService.updateUser(user);
    this.userApiServce.addSneeze(this.user, multiplier);
  }

  testSneeze(user: User){
    this.createSneeze(user);
    this.changeService.updateUser(user);
    this.userApiServce.testSneeze(user);
  }

  createSneeze(user: User){
    var thisSneeze: Sneeze = new Sneeze();

    thisSneeze.name = user.name;
    thisSneeze.date = new Date();

    this.changeService.addSneeze(thisSneeze);
  }

  toggle(){
    this.oldVersion = !this.oldVersion;
  }
}
