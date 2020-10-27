import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from "@angular/router/testing";

import { NodeLogViewerComponent } from './node-log-viewer.component';

describe('NodeLogViewerComponent', () => {
  let component: NodeLogViewerComponent;
  let fixture: ComponentFixture<NodeLogViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeLogViewerComponent ],
      imports: [
        FormsModule,
        OrderModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    try {
      fixture = TestBed.createComponent(NodeLogViewerComponent);
    } catch { }
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
