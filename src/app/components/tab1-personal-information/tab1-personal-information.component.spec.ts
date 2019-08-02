import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab1PersonalInformationComponent } from './tab1-personal-information.component';

describe('Tab1PersonalInformationComponent', () => {
  let component: Tab1PersonalInformationComponent;
  let fixture: ComponentFixture<Tab1PersonalInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab1PersonalInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab1PersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
