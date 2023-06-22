import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedLoginComponent } from './need-login.component';

describe('NeedLoginComponent', () => {
  let component: NeedLoginComponent;
  let fixture: ComponentFixture<NeedLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NeedLoginComponent]
    });
    fixture = TestBed.createComponent(NeedLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
