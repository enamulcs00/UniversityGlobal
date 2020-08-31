import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingUniversitiesComponent } from './matching-universities.component';

describe('MatchingUniversitiesComponent', () => {
  let component: MatchingUniversitiesComponent;
  let fixture: ComponentFixture<MatchingUniversitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchingUniversitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchingUniversitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
