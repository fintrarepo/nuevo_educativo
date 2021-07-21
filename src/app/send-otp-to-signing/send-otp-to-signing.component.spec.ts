import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendOtpToSigningComponent } from './send-otp-to-signing.component';

describe('SendOtpToSigningComponent', () => {
  let component: SendOtpToSigningComponent;
  let fixture: ComponentFixture<SendOtpToSigningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendOtpToSigningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendOtpToSigningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
