import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokersListComponent } from './brokers-list.component';

describe('BrokersListComponent', () => {
  let component: BrokersListComponent;
  let fixture: ComponentFixture<BrokersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
