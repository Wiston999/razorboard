import { fakeAsync, tick, async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { RepoListItemComponent } from './repo-list-item.component';

describe('RepoListItemComponent', () => {
  let component: RepoListItemComponent;
  let fixture: ComponentFixture<RepoListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoListItemComponent ],
      imports: [
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoListItemComponent);
    component = fixture.componentInstance;
    component.repo = {name: 'repo1', url: 'http://example.org', iso_url: null, task: null};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show default values', () => {
    const col1 = fixture.nativeElement.querySelector('th');
    const col2 = fixture.nativeElement.querySelector('td:nth-of-type(1) > a');
    const col3 = fixture.nativeElement.querySelector('td:nth-of-type(2)');
    expect(col1.textContent.trim()).toBe('repo1');
    expect(col2.textContent.trim()).toBe('http://example.org');
    expect(col2.href).toBe('http://example.org/');
    expect(col3.textContent.trim()).toBe('--');
  });

  it('should show alternative values', fakeAsync(() => {
    component.repo = {name: 'repo2', iso_url: 'http://example.org', url: null, task: {name: 'task1'}};
    fixture.detectChanges();
    tick();
    const col1 = fixture.nativeElement.querySelector('th');
    const col2 = fixture.nativeElement.querySelector('td:nth-of-type(1) > a');
    const col3 = fixture.nativeElement.querySelector('td:nth-of-type(2) > a');
    expect(col1.textContent.trim()).toBe('repo2');
    expect(col2.textContent.trim()).toBe('http://example.org');
    expect(col2.href).toBe('http://example.org/');
    expect(col3.textContent.trim()).toBe('task1');
    expect(col3.href).toMatch(new RegExp('/tasks\\?search=task1$'));
  }));

  it('should prefer url over iso_url', fakeAsync(() => {
    component.repo = {name: 'repo2', url: 'http://example.org', iso_url: 'http://no-to-be-shown.org', task: null};
    fixture.detectChanges();
    tick();
    const col2 = fixture.nativeElement.querySelector('td:nth-of-type(1) > a');
    expect(col2.textContent.trim()).toBe('http://example.org');
    expect(col2.href).toBe('http://example.org/');
  }));
});
