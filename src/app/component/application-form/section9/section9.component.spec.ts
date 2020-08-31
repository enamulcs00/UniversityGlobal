import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Section9Component } from './section9.component';

describe('Section9Component', () => {
  let component: Section9Component;
  let fixture: ComponentFixture<Section9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Section9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Section9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
