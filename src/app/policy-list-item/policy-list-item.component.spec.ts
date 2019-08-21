import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyListItemComponent } from './policy-list-item.component';

describe('PolicyListItemComponent', () => {
  let component: PolicyListItemComponent;
  let fixture: ComponentFixture<PolicyListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
