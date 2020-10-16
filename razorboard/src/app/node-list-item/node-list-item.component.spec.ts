import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeListItemComponent } from './node-list-item.component';

describe('NodeListItemComponent', () => {
  let component: NodeListItemComponent;
  let fixture: ComponentFixture<NodeListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
