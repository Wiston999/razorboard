import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationListItemComponent } from './configuration-list-item.component';

describe('ConfigurationListItemComponent', () => {
  let component: ConfigurationListItemComponent;
  let fixture: ComponentFixture<ConfigurationListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
