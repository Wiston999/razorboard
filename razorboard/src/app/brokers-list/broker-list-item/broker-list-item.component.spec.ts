import { fakeAsync, tick, async, ComponentFixture, TestBed } from '@angular/core/testing';

import { brokerList } from '../../../testing/apiresponse.model.mock';

import { BrokerListItemComponent } from './broker-list-item.component';

describe('BrokerListItemComponent', () => {
  let component: BrokerListItemComponent;
  let fixture: ComponentFixture<BrokerListItemComponent>;
  const broker = brokerList[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokerListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerListItemComponent);
    component = fixture.componentInstance;
    component.data = {...broker}; // Deep copy?
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show broker name', () => {
    const content = fixture.nativeElement.querySelector('th');
    expect(content.textContent.trim()).toBe(broker.name);
  });

  it('should show broker type', () => {
    const content = fixture.nativeElement.querySelector('td:nth-of-type(1)');
    expect(content.textContent.trim()).toBe(broker.broker_type);
  });

  it('should show broker null type', fakeAsync(() => {
    component.data.broker_type = null;
    fixture.detectChanges();
    tick();
    const content = fixture.nativeElement.querySelector('td:nth-of-type(1)');
    expect(content.textContent.trim()).toBe('--');
  }));

  it('should show broker number of policies', () => {
    const content = fixture.nativeElement.querySelector('td:nth-of-type(2)');
    expect(content.textContent.trim()).toBe(broker.policies.count.toString());
  });

  it('should show broker configuration', () => {
    const content = fixture.nativeElement.querySelector('td:nth-of-type(3)');
    for (const key of Object.keys(broker.configuration)) {
      const value = broker.configuration[key].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      expect(content.textContent).toMatch(new RegExp(`${key}\\s+=\\s+${value}`));
    }
  });
});
