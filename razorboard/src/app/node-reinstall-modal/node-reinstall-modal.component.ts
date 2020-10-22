import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-node-reinstall-modal',
  templateUrl: './node-reinstall-modal.component.html',
  styleUrls: ['./node-reinstall-modal.component.css']
})
export class NodeReinstallModalComponent implements OnInit {
  @Input() nodeId: string;

  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
    console.log('On modal', this.nodeId);
  }
}
