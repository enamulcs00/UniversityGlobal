import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Section11Component } from './section11.component';

describe('Section11Component', () => {
  let component: Section11Component;
  let fixture: ComponentFixture<Section11Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Section11Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Section11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
