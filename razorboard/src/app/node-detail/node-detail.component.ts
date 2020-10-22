import { Component, OnInit } from '@angular/core';
import { isDevMode } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { faServer } from '@fortawesome/free-solid-svg-icons';

import { PolledView } from '../polled-view';
import { RazorapiService } from '../razorapi.service';
import { ColorTagService } from '../color-tag.service';
import { Node } from '../models/node.model';

@Component({
  selector: 'app-node-detail',
  templateUrl: './node-detail.component.html',
  styleUrls: ['./node-detail.component.css']
})
export class NodeDetailComponent extends PolledView implements OnInit {
  private nodeId: string;
  devMode = false;
  editMode = false;
  showEmpty = false;
  node: Node;
  editNode: Node;
  faServer = faServer;

  constructor(
    protected razorApi: RazorapiService,
    protected toastr: ToastrService,
    private route: ActivatedRoute,
    public colorTag: ColorTagService,
  ) {
    super(razorApi, toastr);
    this.devMode = isDevMode();
    this.node = new Node();
    this.editNode = new Node();
  }

  ngOnInit() {
    this.nodeId = this.route.snapshot.paramMap.get('id');
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
  }

  metadataSave(action: string) {
    if (action === 'save') {
      const update = {};
      const remove = Object.keys(this.node.metadata).filter(
        key => !(key in this.editNode.metadata)
      );

      for (const key in this.editNode.metadata) {
        if (this.editNode.metadata[key] !== this.node.metadata[key]) {
          update[key] = this.editNode.metadata[key];
        }
      }

      this.razorApi.modifyNodeMetadata(this.nodeId, update, remove).subscribe(
        response => {
          this.toastr.success('Node metadata updated!', 'Success');
        },
        err => {
          this.toastr.error(err.message, 'Unable to update node metadata');
        }
      );
    }
    this.editMode = false;
  }

  editStart() {
    this.editNode.metadata = Object.assign({}, this.node.metadata);
    this.editMode = true;
  }

  metadataChange(key, value) {
    console.log('On metadataChange', key, value);
    this.editNode.metadata[key] = value;
  }

  metadataDelete(key) {
    delete this.editNode.metadata[key];
  }
}
