import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { NodeReinstallModalComponent } from './node-reinstall-modal.component';

describe('NodeReinstallModalComponent', () => {
  let component: NodeReinstallModalComponent;
  let fixture: ComponentFixture<NodeReinstallModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeReinstallModalComponent ],
      providers: [
        NgbActiveModal,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeReinstallModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
