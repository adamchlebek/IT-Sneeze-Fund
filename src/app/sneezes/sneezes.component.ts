import { ChangeService } from './../change.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Sneeze } from '../sneeze';
import { UserAPIService } from '../user-api.service';
import { User } from '../user';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sneezes',
  templateUrl: './sneezes.component.html',
  styleUrls: ['./sneezes.component.css']
})
export class SneezesComponent implements OnInit {
  sneezes: Sneeze[];
  users: User[];
  modalRef: BsModalRef;
  message: string;
  sneeze: Sneeze;
  hide: boolean;
  show: boolean;

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-sm'
  };

  constructor(private userApiServce: UserAPIService, private modalService: BsModalService, private changeService: ChangeService) {
    this.changeService.getSneeze().subscribe(sneeze => {
      this.sneezes.push(sneeze);
    });
  }

  ngOnInit() {
    this.userApiServce.getSneezes().subscribe((data) => {
      this.sneezes = data;
    });

    this.userApiServce.getUsers().subscribe((data) => {
      this.users = data;
    });

    this.hide = true;
    this.show = true;
  }

  openModal(template: TemplateRef<any>, sneeze: Sneeze) {
    this.sneeze = sneeze;
    this.message = 'Are you sure you want to delete this sneeze?';
    this.modalRef = this.modalService.show(template, this.config);
  }

  confirm(): void {
    this.hide = false;
    //this.addSneeze();
  }

  checkCode(){
    document.getElementById("confirmation").classList.remove("shake");

    if((<HTMLInputElement>document.getElementById("code")).value == "nosneeze"){
      this.delSneeze();
    }else{
      document.getElementById("confirmation").classList.add("shake");
      document.getElementById("code").classList.add("error");
    }
  }

  decline(): void {
    this.modalRef.hide();
    this.hide = true;
  }

  delSneeze() {
    this.modalRef.hide();
    this.hide = true;
    //You have added a sneeze!
    this.userApiServce.delSneeze(this.sneeze);

    var index = this.sneezes.indexOf(this.sneeze);
    this.sneezes.splice(index, 1);
  }

  toggle(){
    this.show = !this.show;
  }
}
