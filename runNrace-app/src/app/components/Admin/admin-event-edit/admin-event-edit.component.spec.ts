import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventEditComponent } from './admin-event-edit.component';

describe('AdminEventEditComponent', () => {
  let component: AdminEventEditComponent;
  let fixture: ComponentFixture<AdminEventEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEventEditComponent]
    });
    fixture = TestBed.createComponent(AdminEventEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
