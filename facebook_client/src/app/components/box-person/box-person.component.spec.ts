import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxPersonComponent } from './box-person.component';

describe('BoxPersonComponent', () => {
  let component: BoxPersonComponent;
  let fixture: ComponentFixture<BoxPersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoxPersonComponent]
    });
    fixture = TestBed.createComponent(BoxPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
