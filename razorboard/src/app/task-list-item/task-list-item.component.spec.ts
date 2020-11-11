import { fakeAsync, tick, async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { TaskListItemComponent } from './task-list-item.component';

describe('TaskListItemComponent', () => {
  let component: TaskListItemComponent;
  let fixture: ComponentFixture<TaskListItemComponent>;
  const baseTaskObj = {
    name: 'task1',
    os: {name: 'debian', version: 'buster'},
    base: null,
    boot_seq: {
      1: 'boot_install',
      default: 'boot_local',
    },
    description: 'Test task'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListItemComponent ],
      imports: [
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListItemComponent);
    component = fixture.componentInstance;
    component.task = baseTaskObj;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show default values', () => {
    const col1 = fixture.nativeElement.querySelector('th');
    const col2 = fixture.nativeElement.querySelector('td:nth-of-type(1)');
    const col3 = fixture.nativeElement.querySelector('td:nth-of-type(2)');
    const col4 = fixture.nativeElement.querySelector('td:nth-of-type(3)');
    const col5 = fixture.nativeElement.querySelector('td:nth-of-type(4)');
    expect(col1.textContent.trim()).toBe(baseTaskObj.name);
    expect(col2.textContent.trim()).toBe(baseTaskObj.os.version);
    expect(col3.textContent.trim()).toBe('--');
    for (const step of Object.keys(baseTaskObj.boot_seq)) {
      const action = baseTaskObj.boot_seq[step];
      expect(col4.textContent.trim()).toContain(`${step}: ${action}`);
    }
    expect(col5.textContent.trim()).toBe(baseTaskObj.description);
  });

  it('should show render base task', fakeAsync(() => {
    spyOn(component, 'onFilter');
    const customTask = {...baseTaskObj};
    customTask.base = {name: 'centos'};
    component.task = customTask;
    fixture.detectChanges();
    tick();

    const col3 = fixture.nativeElement.querySelector('td:nth-of-type(2) > span');
    expect(col3.textContent.trim()).toBe(customTask.base.name);
    col3.click();
    tick();
    expect(component.onFilter).toHaveBeenCalledWith(customTask.base.name);
  }));

  it('should emit onFilter value', () => {
    spyOn(component.filter, 'emit');
    component.onFilter('test-emitted-value');

    expect(component.filter.emit).toHaveBeenCalledWith('test-emitted-value');
  });
});
