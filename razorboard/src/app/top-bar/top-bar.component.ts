import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { faCogs } from '@fortawesome/free-solid-svg-icons';

import { RazorapiService } from '../razorapi.service';
import { HttpLoadingService } from '../http-loading.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  @Input() title: string;
  activeItem: string;
  connForm: FormGroup;

  httpLoading: Subject<boolean> = this.loaderService.loading;

  faCogs = faCogs;

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
    private loaderService: HttpLoadingService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.connForm = new FormGroup({
      endpoint: new FormControl(this.razorapiService.getEndpoint(), [
        Validators.required,
        Validators.pattern('^(https?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$'),
      ]),
      username: new FormControl(this.razorapiService.getUsername()),
      password: new FormControl(this.razorapiService.getPassword()),
      refresh: new FormControl({value: this.razorapiService.getRefresh(), disabled: !this.razorapiService.getRefreshEnabled()}),
      refreshEnabled: new FormControl(this.razorapiService.getRefreshEnabled()),
    });
    this.connForm.get('refreshEnabled').valueChanges.subscribe(v => {
      if (v) {
        this.connForm.get('refresh').enable();
      } else {
        this.connForm.get('refresh').disable();
      }
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'settings-modal'}).result.then((result) => {
      if (result === 'save') {
        this.razorapiService.connect(
          this.connForm.value.endpoint,
          this.connForm.value.username,
          this.connForm.value.password,
          this.connForm.value.refresh,
          this.connForm.value.refreshEnabled,
        );
      }
    });
  }
}
