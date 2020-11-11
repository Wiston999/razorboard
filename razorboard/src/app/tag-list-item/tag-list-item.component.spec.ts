import { fakeAsync, tick, async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagListItemComponent } from './tag-list-item.component';

import { RainbowBracketsPipe } from '../rainbow-brackets.pipe';

describe('TagListItemComponent', () => {
  let component: TagListItemComponent;
  let fixture: ComponentFixture<TagListItemComponent>;
  const baseTagObj = {
    name: 'tag1',
    nodes: {count: 10},
    policies: {count: 10},
    rule: [ 'a', 'b', [ [ 'c' ], 'd'] ],
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagListItemComponent, RainbowBracketsPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagListItemComponent);
    component = fixture.componentInstance;
    component.tag = baseTagObj;
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
    expect(col1.textContent.trim()).toBe(baseTagObj.name);
    expect(col2.textContent.trim()).toBe(baseTagObj.nodes.count.toString());
    expect(col3.textContent.trim()).toBe(baseTagObj.policies.count.toString());
    expect(JSON.parse(col4.textContent)).toEqual(baseTagObj.rule);
  });
});
