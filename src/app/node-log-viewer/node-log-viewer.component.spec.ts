import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeLogViewerComponent } from './node-log-viewer.component';

describe('NodeLogViewerComponent', () => {
  let component: NodeLogViewerComponent;
  let fixture: ComponentFixture<NodeLogViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeLogViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeLogViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
