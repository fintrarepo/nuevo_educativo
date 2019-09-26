import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab1ReferencesComponent } from './tab1-references.component';

describe('Tab1ReferencesComponent', () => {
  let component: Tab1ReferencesComponent;
  let fixture: ComponentFixture<Tab1ReferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab1ReferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab1ReferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
