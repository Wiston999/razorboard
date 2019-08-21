import { Component, OnInit, Input } from '@angular/core';
import { ColorTagService } from '../color-tag.service';
import { RazorapiService } from '../razorapi.service';
import { ToastrService } from 'ngx-toastr';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ApiResponse } from '../models/apiresponse.model';

import { faFileAlt, faRedoAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: '[node-list-item]',
  templateUrl: './node-list-item.component.html',
  styleUrls: ['./node-list-item.component.css']
})
export class NodeListItemComponent implements OnInit {
  @Input() node;
  @Input() columns:string[];

  private faFileAlt = faFileAlt;
  private faRedoAlt = faRedoAlt;
  private faInfo = faInfoCircle;
  private reinstallForm: FormGroup;

  constructor(
    private colorTag: ColorTagService,
    private modalService: NgbModal,
    private razorapiService: RazorapiService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.reinstallForm = new FormGroup({
      keepPolicy: new FormControl(true),
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'reinstall-modal'}).result.then((result) => {
      if (result === 'ok') {
        this.razorapiService.reinstallNode(
          this.node.name,
          this.reinstallForm.value.keepPolicy,
        ).subscribe(
          response => {
            this.toastr.success('Node will be reinstalled!', 'Success');
          },
          err => {
            this.toastr.error(err.message, 'Unable to mark node to reinstall');
          }
        );
      } else {
        console.log('Dismissed modal');
      }
    }, (reason) => {
      console.log('Modal Closed');
    });
  }
}
