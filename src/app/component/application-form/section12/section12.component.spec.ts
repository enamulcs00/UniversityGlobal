import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Section12Component } from './section12.component';

describe('Section12Component', () => {
  let component: Section12Component;
  let fixture: ComponentFixture<Section12Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Section12Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Section12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
