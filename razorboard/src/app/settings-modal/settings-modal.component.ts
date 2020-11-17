import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { RazorapiService } from '../razorapi.service';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.css']
})
export class SettingsModalComponent implements OnInit {
  @Input() title: string;
  connForm: FormGroup;

  constructor(
    public modal: NgbActiveModal,
    public razorapiService: RazorapiService,
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

  save() {
    this.razorapiService.connect(
      this.connForm.value.endpoint,
      this.connForm.value.username,
      this.connForm.value.password,
      this.connForm.value.refresh,
      this.connForm.value.refreshEnabled,
    );

    this.modal.close('save');
  }
}
