import { fakeAsync, tick, async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigListItemComponent } from './config-list-item.component';

describe('ConfigListItemComponent', () => {
  let component: ConfigListItemComponent;
  let fixture: ComponentFixture<ConfigListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigListItemComponent);
    component = fixture.componentInstance;
    component.config = {name: 'test', value: 'test'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show string', () => {
    const col1 = fixture.nativeElement.querySelector('th');
    const col2 = fixture.nativeElement.querySelector('td');
    expect(col1.textContent.trim()).toEqual('test');
    expect(col2.textContent.trim()).toEqual('"test"');
  });

  it('should show boolean', fakeAsync(() => {
    component.config = {name: 'test', value: false};
    fixture.detectChanges();
    tick();
    const col1 = fixture.nativeElement.querySelector('th');
    const col2 = fixture.nativeElement.querySelector('td');
    expect(col1.textContent.trim()).toEqual('test');
    expect(col2.textContent.trim()).toEqual('false');
  }));

  it('should show number', fakeAsync(() => {
    component.config = {name: 'test', value: 10};
    fixture.detectChanges();
    tick();
    const col1 = fixture.nativeElement.querySelector('th');
    const col2 = fixture.nativeElement.querySelector('td');
    expect(col1.textContent.trim()).toEqual('test');
    expect(col2.textContent.trim()).toEqual('10');
  }));

  it('should show list', fakeAsync(() => {
    component.config = {name: 'test', value: ['val1', 'val2']};
    fixture.detectChanges();
    tick();
    const col1 = fixture.nativeElement.querySelector('th');
    const col2 = fixture.nativeElement.querySelector('td');
    expect(col1.textContent.trim()).toEqual('test');
    expect(JSON.parse(col2.textContent.trim())).toEqual([ 'val1', 'val2' ]);
  }));

  it('should show null', fakeAsync(() => {
    component.config = {name: 'test', value: null};
    fixture.detectChanges();
    tick();
    const col1 = fixture.nativeElement.querySelector('th');
    const col2 = fixture.nativeElement.querySelector('td');
    expect(col1.textContent.trim()).toEqual('test');
    expect(col2.textContent.trim()).toEqual('null');
  }));
});
