import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { hookList } from '../../testing/apiresponse.model.mock';

import { HookListItemComponent } from './hook-list-item.component';

describe('HookListItemComponent', () => {
  let component: HookListItemComponent;
  let fixture: ComponentFixture<HookListItemComponent>;
  const hookObj = hookList[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HookListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HookListItemComponent);
    component = fixture.componentInstance;
    component.hook = JSON.parse(JSON.stringify(hookObj));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show name column', () => {
    const content = fixture.nativeElement.querySelector('th');
    expect(content.textContent.trim()).toBe(hookObj.name);
  });

  it('should show hook_type column', () => {
    const content = fixture.nativeElement.querySelector('td:nth-of-type(1)');
    expect(content.textContent.trim()).toBe(hookObj.hook_type);
  });
});
