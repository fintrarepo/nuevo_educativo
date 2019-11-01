import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingFormsComponent } from './loading-forms.component';

describe('LoadingFormsComponent', () => {
  let component: LoadingFormsComponent;
  let fixture: ComponentFixture<LoadingFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
