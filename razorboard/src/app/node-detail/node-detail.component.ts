import { Component, OnInit } from '@angular/core';
import { isDevMode } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { faServer } from '@fortawesome/free-solid-svg-icons';

import { HttpEventsService } from '../http-events.service';
import { NodeReinstallModalComponent } from '../node-reinstall-modal/node-reinstall-modal.component';
import { PolledViewComponent } from '../polled-view';
import { RazorapiService } from '../razorapi.service';
import { ColorTagService } from '../color-tag.service';
import { Node } from '../models/node.model';

@Component({
  selector: 'app-node-detail',
  templateUrl: './node-detail.component.html',
  styleUrls: ['./node-detail.component.css']
})
export class NodeDetailComponent extends PolledViewComponent implements OnInit {
  nodeId: string;
  devMode = false;
  editMode = false;
  showEmpty = false;
  node: Node;
  editNode: Node;
  faServer = faServer;
  newMetadataKey = '';
  newMetadataValue = '';
  factsShown: {string: any};
  filterFacts = '';

  constructor(
    public razorApi: RazorapiService,
    public route: ActivatedRoute,
    public router: Router,
    public title: Title,
    public httpEventsService: HttpEventsService,
    private modalService: NgbModal,
    private titleService: Title,
    private toastr: ToastrService,
    public colorTag: ColorTagService,
  ) {
    super(razorApi, route, router, titleService, httpEventsService);
    this.devMode = isDevMode();
    this.node = new Node();
    this.editNode = new Node();
  }

  ngOnInit() {
    this.nodeId = this.route.snapshot.paramMap.get('id');
    this.titleService.setTitle(`Node Details - ${this.nodeId}`);
    super.ngOnInit();
  }

  getData() {
    if (!this.nodeId) {
      throw new Error('Node ID is undefined');
    }

    return this.razorApi.getNode(this.nodeId);
  }

  processData(response: Node) {
    this.node = response;
    this.factsShown = this.node.facts;
  }

  metadataSave(action: string) {
    if (action === 'save') {
      const update = {};
      const remove = Object.keys(this.node.metadata).filter(
        key => !(key in this.editNode.metadata)
      );

      for (const key in this.editNode.metadata) {
        if (!(key in this.node.metadata) || (this.editNode.metadata[key] !== this.node.metadata[key])) {
          update[key] = this.editNode.metadata[key];
        }
      }

      this.razorApi.modifyNodeMetadata(this.nodeId, update as {string: any}, remove).subscribe(
        response => {
          this.toastr.success('Node metadata updated!', 'Success');
        }
      );
    }
    this.editMode = false;
  }

  editStart() {
    this.editNode.metadata = Object.assign({}, this.node.metadata);
    this.editMode = true;
  }

  metadataAdd() {
    this.editNode.metadata[this.newMetadataKey] = this.newMetadataValue;
    this.newMetadataKey = this.newMetadataValue = '';
  }

  metadataChange(key, value) {
    this.editNode.metadata[key] = value;
  }

  metadataDelete(key) {
    delete this.editNode.metadata[key];
  }

  openReinstallModal() {
    const modalRef = this.modalService.open(NodeReinstallModalComponent);
    modalRef.componentInstance.nodeId = this.node.name;
    modalRef.result.then((result) => {
      this.razorApi.reinstallNode(this.node.name, result).subscribe(
        response => {
          this.toastr.success('Node will be reinstalled!', 'Success');
        },
        err => {
          this.toastr.error(err.message, 'Unable to mark node to reinstall');
        }
      );
    });
  }

  filterFactsChanged() {
    if (this.filterFacts) {
      this.showEmpty = true;
    }
  }
}
