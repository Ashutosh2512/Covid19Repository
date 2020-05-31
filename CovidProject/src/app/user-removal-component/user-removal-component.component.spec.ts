import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRemovalComponentComponent } from './user-removal-component.component';

describe('UserRemovalComponentComponent', () => {
  let component: UserRemovalComponentComponent;
  let fixture: ComponentFixture<UserRemovalComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRemovalComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRemovalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
