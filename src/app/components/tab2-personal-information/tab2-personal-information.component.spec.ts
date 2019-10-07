import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab2PersonalInformationComponent } from './tab2-personal-information.component';

describe('Tab2PersonalInformationComponent', () => {
  let component: Tab2PersonalInformationComponent;
  let fixture: ComponentFixture<Tab2PersonalInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab2PersonalInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab2PersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
