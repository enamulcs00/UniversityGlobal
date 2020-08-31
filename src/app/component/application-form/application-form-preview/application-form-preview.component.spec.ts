import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationFormPreviewComponent } from './application-form-preview.component';

describe('ApplicationFormPreviewComponent', () => {
  let component: ApplicationFormPreviewComponent;
  let fixture: ComponentFixture<ApplicationFormPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationFormPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationFormPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
