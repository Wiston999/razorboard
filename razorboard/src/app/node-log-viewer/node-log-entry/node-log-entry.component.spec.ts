import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePipe } from '@angular/common';

import { NodeLogEntryComponent } from './node-log-entry.component';
import { nodeLogs } from '../../../testing/apiresponse.model.mock';

describe('NodeLogEntryComponent', () => {
  let component: NodeLogEntryComponent;
  let fixture: ComponentFixture<NodeLogEntryComponent>;
  const date = new DatePipe('en');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeLogEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeLogEntryComponent);
    component = fixture.componentInstance;
    component.data = nodeLogs[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render timestamp column', () => {
    const content = fixture.nativeElement.querySelector('td:nth-of-type(1)');
    expect(content.textContent.trim()).toBe(date.transform(nodeLogs[0].timestamp, 'yyyy-MM-dd HH:mm:ss'));
  });

  it('should render severity column', () => {
    const content = fixture.nativeElement.querySelector('td:nth-of-type(2)');
    expect(content.textContent.trim()).toBe(nodeLogs[0].severity.toUpperCase());
  });
});
