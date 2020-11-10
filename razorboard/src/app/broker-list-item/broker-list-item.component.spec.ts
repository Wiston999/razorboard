import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerListItemComponent } from './broker-list-item.component';

describe('BrokerListItemComponent', () => {
  let component: BrokerListItemComponent;
  let fixture: ComponentFixture<BrokerListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokerListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
