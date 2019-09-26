import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab1WorkingInformationComponent } from './tab1-working-information.component';

describe('Tab1WorkingInformationComponent', () => {
  let component: Tab1WorkingInformationComponent;
  let fixture: ComponentFixture<Tab1WorkingInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab1WorkingInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab1WorkingInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
