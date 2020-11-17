import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { faCogs, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

import { SettingsModalComponent } from '../settings-modal/settings-modal.component';
import { RazorapiService } from '../razorapi.service';
import { HttpEventsService } from '../http-events.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  @Input() title: string;
  activeItem: string;

  httpLoading: Subject<boolean> = this.httpEventsService.loading;

  faCogs = faCogs;
  faPlay = faPlay;
  faPause = faPause;

  menuItems = [
    {
      link: '/nodes',
      name: 'Nodes',
    },
    {
      link: '/repos',
      name: 'Repos',
    },
    {
      link: '/tags',
      name: 'Tags',
    },
    {
      link: '/policies',
      name: 'Policies',
    },
    {
      link: '/tasks',
      name: 'Tasks',
    },
    {
      link: '/brokers',
      name: 'Brokers',
    },
    {
      link: '/hooks',
      name: 'Hooks',
    },
    {
      link: '/configuration',
      name: 'Configuration',
    },
  ];

  constructor(
    public razorapiService: RazorapiService,
    private httpEventsService: HttpEventsService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
  }

  open(content) {
    const modalRef = this.modalService.open(SettingsModalComponent);
    modalRef.componentInstance.title = this.title;
  }

  switchRefresh(value: boolean) {
    this.razorapiService.setRefreshEnabled(!value);
  }
}
