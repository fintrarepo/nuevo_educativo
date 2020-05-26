import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetExtractComponent } from './get-extract.component';

describe('GetExtractComponent', () => {
  let component: GetExtractComponent;
  let fixture: ComponentFixture<GetExtractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetExtractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetExtractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
