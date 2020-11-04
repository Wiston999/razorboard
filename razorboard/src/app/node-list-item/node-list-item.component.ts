import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ColorTagService } from '../color-tag.service';
import { RazorapiService } from '../razorapi.service';
import { ToastrService } from 'ngx-toastr';
import { NodeReinstallModalComponent } from '../node-reinstall-modal/node-reinstall-modal.component';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ApiResponse } from '../models/apiresponse.model';

import { faFileAlt, faRedoAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: '[node-list-item]',
  templateUrl: './node-list-item.component.html',
  styleUrls: ['./node-list-item.component.css']
})
export class NodeListItemComponent implements OnInit {
  @Input() node;
  @Input() columns: string[];
  @Output() filter = new EventEmitter<string>();

  faFileAlt = faFileAlt;
  faRedoAlt = faRedoAlt;
  faInfo = faInfoCircle;

  constructor(
    public colorTag: ColorTagService,
    private modalService: NgbModal,
    private razorapiService: RazorapiService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
  }

  openReinstallModal() {
    const modalRef = this.modalService.open(NodeReinstallModalComponent);
    modalRef.componentInstance.nodeId = this.node.name;
    modalRef.result.then((result) => {
      this.razorapiService.reinstallNode(this.node.name, result === 'on').subscribe(
        response => {
          this.toastr.success('Node will be reinstalled!', 'Success');
        },
        err => {
          this.toastr.error(err.message, 'Unable to mark node to reinstall');
        }
      );
    });
  }

  onFilter(value: string) {
    this.filter.emit(value);
  }
}
