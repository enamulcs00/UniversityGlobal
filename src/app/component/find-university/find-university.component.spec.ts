import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindUniversityComponent } from './find-university.component';

describe('FindUniversityComponent', () => {
  let component: FindUniversityComponent;
  let fixture: ComponentFixture<FindUniversityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindUniversityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindUniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
