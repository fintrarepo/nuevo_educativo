import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidentComponent } from './evident.component';

describe('EvidentComponent', () => {
  let component: EvidentComponent;
  let fixture: ComponentFixture<EvidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
