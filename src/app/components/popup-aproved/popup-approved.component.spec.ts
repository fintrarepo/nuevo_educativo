import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupApprovedComponent } from './popup-approved.component';

describe('PopupComponent', () => {
  let component: PopupApprovedComponent;
  let fixture: ComponentFixture<PopupApprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupApprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
