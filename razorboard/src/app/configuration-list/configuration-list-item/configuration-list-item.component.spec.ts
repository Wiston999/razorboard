import { fakeAsync, tick, async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationListItemComponent } from './configuration-list-item.component';

describe('ConfigListItemComponent', () => {
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
    component.data = {name: 'test', value: 'test'};
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
    component.data = {name: 'test', value: false};
    fixture.detectChanges();
    tick();
    const col1 = fixture.nativeElement.querySelector('th');
    const col2 = fixture.nativeElement.querySelector('td');
    expect(col1.textContent.trim()).toEqual('test');
    expect(col2.textContent.trim()).toEqual('false');
  }));

  it('should show number', fakeAsync(() => {
    component.data = {name: 'test', value: 10};
    fixture.detectChanges();
    tick();
    const col1 = fixture.nativeElement.querySelector('th');
    const col2 = fixture.nativeElement.querySelector('td');
    expect(col1.textContent.trim()).toEqual('test');
    expect(col2.textContent.trim()).toEqual('10');
  }));

  it('should show list', fakeAsync(() => {
    component.data = {name: 'test', value: ['val1', 'val2']};
    fixture.detectChanges();
    tick();
    const col1 = fixture.nativeElement.querySelector('th');
    const col2 = fixture.nativeElement.querySelector('td');
    expect(col1.textContent.trim()).toEqual('test');
    expect(JSON.parse(col2.textContent.trim())).toEqual([ 'val1', 'val2' ]);
  }));

  it('should show null', fakeAsync(() => {
    component.data = {name: 'test', value: null};
    fixture.detectChanges();
    tick();
    const col1 = fixture.nativeElement.querySelector('th');
    const col2 = fixture.nativeElement.querySelector('td');
    expect(col1.textContent.trim()).toEqual('test');
    expect(col2.textContent.trim()).toEqual('null');
  }));
});
