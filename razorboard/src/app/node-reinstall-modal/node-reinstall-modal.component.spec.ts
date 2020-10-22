import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeReinstallModalComponent } from './node-reinstall-modal.component';

describe('NodeReinstallModalComponent', () => {
  let component: NodeReinstallModalComponent;
  let fixture: ComponentFixture<NodeReinstallModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeReinstallModalComponent ]
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
