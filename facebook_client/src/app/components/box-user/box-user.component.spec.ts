import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxUserComponent } from './box-user.component';

describe('BoxUserComponent', () => {
  let component: BoxUserComponent;
  let fixture: ComponentFixture<BoxUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoxUserComponent]
    });
    fixture = TestBed.createComponent(BoxUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
