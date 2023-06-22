import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListvideoComponent } from './listvideo.component';

describe('ListvideoComponent', () => {
  let component: ListvideoComponent;
  let fixture: ComponentFixture<ListvideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListvideoComponent]
    });
    fixture = TestBed.createComponent(ListvideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
