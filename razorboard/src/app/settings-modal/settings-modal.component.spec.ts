import { fakeAsync, tick, async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SettingsModalComponent } from './settings-modal.component';

describe('SettingsModalComponent', () => {
  let component: SettingsModalComponent;
  let fixture: ComponentFixture<SettingsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsModalComponent ],
      providers: [
        NgbActiveModal,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NoopAnimationsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable-disable refresh input', fakeAsync(() => {
    component.connForm.get('refreshEnabled').setValue(false);
    tick();
    expect(component.connForm.get('refresh').disabled).toBeTruthy();
    component.connForm.get('refreshEnabled').setValue(true);
    tick();
    expect(component.connForm.get('refresh').disabled).toBeFalsy();
  }));

  it('should call save', fakeAsync(() => {
    spyOn(component, 'save');
    const saveBtn = fixture.nativeElement.querySelector('#save-btn');
    saveBtn.click();
    tick();
    expect(component.save).toHaveBeenCalled();
  }));

  it('should discard changes', fakeAsync(() => {
    spyOn(component, 'save');
    const cancelBtn = fixture.nativeElement.querySelector('#cancel-btn');
    const timesBtn = fixture.nativeElement.querySelector('button.close');
    cancelBtn.click();
    timesBtn.click();
    tick();
    expect(component.save).toHaveBeenCalledTimes(0);
  }));

  it('should save settings', fakeAsync(() => {
    spyOn(component.razorapiService, 'connect');
    spyOn(component.modal, 'close');
    component.connForm.get('endpoint').setValue('http://localhost:12345');
    component.connForm.get('username').setValue('test-user');
    component.connForm.get('password').setValue('test-pwd');
    component.connForm.get('refresh').setValue(12345);
    component.connForm.get('refreshEnabled').setValue(true);
    component.save();
    tick();
    expect(component.razorapiService.connect).toHaveBeenCalledWith(
      'http://localhost:12345',
      'test-user',
      'test-pwd',
      12345,
      true,
    );
    expect(component.modal.close).toHaveBeenCalledWith('save');
  }));

  it('should show error message', fakeAsync(() => {
    component.errMsg = 'Test error message';
    fixture.detectChanges();
    tick();
    const content = fixture.nativeElement.querySelector('#error');
    expect(content.textContent.trim()).toEqual(component.errMsg);
  }));
});
