import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCreateComponent } from './input-create.component';

describe('InputCreateComponent', () => {
  let component: InputCreateComponent;
  let fixture: ComponentFixture<InputCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputCreateComponent]
    });
    fixture = TestBed.createComponent(InputCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
