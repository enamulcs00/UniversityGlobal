import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreInformationShareComponent } from './more-information-share.component';

describe('MoreInformationShareComponent', () => {
  let component: MoreInformationShareComponent;
  let fixture: ComponentFixture<MoreInformationShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreInformationShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreInformationShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
