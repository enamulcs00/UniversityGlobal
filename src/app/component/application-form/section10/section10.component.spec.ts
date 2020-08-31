import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Section10Component } from './section10.component';

describe('Section10Component', () => {
  let component: Section10Component;
  let fixture: ComponentFixture<Section10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Section10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Section10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
