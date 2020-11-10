import { fakeAsync, tick, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { policyList } from '../../testing/apiresponse.model.mock';

import { PolicyListItemComponent } from './policy-list-item.component';

describe('PolicyListItemComponent', () => {
  let component: PolicyListItemComponent;
  let fixture: ComponentFixture<PolicyListItemComponent>;
  const policyObj = policyList[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyListItemComponent ],
      imports: [
        RouterTestingModule,
        FontAwesomeModule,
        NoopAnimationsModule,
        NgbModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyListItemComponent);
    component = fixture.componentInstance;
    component.policy = JSON.parse(JSON.stringify(policyObj));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show name column', () => {
    const content = fixture.nativeElement.querySelector('th');
    expect(content.textContent.trim()).toBe(policyObj.name);
  });

  it('should show policy column', () => {
    const content = fixture.nativeElement.querySelector('td:nth-of-type(1) > a');
    expect(content.textContent.trim()).toBe(policyObj.repo.name);
    expect(content.href).toMatch(new RegExp(`/repos\\?search=${policyObj.repo.name}$`));
  });

  it('should show null policy column', fakeAsync(() => {
    delete component.policy.repo.name;
    fixture.detectChanges();
    tick();

    const content = fixture.nativeElement.querySelector('td:nth-of-type(1)');
    expect(content.textContent.trim()).toBe('--');
  }));

  it('should show broker column', () => {
    const content = fixture.nativeElement.querySelector('td:nth-of-type(2) > a');
    expect(content.textContent.trim()).toBe(policyObj.broker.name);
    expect(content.href).toMatch(new RegExp(`/brokers\\?search=${policyObj.broker.name}$`));
  });

  it('should show null broker column', fakeAsync(() => {
    delete component.policy.broker.name;
    fixture.detectChanges();
    tick();

    const content = fixture.nativeElement.querySelector('td:nth-of-type(2)');
    expect(content.textContent.trim()).toBe('--');
  }));

  it('should show task column', () => {
    const content = fixture.nativeElement.querySelector('td:nth-of-type(3) > a');
    expect(content.textContent.trim()).toBe(policyObj.task.name);
    expect(content.href).toMatch(new RegExp(`/tasks\\?search=${policyObj.task.name}$`));
  });

  it('should show null task column', fakeAsync(() => {
    delete component.policy.task.name;
    fixture.detectChanges();
    tick();

    const content = fixture.nativeElement.querySelector('td:nth-of-type(3)');
    expect(content.textContent.trim()).toBe('--');
  }));

  it('should show tag column', () => {
    const content = fixture.nativeElement.querySelectorAll('td:nth-of-type(4) > span');
    const policyTags = policyObj.tags.map(t => t.name);

    expect(policyTags.length).toEqual(content.length);
    for (const element of content) {
      expect(policyTags).toContain(element.textContent.trim());
    }
  });

  it('should show enabled column', () => {
    const content = fixture.nativeElement.querySelector('td:nth-of-type(5)');
    expect(content.textContent.trim()).toBe(policyObj.enabled.toString());
  });

  it('should show %nodes column', () => {
    const content = fixture.nativeElement.querySelector('td:nth-of-type(6)');
    const expectedContent1 = `${policyObj.nodes.count} of ${policyObj.max_count}`;
    const expectedContent2 = Math.floor(policyObj.nodes.count / policyObj.max_count * 100);
    expect(content.textContent.trim()).toContain(expectedContent1);
    expect(content.textContent.trim()).toContain(`${expectedContent2} %`);
  });


  it('should show bar color', fakeAsync(() => {
    component.policy.max_count = 100;
    component.policy.nodes.count = 100;
    expect(component.barColor()).toBe('danger');
    component.policy.nodes.count = 101;
    expect(component.barColor()).toBe('danger');
    component.policy.nodes.count = 90;
    expect(component.barColor()).toBe('warning');
    component.policy.nodes.count = 85;
    expect(component.barColor()).toBe('warning');
    component.policy.nodes.count = 84;
    expect(component.barColor()).toBe('info');
    component.policy.nodes.count = 10;
    expect(component.barColor()).toBe('info');
  }));

});
