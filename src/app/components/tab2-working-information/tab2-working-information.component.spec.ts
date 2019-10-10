import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab2WorkingInformationComponent } from './tab2-working-information.component';

describe('Tab2WorkingInformationComponent', () => {
  let component: Tab2WorkingInformationComponent;
  let fixture: ComponentFixture<Tab2WorkingInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab2WorkingInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab2WorkingInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
