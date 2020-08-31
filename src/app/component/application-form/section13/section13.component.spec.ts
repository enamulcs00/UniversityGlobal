import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Section13Component } from './section13.component';

describe('Section13Component', () => {
  let component: Section13Component;
  let fixture: ComponentFixture<Section13Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Section13Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Section13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
