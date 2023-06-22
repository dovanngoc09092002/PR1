import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxFriendComponent } from './box-friend.component';

describe('BoxFriendComponent', () => {
  let component: BoxFriendComponent;
  let fixture: ComponentFixture<BoxFriendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoxFriendComponent]
    });
    fixture = TestBed.createComponent(BoxFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
