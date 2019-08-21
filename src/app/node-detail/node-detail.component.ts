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
export class NodeDetailComponent extends PolledView {
  private nodeId: string;
  private node: Node;
  private devMode: boolean = false;
  private showEmpty: boolean = false;
  faServer = faServer;

  constructor(
    protected razorApi: RazorapiService,
    protected toastr: ToastrService,
    private route: ActivatedRoute,
    private colorTag: ColorTagService,
  ) {
    super(razorApi, toastr);
    this.devMode = isDevMode();
    this.node = new Node();
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
}
