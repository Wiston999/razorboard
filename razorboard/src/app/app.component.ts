import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';

import { SettingsModalComponent } from './settings-modal/settings-modal.component';
import { HttpEventsService } from './http-events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'RazorBoard';
  version = environment.version;

  constructor(
    private modalService: NgbModal,
    private httpEvents: HttpEventsService,
  ) { }

  ngOnInit() {
    this.httpEvents.status$.subscribe(
      st => {
        // HTTP 4XX errors migth mean an invalid endpoint or credentials (401)
        // Error 0 mean generic error, and might mean an invalid endpoint
        if ((st >= 400 && st < 500) || st === 0) {
          this.openSettingsModal(st);
        }
      }
    );
  }

  openSettingsModal(httpStatus: number) {
    const modalRef = this.modalService.open(SettingsModalComponent);
    modalRef.componentInstance.title = this.title;
    if (httpStatus === 401) {
      modalRef.componentInstance.errMsg = 'Unauthorized response from server, please check your credentials';
    } else {
      modalRef.componentInstance.errMsg =
        `HTTP error ${httpStatus} returned from server, please check that endpoint and credentials are correct`;
    }
  }

}
