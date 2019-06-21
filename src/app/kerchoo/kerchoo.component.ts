import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-kerchoo',
  templateUrl: './kerchoo.component.html',
  styleUrls: ['./kerchoo.component.scss']
})
export class KerchooComponent implements OnInit {
  modalRef: BsModalRef;
  message: string;

  config = {
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-sm'
  };

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.message = 'Are you sure you want to delete this sneeze?';
    this.modalRef = this.modalService.show(template, this.config);
  }

  close(){
    this.modalRef.hide();
  }
}


