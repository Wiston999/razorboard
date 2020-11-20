import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ColorTagService } from '../../color-tag.service';
import { RazorapiService } from '../../razorapi.service';
import { NodeReinstallModalComponent } from '../../node-reinstall-modal/node-reinstall-modal.component';
import { ApiResponse } from '../../models/apiresponse.model';
import { RowComponent } from '../../table-polled/table-polled.component';

import { faFileAlt, faRedoAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: '[node-list-item]',
  templateUrl: './node-list-item.component.html',
  styleUrls: ['./node-list-item.component.css']
})
export class NodeListItemComponent implements OnInit, RowComponent {
  @Input() data;
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
    modalRef.componentInstance.nodeId = this.data.name;
    modalRef.result.then((result) => {
      this.razorapiService.reinstallNode(this.data.name, result === 'on').subscribe(
        response => {
          this.toastr.success('Node will be reinstalled!', 'Success');
        }
      );
    });
  }

  onFilter(value: string) {
    this.filter.emit(value);
  }
}
