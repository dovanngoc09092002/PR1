import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfriendComponent } from './addfriend.component';

describe('AddfriendComponent', () => {
  let component: AddfriendComponent;
  let fixture: ComponentFixture<AddfriendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddfriendComponent]
    });
    fixture = TestBed.createComponent(AddfriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
